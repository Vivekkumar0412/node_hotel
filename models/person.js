const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age :{
        type : Number
    },
    work :{
        type : String,
        enum : ['software dev','army','ias'],
        required : true
    },
    mobile:{
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },address :{
        type : String
    },
    salary : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});
module.exports = mongoose.model('person',personSchema);