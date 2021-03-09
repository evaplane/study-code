<template>
  <div class="list-box">
	<NavBar />
	<div class='items'>
		<div class="item" v-for="item in list" :key="item.id">
			<router-link :to="'/detail/'+item.id">
				<img :src="item.images.small">
				<span class='title'>{{item.title.length > 6 ? item.title.substr(0,6)+"...":item.title.substr(0,6)}}</span>
				<div v-if='item.rating.average==0' class="no-score">暂无评分</div>
				<div v-else class="star-box">
					<div v-for="(subItem,index) in item.starArr" :key="index">
						<span v-if="subItem==1" class="orange">★</span>
						<span v-else class="gray">★</span>
					</div>
					{{ item.rating.average }}
				</div>
			</router-link>
		</div>
	</div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { computed, provide,reactive,toRefs, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue"
import { getMovieList } from "@/api/movie.ts"
import { useStore } from 'vuex';
export default {
	name:"List",
	components:{
		NavBar
	},
	setup(){
		const state = reactive({
			list:[]
		})
		const route = useRoute();
		const title = computed(() => {
			switch(route.params.type){
				case "in_theaters":
				return "正在热映"

				case "coming_soon":
				return "即将上映"

				case "top250":
				return "Top250"
			}
		})

		provide("title",title)

		const getMovieListData=async ()=>{
			const res = await getMovieList({type:route.params.type,start:0,count:5});
			// 处理评分星级
			res.data.subjects.forEach(v=>{
				v.starNum = Math.floor(v.rating.stars/10);

				v.starArr = [];
				
				for(let i = 0; i < 5; i++){
					v.starArr.push(v.starNum > i  ? 1 : 0)
				}
			})
			state.list = res.data.subjects
		}

		const store = useStore();

		onMounted(()=>{
			if(!store.getters.getIsShowBack){
				store.commit("setIsShowBack",true)
			}
			getMovieListData()
		})

		return {
			...toRefs(state)
		}
	}
}
</script>
<style lang="scss" scoped>
/* 底部区域布局 */
.list-box {
  padding-bottom: 15px;
  .items {
    padding-top: 44px;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-top: 5px;
      width: 33.33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 170px;
      }
      .title {
        margin-top: 2px;
        font-size: 12px;
      }
    }
  }
}
</style>