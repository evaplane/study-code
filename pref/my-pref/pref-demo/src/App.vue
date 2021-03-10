<template>
<ul>
    <li v-for="item in items" :key="item.image">
        <img :src="item.image" />
    </li>
</ul>
</template>

<script>
import {
    reactive
} from "vue"
export default {
    name: 'App',
    setup() {
        const host = "http://qgrb0gri0.hn-bkt.clouddn.com/"
        const type = "~shuiyin"
        const items = reactive([{
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
        ])

        return {
            items
        }
    }
}
</script>

<style>

</style>
