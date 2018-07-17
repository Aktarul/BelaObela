var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String},
    code:{type: String},
    description: { type: String },
    picture: [String],
    price: { type: String},
    category: {type: String},
    sub_Category: {type: String},
    avl: {type: String},
    status: {type: String}
});

module.exports = mongoose.model('Product', productSchema);