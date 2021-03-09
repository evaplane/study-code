module.exports = {
	// corntab 6个占位符从左到右分别代表：秒、分、时、⽇、⽉、周⼏, '
	interval:'30 * * * * *',
	handler(){
		console.log('定时任务 30秒一次' + new Date());
	}
}