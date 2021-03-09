# react-practice
websocket

1.后端代码 node  

[https://www.npmjs.com/package/ws]: 

    /* 1.安装ws
       2.引入ws
       3.监听别人的连接 ws.on("connection")
       4.当别人给我发消息的时候触发message事件
       5.package.json里面配置 "websocket":"nodemon server/app.js" 启动websocket
     */
    // 创建一个websocket的服务端
    const WebSocket = require("ws");
    
    // 规定服务器的端口
    const wss = new WebSocket.Server({
    	port: 9900
    });
    
    // 监听别人连接
    wss.on("connection", function connection(ws) {
    	console.log(ws);
    	// 别人发消息给我的时候,触发message事件
    	ws.on("message", function incoming(message) {
    		console.log("received: %s", message);
    		if (message.includes("hi")) {
    			ws.send("你好");
    		} else if (message.includes("乐")) {
    			ws.send("张乐乐");
    		} else {
    			ws.send("乐乐仔");
    		}
    	});
    
    	// 服务端主动发送消息给客户端
    	ws.send("开飞机的小历悦");
    });

2. 前端代码 vue

    connect() {
    	// 创建websocket对象
    	this.ws = new WebSocket("ws://127.0.0.1:9900");
    	// 监听是否连接成功
    	this.ws.onopen = function(e) {
    		console.log("连接成功", e);
    	};
    	// 监听服务端发送的消息
    	this.ws.onmessage = evt => {
    		var received_msg = evt.data;
    		console.log(received_msg);
    		this.messageList.push(`服务器说${received_msg}`);
    	};
    },
    send() {
    	this.messageList.push(`你说${this.message}`);
    	this.ws.send(this.message);
    }

react的组件

无状态组件

    是使用函数来创建的,它内部不能拥有数据,所有的数据必须靠父组件传递给他

有状态组件

    App.jsx就是一个有状态的组件,有状态的组件是使用class来定义的,有状态的意思是自己内部可以拥有数据,当然也可以接受父组件传递过来的数据

场景选择

如果是单纯的展示工作,使用无状态组件即可,如果业务比较复杂,涉及到的交互比较多,使用有状态组件

写法

    import React from "react"
    function NoStateComponent(){
        return <div>
            <p>我是无状态组件</p>
        </div>
    }
    
    // 在其他组件中引入
    import NoStateComponent from "./components/NoStateComponent.jsx"
    // 直接用
    Class App extends React.Component {
        render(){
            return <div>
            	<NoStateComponent />
            </div>
        }
    }

注意:

只要是以.jsx结尾的文件,都要导入React

差异

 有状态组件有生命周期钩子，render钩子是必须写的

无状态组件没有生命周期钩子

jsx的语法：在js函数中直接写标签

如果一个组件继承父组件，子类必须在constructor方法中调用super方法，否则新建实例时会报错。因为子类没有自己的this对象，而是继承父类的this对象，然后对其加工，如果不调用super（）方法，子类就得不到this对象

写法

    import React from "react"
    class StateComponent extends React.Component{
    	construtor(){
    		super();
    		this.state={
    			name:"eva",
    			age:19
    		}
    	}
    	render(){
    		return <div>
    			有状态的组件---{this.state.name}---{this.state.age}
    		</div>
    	}
    }
    export {StateComponent}

JSX语法注意点

    1.JSX中,我们的属性值只有两种情况,一种是字符串,还有一种是非字符串,非字符串用{}包括

组件间传值

父组件给子组件传值

    无状态组件,父组件通过属性名称=值的方式传递,子组件通过函数的形参来接收
    有状态组件,父组件通过属性名称=值的方式传递,子组件如果在constructor中通过函数参数来接收,如果在render中通过this.props.xxx来接收

子组件给父组件传值

    子组件调用,通过this.props.callback拿到的是父组件中的callback并执行,把callback的参数里面的值传给了父组件中的getValue的val



    传值给父组件callback



    子组件给父组件传值的核心在于,回调函数,父组件通过属性名=值的方式,把函数传递到子组件中,然后子组件通过this.props获取到传递过来的回调函数,执行并且传参

兄弟组件传值

    1.创建一个公共的bus import { EventEmitter } from "event"
    2.在传值的一方 bus.emit("自定义事件名称",值)
    3.在组件的生命周期钩子componentWillMount中使用 bus.on("自定义事件名称",data=>{})来接收值
    componentWillMount(){} 生命周期钩子,组件即将挂载

事件

    1.注册事件的时候,使用onClick这种方式
    2.要绑定this,不绑定this,this是undefined
    	方法1:在onClick={this.clickMe.bind(this)}
    		clickMe中更改state中的值,用setState,this,state.xxx是不会引起视图的变化的
    	方法2:在contructor中改
    		this.clickMe = this.clickMe.bind(this)
    	方法3: 把clickMe写成箭头函数
    		clickMe = () =>{
    		
    		}
    		但是react不支持,需要安装babel的插件启动转换
    		报错:
    		Support for the experimental syntax 'classProperties' isn't currently enabled
    		传参的方式
    		<button onClick={()=>{this.clickMe("","")}}>点击改变</button>
    如果绑定的时候使用的是箭头函数,接收的时候使用的也要是箭头函数

[babel报错]: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

生命周期

基本概念

    记录组件的声明轨迹,他给我们提供了很多合适的函数,让我们在不同的时间点做一些我们想做的事情

react

      初始化阶段: [初次渲染的结果可以看到] 只会执行一次
      	componentWillMount 组件即将挂载 对应Vue中的[beforeMount]  
      		可以发送网络请求,Vue可以写在created中,拿到this.$axios,请求是异步的,最好提前发
      	render 必须有的钩子,初始化阶段只会执行一次,运行阶段会执行多次 [Vue的内部会渲染]
      		写视图部分的代码,千万不要更改state的值,在运行阶段会造成死循环
      	componentDidMount 组件初次挂载完毕,对应Vue中的[mounted]
      		可以进行dom操作
      		
      运行阶段:[state发生了改变或者是父组件传进来的值props发生改变] 可能会执行多次
      	state改变的时候:
      		shouldComponentUpdate 是否真正渲染 
      			可以根据实际情况返回true或false,如果轮询的时候数据没有变化,返回false
      		componentWillUpdate 组件即将被渲染
      			组件真正渲染出来之前,我们想做一些事情
      		render
      		componentDidUpdate 组件渲染完毕了 
      			组件再次渲染完毕,要操作dom
      	props父组件重新传递值的时候,父组件初始传递是不会调用这些钩子的
      		componentWillReceiveProps
      		shouldComponentUpdate
      		componentWillUpdate
      		render
      		componentDidUpdate
      	注意:运行阶段的钩子里面,不要改变state的值,会造成死循环
      
      销毁阶段: 只会执行一次 [路由切换或者条件渲染]
      	componentWillUnmount [vue中是beforeDestory destoryed] 可以清理定时器

[生命周期]

条件渲染和列表渲染

    React中没有指令
    条件渲染
    	1.if
    	2.与运算
    	3.三目运算符
    列表渲染
    	map方法遍历生成需要的内容







受控组件和非受控组件[ref]

    



class

可以看作是ES5的语法糖，他的绝大部分功能，ES5都可以做到，是构造函数的另一种写法

在里面定义了一个toString方法，定义方法时，不需要加上function关键字，直接函数定义就可以了，方法之间不需要加逗号分隔，加了会报错

    class Point {
      constructor(x, y) { // 构造方法
        this.x = x;
        this.y = y;
      }
    
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }

定义一个空的类,js会自动加一个空的constructor方法

    class Point{	
    
    }
    // 相当于
    class Point {
    	constructor(){} // 默认返回实例对象this，可以指定返回另外一个对象
    }

实例的属性除非定义在其本身（this），否则都定义在其原型上（class）



其他知识点

    1.如果在render函数中写js的表达式,要用{}括起来,否则会报错


