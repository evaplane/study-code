<template>
<VirtualList :listData="data" :itemSize="100" />
</template>

<script>
import VirtualList from "./components/VirtualList"
let d = []
for (let i = 0; i < 1000; i++) {
    d.push({
        id: i,
        value: i
    })
}
export default {
    name: 'App',
    components: {
        VirtualList
    },
    data() {
        return {
            data: d
        }
    }
}
</script>

<style>
html {
    height: 100%;
}

body {
    height: 100%;
    margin: 0;
}

#app {
    height: 100%;
}
</style>
