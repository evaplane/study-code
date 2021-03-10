<template>
<!--infinite-list-container 可视区域  infinite-list 渲染区域-->
<div ref="list" :style="{height}" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div ref="phantom" class="infinite-list-plantom"></div>
    <div ref="content" class="infinite-list">
        <div class='infinite-list-item' ref="items" :id="item._index" :key="item._index" v-for="item in visibleData">
            <slot ref="slot" :item="item.item"></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "VirtualList",
    props: {
        // 所有列表数据
        listData: {
            type: Array,
            default: () => []
        },
        // 预估高度
        estimatedItemSize: {
            type: Number,
            required: true
        },
        // 缓冲区比例
        bufferScale: {
            type: Number,
            default: 1
        },
        // 容器高度
        height: {
            type: String,
            default: '100%'
        }
    },
    computed: {
        _listData() {
            return this.listData.map((item, index) => {
                return {
                    _index: `_${index}`,
                    item
                }
            })
        },
        // 可视区域
        visibleCount() {
            return Math.ceil(this.screenHeight / this.estimatedItemSize)
        },
        // 可视区域上方缓冲区域
        aboveCount() {
            return Math.min(this.start, this.bufferScale * this.visibleCount)
        },
        // 可视区域下方缓冲区域
        belowCount() {
            return Math.min(this.listData.length - this.end, this.bufferScale * this.visibleCount)
        },
        visibleData() {
            let start = this.start - this.aboveCount;
            let end = this.end + this.belowCount;
            return this._listData.slice(start, end);
        }
    },
    created() {
        // 用于列表渲染后存储每一项的高度和信息
        this.initPositions();
        window.vm = this;
    },
    mounted() {
        this.screenHeight = this.$el.clientHeight;
        this.start = 0;
        this.end = this.start + this.visibleCount;
    },
    updated() {
        this.$nextTick(function () {
            if (!this.$refs.items || !this.$refs.items.length) {
                return;
            }

            // 获取真实元素大小，修改对应尺寸
            this.updateItemsSize();
            // 更新列表总高度
            let height = this.positions[this.positions.length - 1].bottom;
            this.$refs.phantom.style.height = height + 'px';
            // 更新真实偏移量,屏幕可视区域随之移动
            this.setStartOffset();
        })
    },
    data() {
        return {
            // 起始索引
            start: 0,
            // 结束索引
            end: 0,
            // 可视区域高度
            screenHeight: 0,
        }
    },
    methods: {
        initPositions() {
            this.positions = this.listData.map((d, index) => ({
                index,
                height: this.estimatedItemSize,
                top: index * this.estimatedItemSize,
                bottom: (index + 1) * this.estimatedItemSize
            }))
        },
        getStartIndex(scrollTop = 0) {
            return this.binarySearch(this.positions, scrollTop)
        },
        // 二分法
        /**
        	根据scrollTop二分法寻找startIndex

1.刚刚好滚动的高度等于整个列表最中间的index的bottom，直接返回minIndex+1是start
2.如果没有就通过end = end -1 不断的循环计算minIndex和minValue,直到end<start为止，返回temIndex
  这中间的start = minIndex +1 是为了当minValue不小心<value的时候，缩小范围再次循环
        */
        binarySearch(list, value) {
            let start = 0;
            let end = list.length - 1;
            let tempIndex = null;

            while (start <= end) {
                let midIndex = parseInt((start + end) / 2);
                let midValue = list[midIndex].bottom;

                if (midValue === value) {
                    return midIndex + 1;
                } else if (midValue < value) {
                    start = midIndex + 1;
                } else if (midValue > value) {
                    if (tempIndex === null || tempIndex > midIndex) {
                        tempIndex = midIndex
                    }
                    end = end - 1;
                }
            }
            return tempIndex;
        },
        updateItemsSize() {
            let nodes = this.$refs.items;
            nodes.forEach(node => {
                let rect = node.getBoundingClientRect();
                // 实际高度
                let height = rect.height;
                // index的强制转换为number类型
                let index = +node.id.slice(1)
                // 预估高度
                let oldHeight = this.positions[index].height;

                let dValue = oldHeight - height;
                // 存在差值
                if (dValue) {
                    this.positions[index].bottom = this.positions[index].bottom - dValue;
                    this.positions[index].height = height;
                    // 这个值下面的每一个元素都要改变位置
                    for (let k = index + 1; k < this.positions.length; k++) {
                        this.positions[k].top = this.positions[k - 1].bottom;
                        this.positions[k].bottom = this.positions[k].bottom - dValue;
                    }
                }

            })
        },
        // 渲染区域相对于可视区域的偏移
        setStartOffset() {
            // 这个时候start和end可能会有偏移
            // this.start是指实际开始的count
            // this.start - this.aboveCount是指包含缓冲区的开始count
            let startOffset;
            if (this.start >= 1) {
                // aboveCount的top
                let size =
                    this.positions[this.start].top -
                    (this.positions[this.start - this.aboveCount] ?
                        this.positions[this.start - this.aboveCount].top :
                        0)
                // 包含缓冲区的偏移量
                startOffset = this.positions[this.start - 1].bottom - size;
            } else {
                startOffset = 0;
            }

            // 渲染区跟着移动
            this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`;

        },
        // 滚动事件
        scrollEvent() {
            // 当前滚动位置
            let scrollTop = this.$refs.list.scrollTop;
            // 开始索引
            this.start = this.getStartIndex(scrollTop);
            // 结束索引
            this.end = this.start + this.visibleCount;
            // 计算偏移量
            this.setStartOffset();
        }
    },

}
</script>

<style scoped>
.infinite-list-container {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
}

.infinite-list-item {
    padding: 5px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
    /* height:200px; */
}
</style>
