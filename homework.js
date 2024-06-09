const mongo = require("mongoose")
require('dotenv').config()

    mongo.set('strictQuery', false);
    mongo.connect(process.env.API_HOMEWORK)
    .then(() => console.log('connect mongodb'))
    .catch((err) => console.log(err))

    const maths = new mongo.Schema({
        subject : String,
        name: String,
        desc: String,
        Already: Boolean,
        date: String
    })

const homework = mongo.model("main", maths)



module.exports = homework