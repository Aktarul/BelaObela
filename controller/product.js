var Product = require('../model/product'),
    Category = require('../model/category');

multer = require('multer');
var fs = require('fs');

let store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '.' + file.originalname);
    }
});

let upload = multer({storage:store}).single('file');

var createProduct = (req, res, next) => {

    console.log('this is create product');

    var name = req.body.name,
        //picture = req.file.filename ,
        code = req.body.code,
        category = req.body.category,
        description = req.body.description,
        price = req.body.price,
        avl = req.body.avl,
        status = req.body.status;



    console.log('In create code : '+code);
    console.log('In create avl : '+avl);

    var myProduct = new Product({
        name: name,
        // picture: picture,
        code:code,
        category: category,
        description: description,
        price: price,
        avl: avl,
        status: status
    });
    myProduct.save((err, product) => {
        console.log('In save');
        if(err) {
            console.log('In save error ' + err);
            return res.status(404).json({

                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: product
            });
        }
    });
};

var getProduct = (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: product
            });
        }
    });
};

var getCatProduct = (req, res, next) => {

    // console.log('at backend: category = ' + cat);

    let cat = req.params.cat;

    if(cat){
        Product.find({category: new RegExp(cat,'i')}, (err, product) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    message: 'can not find category'
                });
            }else {
                return res.status(201).json({
                    success: true,
                    data: product
                });
            }
        })
    } else {
        return res.status(200).json({
            success: false
        });
    }
};

var getTopProduct = (req, res, next) => {

    // console.log('At getTopProduct: ' + topSearch)

    let topSearch = req.params.topSearch;

    if(topSearch){
        Product.find({status: new RegExp(topSearch,'i')}, (err, product) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    message: 'can not find this category products'
                });
            }else {
                return res.status(201).json({
                    success: true,
                    data: product
                });
            }
        })
    } else {
        return res.status(200).json({
            success: false
        });
    }
};

var getCategory = (req, res, next) => {
    Product.findById(req.params.id, (err, category) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: category
            });
        }
    });
};

var getAllProduct = (req, res, next) => {
    Product.find( (err, product) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: product
            });
        }
    });
};

var updateProduct = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('In save upload error: ' + err);
            return res.status(404).json({
                message: err,
                success: false
            });
        } else {


            console.log('In upload yes');

            var name = req.body.name,
                code = req.body.code,
                picture = req.file.filename ,
                description = req.body.description,
                price = req.body.price,
                avl = req.body.avl,
                status = req.body.status;

            Product.findById(req.params.id, (err, product) => {
                if(err){
                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    console.log(product.avl);
                    console.log(product.code);

                    product.picture.push(picture);
                    product.name = name || product.name;
                    product.code = code || product.code;
                    // product.picture = picture || product.picture;
                    product.description =description || product.description;
                    product.price = price || product.price;
                    product.avl = avl || product.avl;
                    product.status = status || product.status;


                    product.save((err, product) => {
                        if(err){
                            return res.status(404).json({
                                message: err,
                                success: false
                            });
                        }
                        else {

                            console.log('In save avl' + product.avl);
                            console.log('In save code '+product.code);

                            return res.status(200).json({
                                success: true,
                                data: product
                            });
                        }
                    });
                }
            });
        }
    });
};


var updateProduct2 = (req, res, next) => {

    console.log('In Update 2');

    var name = req.body.name,
        code = req.body.code,
        description = req.body.description,
        avl = req.body.avl,
        price = req.body.price,
        status = req.body.status;


    Product.findById(req.params.id, (err, product) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            //product.picture.push(picture);
            product.name = name || product.name;
            //product.picture = picture || product.picture;
            product.description = description || product.description;
            product.price = price || product.price;
            product.code = code || product.code;
            product.avl = avl || product.avl;
            product.status = status || product.status;

            console.log('Product avl '+product.avl);

            product.save((err, product) => {
                if(err){
                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        data: product
                    });
                }
            });
        }
    });
};


var deleteProduct = (req, res, next) => {

    console.log('In delete');

    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if(err){
            // console.log('In delete err: ' + err);

            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            //console.log(product);
            let paths = product.picture;
            for ( let index = 0; index<paths.length; index++) {
                let path = paths[index];
                fs.unlink("./public/" + path, (err) => {
                    if (err) {
                        console.log("failed to delete local image:"+ err);
                    } else {
                        console.log('successfully deleted local image');
                        if (index == paths.length - 1) {
                            return res.status(200).json({
                                message: "Product deleted",
                                success: true,
                                data: product
                            });
                        }
                    }
                });
            }
        }
    });
};

module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getCategory,
    updateProduct2,
    getCatProduct,
    getTopProduct
};
