
// 读取本地的store里面的值
const localState = JSON.parse(localStorage.getItem("MYCART")) || [];

export default (previousState = localState ,action) => {
	console.log(action);
	
	switch (action.type) {
		case "GOODS_ADD":
			
			// 如果之前的数组中有,就更改数量,如果之前的数组中没有,就添加
			const addGoodsList = JSON.parse(JSON.stringify(previousState));
			const oldGoods = addGoodsList.find(item=>item.id == action.goods.id);
			if(oldGoods){
				oldGoods.num += action.goods.num;
			}else{
				addGoodsList.push(action.goods);
			}
			return addGoodsList;
		case "UPDATE_GOODS":

			const updateGoodsList = JSON.parse(JSON.stringify(previousState));
			const editGoods = updateGoodsList.find(item=>item.id == action.id);
			editGoods.num = action.value;
			return updateGoodsList;
		
		case "DELETE_GOODS":
			const deleteGoodsList = JSON.parse(JSON.stringify(previousState));
			const deleteGoodsIndex = deleteGoodsList.findIndex(item=>item.id == action.id);
			deleteGoodsList.splice(deleteGoodsIndex,1);
			
			return deleteGoodsList;

		default:
			// 返回结果深拷贝
			return JSON.parse(JSON.stringify(previousState));
	}
}