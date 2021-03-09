const kkb = {
	info:{
		name:"eva"
	},
	get name(){
		return this.info.name
	},
	set name(val){
		this.info.name = `[[[${val}]]]`
	}
}

console.log(kkb.name);

kkb.name="kkb"

console.log(kkb.name);