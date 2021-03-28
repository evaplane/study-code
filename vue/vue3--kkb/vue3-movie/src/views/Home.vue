<template>
	<div class="home">
		<NavBar />
		<div class="section">
			<div class="type-title">
				<span>正在热映</span>
				<div class="more" @click="goToList('in_theaters')">更多</div>
			</div>
			<div class="scroll-view">
				<div v-for="item in inTheaters" :key="item.id" class="item">
				<router-link :to="'/detail/'+item.id">
					<img :src="item.images.small" />
					<span class="title">{{item.title.length>6?item.title.substr(0,6)+"..." : item.title}}</span>
					<span v-if="item.rating.average==0" class="no-score">暂无评分</span>
					<div v-else class="star-box">
						<div v-for="(subItem,index) in item.starArr" :key="index">
							<span v-if="subItem==1" class="orange">★</span>
							<span v-else class="gray">★</span>
						</div>
						{{item.rating.average}}
					</div>
				</router-link>
				</div>
			</div>
    	</div>
		<div class="section">
			<div class="type-title">
				<span>即将上映</span>
				<div class="more"  @click="goToList('coming_soon')">更多</div>
			</div>
			<div class="scroll-view">
				<div v-for="item in comingSoon" :key="item.id" class="item">
				<router-link :to="'/detail/'+item.id">
					<img :src="item.images.small" />
					<span class="title">{{item.title.length>6?item.title.substr(0,6)+"..." : item.title}}</span>
					<span v-if="item.rating.average==0" class="no-score">暂无评分</span>
					<div v-else class="star-box">
						<div v-for="(subItem,index) in item.starArr" :key="index">
							<span v-if="subItem==1" class="orange">★</span>
							<span v-else class="gray">★</span>
						</div>
						{{item.rating.average}}
					</div>
				</router-link>
				</div>
			</div>
    	</div>
		<div class="section">
			<div class="type-title">
				<span>Top250</span>
				<div class="more" @click="goToList('top250')">更多</div>
			</div>
			<div class="scroll-view">
				<div v-for="item in top250" :key="item.id" class="item">
				<router-link :to="'/detail/'+item.id">
					<img :src="item.images.small" />
					<span class="title">{{item.title.length>6?item.title.substr(0,6)+"..." : item.title}}</span>
					<span v-if="item.rating.average==0" class="no-score">暂无评分</span>
					<div v-else class="star-box">
						<div v-for="(subItem,index) in item.starArr" :key="index">
							<span v-if="subItem==1" class="orange">★</span>
							<span v-else class="gray">★</span>
						</div>
						{{item.rating.average}}
					</div>
				</router-link>
				</div>
			</div>
    	</div>
	</div>
</template>

<script>
import {reactive,toRefs,onMounted, provide,onBeforeUnmount,onBeforeMount} from "vue"
import {useRouter} from "vue-router"
import { useStore } from "vuex"
import {getInTheaters,getComingSoon,getTop250} from "@/api/movie.ts"
import NavBar from "@/components/NavBar.vue"
export default {
	name: "Home",
	components:{
		NavBar
	},
	setup(){
		const state =reactive({
			inTheaters:[], // 正在热映
			comingSoon:[], // 即将上映
			top250:[] // top250
		})

		provide("title","eva电影")

		const router = useRouter();

		const getInTheatersData = async () => {
			const res = await getInTheaters(0,10)

			// 处理评分星级
			res.data.subjects.forEach(theater=>{
				// 4
				theater.starNum = Math.floor(theater.rating.stars/10)
				theater.starArr = []
				// 0-4
				for(let i = 0; i < 5; i++ ){
					theater.starArr[i] = theater.starNum>i ? 1 : 0
				}
			})
			state.inTheaters = res.data.subjects
		}

		const getComingSoonData = async () => {
			const res = await getTop250(0,10)

			// 处理评分星级
			res.data.subjects.forEach(comesoon=>{
				// 4
				comesoon.starNum = Math.floor(comesoon.rating.stars/10)
				comesoon.starArr = []
				// 0-4
				for(let i = 0; i < 5; i++ ){
					comesoon.starArr[i] = comesoon.starNum>i ? 1 : 0
				}
			})
			state.comingSoon = res.data.subjects
		}

		const getTop250Data = async () => {
			const res = await getComingSoon(0,10)

			// 处理评分星级
			res.data.subjects.forEach(top=>{
				// 4
				top.starNum = Math.floor(top.rating.stars/10)
				top.starArr = []
				// 0-4
				for(let i = 0; i < 5; i++ ){
					top.starArr[i] = top.starNum>i ? 1 : 0
				}
			})
			state.top250 = res.data.subjects
		}

		const goToList = type=>{
			router.push(`/list/${type}`)
		}

		const store = useStore();

		onMounted(() => {
			getInTheatersData()
			getComingSoonData()
			getTop250Data()
		})

		onBeforeMount(()=>{
			store.commit("setIsShowBack",false)
		})

		onBeforeUnmount(()=>{
			store.commit("setIsShowBack",true)
		})

		return {...toRefs(state),goToList}
	}
};
</script>
<style lang="scss">
	.home {
  		padding-bottom: 15px;
  		padding-top: 10px;
  		.section {
  		  padding-top: 44px;
  		  .type-title {
  		    height: 20px;
  		    padding: 0 12px;
  		    display: flex;
  		    justify-content: space-between;
  		    align-items: center;
  		    span {
  		      font-size: 18px;
  		    }
  		    .more {
  		      font-size: 13px;
  		      color: #43c74d;
  		    }
  		  }
  		  .scroll-view {
  		    margin-top: 10px;
  		    /* 要能够滚动 */
  		    width: 100%;
			display: flex;
			overflow: auto;
			white-space: nowrap;
			height: 100%;
  		    // margin-left: 5px;
  		    // margin-right: 5px;
  		    .item a {
  		      width: 85px;
  		      height: 100%;
  		      display: flex;
  		      flex-direction: column;
  		      text-align: center;
  		      padding-left: 5px;
  		      padding-right: 5px;
  		      img {
  		        width: 85px;
  		        height: 123px;
  		      }
  		      .title {
  		        margin-top: 2px;
  		        font-size: 12px;
  		      }
  		    }
  		  }
  		  .scroll-view::-webkit-scrollbar {
  		    display: none;
  		  }
  	}
}
</style>
