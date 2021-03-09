// const app = new (require('koa'))()
// const {initRouter} = require('./kkb-loader')
// app.use(initRouter().routes())
// app.listen(3000)

const kkb = new (require('./kkb'))()
kkb.start(3000)