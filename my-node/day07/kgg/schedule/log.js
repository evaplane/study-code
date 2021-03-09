module.exports = {
	// corntab 6个占位符从左到右分别代表：秒、分、时、⽇、⽉、周⼏, '
	interval:'*/3 * * * * *',
	handler(){
		console.log('定时任务 3秒一次' + new Date());
	}
}