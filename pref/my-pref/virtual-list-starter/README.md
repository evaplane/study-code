# virtual-list-starter
## Project setup
```
yarn install
```

### 固定高度列表渲染

1.infinite-list-container 用于形成可视区域
2.infinite-list-phantom 列表总高度，用于形成滚动条
3.infinite-list 渲染区域，需要计算与可视区域的偏移量，用translate偏移渲染


固定的itemSize,用于渲染的listData
需要计算的：
	1.startIndex
	2.endIndex
	3.visibleCount
	4.visibleData
	5.listHeight 列表总高度，给滚动条渲染

滚动的时候最终目的是通过scollTop计算startOffset偏移量，偏移给渲染区域，渲染当前区域的列表

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
