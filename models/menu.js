const mongoose = require('mongoose');

const menuSchema = new  mongoose.Schema({
    dish : {
        type : String,
        require : true
    },
    flavour : {
        type: [String],
        enum : ['sweet','savory','sour']
    },
    price : {
        type : Number,
        require : true
    }
});

module.exports = mongoose.model('menu',menuSchema);