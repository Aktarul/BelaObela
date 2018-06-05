var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = new Schema({
    product: {type: String},
    quantity: {type: String},
    user_name: {type: String},
    mobile_no: {type: String},
    address: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);