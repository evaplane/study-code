# virtual-list
### 包含缓冲区的虚拟列表
https://juejin.im/post/6844903982742110216#heading-4

以预估高度先行渲染，然后获取真实高度并缓存

二分法查找开始索引start

faker.js获取随机数据

定义缓冲区bufferScale防止滚动白屏
	三个区域：可视区域上方  aboveCount 
					在start和bufferScale * visibleCount比较，Math.min
			 可视区域 visibleCount
			 		this.screenHeight / 预估高度
			 可视区域下方 belowCount
			 		在this.listData.length-this.end和bufferScale * visibleCount比较，Math.min
	
	visibleData：计算start和end，要加上缓冲区域的数据,this.listData.slice(start,end)


每次scroll之后
	要计算每个item的高度和位置，赋值给this.positions
	计算整体的列表高度
	计算可视区域的偏移量，使渲染区域通过translate偏移
		计算偏移量之前，通过二分法获取this.start和this.end = this.start + this.visibleCount

update函数中要计算上面的所有，scroll函数中只计算偏移量即可
		

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

