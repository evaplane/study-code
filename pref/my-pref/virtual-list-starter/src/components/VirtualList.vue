<template>
<div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{height:listHeight+'px'}"></div>
    <!-- 控制top值 -->
    <div class="infinite-list" :style="{transform:getTransform}">
        <div class="infinite-list-item" ref="items" v-for="item in visibleData" :key="item.id" :style="{height:itemSize+'px',lineHeight:itemSize+'px'}">{{item.value}}</div>
    </div>
</div>
</template>

<script>
export default {
    name: 'VirtualList',
    props: {
        listData: {
            type: Array,
            default: () => []
        },
        itemSize: {
            type: Number,
            default: 200
        }
    },
    computed: {
        // 列表总高度
        listHeight() {
            return this.listData.length * this.itemSize;
        },
        // 可显示的列表项数
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize);
        },
        // 偏移量对应的style
        getTransform() {
            return `translate3d(0,${this.startOffset}px,0)`
        },
        // 获取列表真实的显示数据
        visibleData() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
        }
    },
    data() {
        return {
            screenHeight: 0,
            start: 0,
            end: 0,
            // 偏移量,将渲染区域偏移到可视区域内
            startOffset: 0
        }
    },
    mounted() {
        this.screenHeight = this.$el.clientHeight;
        this.start = 0;
        this.end = this.start + this.visibleCount;
    },
    methods: {
        scrollEvent() {
            // 当前滚动位置
            let scrollTop = this.$refs.list.scrollTop;

            this.start = Math.floor(scrollTop / this.itemSize);

            this.end = this.start + this.visibleCount;

            // 最终目的计算偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemSize)
        }
    }
}
</script>

<style scoped>
.infinite-list-container {
    height: 100%;
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
    text-align: center;
}

.infinite-list-item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
}
</style>
