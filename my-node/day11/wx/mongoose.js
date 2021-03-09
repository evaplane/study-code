const mongoose = require('mongoose')
const {
    Schema
} = mongoose
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true
}, () => {
    console.log('Mongodb connected..')
})
exports.ServerToken = mongoose.model('ServerToken', {
    accessToken: String
});