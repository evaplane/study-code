
const express = require("express")
const app = express()
const Vue = require('vue')
const host = "http://qgrb0gri0.hn-bkt.clouddn.com/"
const type = "~shuiyin"

// 新建一个渲染器
const render = require('@vue/server-renderer')
const vueapp = {
	template:`
	<ul>
    	<li v-for="item in items" :key="item.image">
        	<img :src="item.image" />
    	</li>
	</ul>
	`,
	data() {
        return {
			items:[{
                image: `${host}1.png${type}`
            },
            {
                image: `${host}2.png${type}`
            },
            {
                image: `${host}3.png${type}`
            },
            {
                image: `${host}4.png${type}`
            },
            {
                image: `${host}5.png${type}`
            },
            {
                image: `${host}6.png${type}`
            }
        ]
		}
    }
}

app.get("/",async function(req,res){
	const vapp = Vue.createApp(vueapp)
	const html = await render.renderToString(vapp)
	res.send(html)
})

app.listen(3002,function(){
	console.log("3002");
})