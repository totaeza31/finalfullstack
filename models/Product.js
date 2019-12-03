
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//database


var ProductSchema   = new Schema({
    name: String,
    category: String,
    price:Number
});

module.exports = mongoose.model('Product', ProductSchema);