const mongoose = require('mongoose');
require('dotenv').config();
// let mongoUrl = "mongodb://127.0.0.1:27017/lastdb";
let mongoUrl = process.env.db_url;
mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("mongodb is connected")
})
// db.on('')
module.exports = db;