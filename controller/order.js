var Order = require('../model/order');

var createOrder = (req, res, next) => {
    console.log('this is create order');

    var product = req.body.product,
        quantity = req.body.quantity,
        user_name = req.body.user_name,
        mobile_no = req.body.mobile_no,
        address = req.body.address,
        email = req.body.Email

        // console.log(product);

    var myOrder = new Order({
        product: product,
        quantity: quantity,
        user_name: user_name,
        mobile_no: mobile_no,
        address: address,
        email: email
    });

    // myOrder.product.push(product[0]);
    console.log('this is create order2');

    // console.log(myOrder);

    myOrder.save((err, order) => {
        if (err) {
            console.log('This is error: '+ err)
            res.status(404).json({
                'message': err
            })
        } else {
            res.status(201).json({
                success:true,
                'message': 'order created',
                data: order
            })
        }
    });
};

var getAllOrder = (req, res, next) => {
    Order.find( (err, order) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: order
            });
        }
    });
};


var deleteOrder= (req, res, next) => {

    console.log('In order delete');

    Order.findByIdAndRemove(req.params.id, (err, order) => {
        if(err){
            // console.log('In delete err: ' + err);
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            //console.log(product);
            return res.status(200).json({
                message: "Order deleted",
                success: true
            });
        }
    });
};


module.exports = {
    deleteOrder,
    getAllOrder,
    createOrder
};