import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
	// 是否显示返回按钮，首页默认不显示
	isShowBack:false
  },
  // 相当于store的计算属性，
  getters:{
	getIsShowBack:(state:any)=>{
		return state.isShowBack
	}
  },
  mutations: {
	setIsShowBack:(state:any,isShowBack:boolean)=>{
		state.isShowBack = isShowBack;
	}
  },
  actions: {
  },
  modules: {
  }
});
