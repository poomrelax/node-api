const mongo = require("mongoose")
mongo.connect('mongodb://localhost:27017/homework',  {useNewUrlParser: true})
    .then(() => console.log('connect mongodb'))
    .catch((err) => console.log(err))

mongo.set('strictQuery', false);
const maths = new mongo.Schema({
    subject : String,
    name: String,
    desc: String,
    Already: Boolean,
    date: String
})

module.exports = mongo.model('maths', maths)