<template>
	<div>
		<NavBar />
		<!-- 电影基本信息 -->
		<div class='info-box'>
			<span class='title'>{{movieInfo.title}}</span>
			<div class="flex-box">
				<div class="left">
					<div class="top">
						<span v-if="movieInfo.rating && movieInfo.rating.average==0">暂无评分</span>
						<div v-else class="star-box">
							<div v-for="(item,index) in movieInfo.starArr" :key="index">
								<img v-if="item===1" src="@/assets/imgs/full.png" />
								<img v-else-if="item===2" src="@/assets/imgs/halfStar.jpg" />
								<img v-else src="@/assets/imgs/empty.png" />
							</div>
						</div>
						<span class="score">{{movieInfo.rating && movieInfo.rating.average}}</span>
						<span class="comments">{{movieInfo.ratings_count}}人评价</span>
					</div>
					<div class="bottom">
						<!-- 时长 durations a && b 如果，如果a是false，直接就false，返回a，如果a是true，判断b，返回b
							&& 返回b, || 返回a,所以当判断存在且取值的时候用&& -->
						{{ movieInfo.durations && movieInfo.durations[0] }} /
						<span v-for="genre in movieInfo.genres" :key="genre">{{ genre }} /</span>
						{{ movieInfo.directors && movieInfo.directors[0].name }} / 
						<span v-for="cast in movieInfo.casts" :key="cast.id">{{ cast.name }} / </span>
						{{ movieInfo.pubdates && movieInfo.pubdates[0] }} 上映
					</div>
				</div>
				<div class="right">
					<img :src="movieInfo.images && movieInfo.images.small" alt="">
				</div>
			</div>
			<div class="view-button">
				<div>想看</div>
				<div>看过</div>
			</div>
			<!-- 频道 -->
			<div class="channel-box">
				<div class="title">所属频道</div>
				<div class="tag-box">
					<div v-for="tag in movieInfo.tags" :key="tag">
						{{tag}}
						<img src="@/assets/imgs/green_arrow.png" />
					</div>
				</div>
			</div>
			<!-- 剧情简介 -->
			<div class="movie-desc">
				<div class="title">{{ movieInfo.title }}的剧情简介</div>
				<div class="desc">
					{{cutSummary}}
					<div class="more" v-if="cutSummary.length<70" @click="more">(更多)</div>
					<div class="cut" v-else @click="cut">(收起)</div>
				</div>
			</div>
			<!-- 影人 -->
			<div class="movie-desc">
				<div class="title">影人</div>
				<!-- 滚动区域 -->
				<div class="scroll-view">
					<div class="item">
						<img :src="movieInfo.directors && movieInfo.directors[0].avatars.small">
						<span class="name">{{ movieInfo.directors && movieInfo.directors[0].name }}</span>
						<span class="job">导演</span>
					</div>
					<div class='item' v-for="cast in movieInfo.casts" :key="cast.id">
						<img :src="cast.avatars && cast.avatars.small">
						<div class="name">{{cast.name}}</div>
						<div class="job">演员</div>
					</div>
				</div>
			</div>
			<!-- 预告片 & 图片 -->
			<div class="movie-desc">
				<div class="title small">
					{{ movieInfo.title }}的预告片（{{ movieInfo.trailers && movieInfo.trailers.length }}）、视频评论（1）和图片（{{movieInfo.photos_count}}）
					<div class="scroll-view">
						<div v-for="trailer in movieInfo.trailers" :key="trailer.id" class="video-item">
							<video :src="trailer.resource_url"></video>
						</div>
					</div>
				</div>
			</div>
			<!-- 评论 -->
			<div class="comments-box">
				<div class="title">{{ movieInfo.title }}的短评（{{movieInfo.comments_count}}）</div>
				<div v-for="comment in movieInfo.popular_comments" :key="comment.id" class="section">
					<div class="left">
						<img :src="comment.author.avatar" alt="">
					</div>
					<div class="right">
						<div class="name">
							{{comment.author.name}}
							<div class="star-box"></div>
						</div>
						<div class="time">{{comment.created_at}}</div>
						<div class="content">{{comment.content}}</div>
						<div class="good">
							<div class="good-left">👍{{comment.userful_count}}</div>
							<div class="good-right">...</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {reactive,onMounted,toRefs, provide,ref} from "vue"
import {getMoveInfo} from "@/api/movie.ts"
import {useRoute} from "vue-router"
import {useStore} from "vuex"
import NavBar from "@/components/NavBar.vue"
export default {
	components:{
		NavBar
	},
	setup(){
		const state = reactive({
			movieInfo:{},
			cutSummary:""
		})

		const title = ref("正在加载中...");
		provide("title",title)
		const route = useRoute()
		const store = useStore()

		// 8.1 => 4.05  4  0.05  4.5颗星
		const getMoveInfoData = async ()=>{
			const res = await getMoveInfo(route.params.id)
			// 根据评分计算星星
			const starNum = res.data.rating.average/2
			const intStar = Math.floor(starNum)
			const floatStar = starNum - intStar
			let starArr = [];

			for(let i = 0; i < 5; i++){
				if(i < intStar){
					starArr[i] = 1;
				}else if(i === intStar){
					if(floatStar<0.5){
						starArr[i] = 2;
					}else{
						starArr[i] = 1;
					}
				}else{
					starArr[i] = 3;
				}
			}
			res.data.starArr = starArr
			state.movieInfo = res.data
			title.value = res.data.title
			state.cutSummary = state.movieInfo.summary.substr(0,65)+"...";
		}

		onMounted(()=>{
			if(!store.getters.getIsShowBack){
				store.commit("setIsShowBack",true)
			}
			getMoveInfoData()
		})

		const more = ()=>{
			state.cutSummary = state.movieInfo.summary;
		}

		const cut = ()=>{	
			state.cutSummary = state.movieInfo.summary.substr(0,65)+"...";
		}

		return {...toRefs(state),more,cut}
		
	}
}
</script>
<style lang="scss" scoped>
	.info-box{
		padding: 44px 18px 0 18px ;
		.title{
			display: block;
			font-size: 24px;
			font-weight: 500;
			padding-bottom: 15px;
		}
		.flex-box{
			display: flex;
			.left{
				flex:1;
				.top{
					display: flex;
					font-size: 14px;
					height: 20px;
					line-height: 20px;
				}
				.star-box{
					padding-top:0;
					img{
						width: 13px;
						height: 13px;
					}
				}
				.score{
					margin-left: 6px;
					font-size: 14px;
					color: #000;
				}
				.comments{
					margin-left: 6px;
					font-size: 14px;
					color: #ccc;
				}
				.bottom{
					padding-top: 25px;
					color: gray;
					font-size: 13px;
				}
			}
			.right{
				margin-left: 28px;
				img{
					width: 100px;
					height: 140px;
					display: block;
				}
			}
		}
	}
	.view-button{
		display: flex;
		margin-top: 30px;
		margin-bottom: 34px;
		padding: 0 18px;
		div{
			width: 163px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border: 2px solid #ffb816;
			color: #ffb816;
			font-size: 16px;
			border-radius: 5px;
			&:first-child{
				margin-right: 10px;
			}
		}
	}
	.channel-box{
		padding-left: 18px;
		.title{
			font-size: 18px;
			color: gray;
		}
		.tag-box{
			margin-top: 17px;
			display: flex;
			flex-wrap: wrap;
			div{
				height:26px;
				padding: 0 10px 25px;
				box-sizing: border-box;
				border-radius: 14px;
				background-color: #effaf0;
				margin-right: 10px;
				color: #54c366;
				border: 2px solid #54c366;
				font-size: 14px;
				line-height: 26px;
				margin-bottom: 10px;
			}
			img{
				width: 7px;
				height: 9px;
			}
		}
	}
	.movie-desc{
		margin-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		.title{
			color: #ccc;
			font-size: 20px;
			padding-bottom: 0;
		}
		.small{
			font-size: 13px;
		}
		.desc{
			margin-top: 21px;
			font-size: 15px;
			.more{
				color: orange;
				display: inline;
			}
			.cut{
				display: inline;
				color: yellowgreen;
			}
		}
		.scroll-view{
			display: flex;
			overflow: auto;
			width: 100%;
			margin-top: 10px;
			.item{
				display: flex;
				flex-direction: column;
				width: 75px;
				padding-right: 7px;
				padding-left: 7px;
				text-align: center;
			}
			img{
				height: 107px;
				width: 75px;
				display: block;
			}
			.name{
				font-size: 13px;
				margin-top: 3px;
				display: block;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.job{
				font-size: 11px;
				margin-top: 3px;
				color: #ccc;
			}
		}
		.video-item{
			display: inline-block;
			width: 214px;
			height: 121px;
			margin-right: 7px;
			video{
				width: 100%;
				height: 100%;
			}		
		}
		
	}
	.comments-box{
		margin-top: 10px;
		padding-right: 18px;
		padding-left: 18px;
		.title{
			font-size: 15px;
			color: #ccc;
			margin-bottom: 14px;
		}
		.section{
			display: flex;
			margin-bottom: 40px;
			.left{
				width: 60px;
				position: relative;
				img{
					width: 37px;
					height: 37px;
					border-radius: 50%;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			.right{
				flex: 1;
				padding-right: 33px;
				padding-top: 5px;
				.name{
					font-size: 15px;
					padding-left: 10px;
					font-weight: 700;
				}
				.time{
					margin-top: 12px;
					font-size: 13px;
					color: #ccc;
					padding-left: 10px;
				}
				.content{
					margin-top: 8px;
					font-size: 12px;
				}
				.good{
					margin-top: 16px;
					display: flex;
					justify-content: space-between;
					color: #ccc;
					font-size: 15px;
				}
			}
		}
	}
</style>