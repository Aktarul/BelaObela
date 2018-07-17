var SubCategory = require('../model/subCategory');



var createSubCategory = (req, res, next) => {


    var category_id = req.body.category_id,
        subCategory = req.body.sub_Category;

    console.log("first "+ category_id  + subCategory);



    var myCategory = new SubCategory({
        category_id: category_id,
        sub_Category: subCategory
    });
    myCategory.save((err, subCategory) => {
        console.log('In save subCategory');
        console.log("second "+ myCategory);
        if(err) {
            console.log('In save error ' + err);
            return res.status(404).json({

                message: err,
                success: false
            });
        }
        else {
            console.log(subCategory);
            return res.status(200).json({
                success: true,
                data: subCategory
            });


        }
    });

};

var getSubCategory = (req, res, next) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            console.log(subCategory);
            return res.status(200).json({
                success: true,
                data: subCategory
            });
        }
    });
};

var getAllSubCategory = (req, res, next) => {
    SubCategory.find( (err, subCategory) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: subCategory
            });
        }
    });
};

var updateSubCategory = (req, res, next) => {


    var category_id = req.body.category_id,
        sub_Category = req.body.sub_Category;

    console.log("first "+ category_id  + subCategory);

    SubCategory.findById(req.params.id, (err, subCategory) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {

            subCategory.sub_Category = sub_Category || subCategory.sub_Category;
            subCategory.category_id = category_id || subCategory.category_id;

            subCategory.save((err, subCategory) => {
                if(err){
                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        data: subCategory
                    });
                }
            });
        }
    });

};

var deleteSubCategory = (req, res, next) => {
    console.log('In sub category delete controller');
    SubCategory.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log('In error ',err);
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "sub category deleted",
                success: true
            });
        }
    });
};

module.exports = {

    createSubCategory,
    getSubCategory,
    getAllSubCategory,
    updateSubCategory,
    deleteSubCategory
};
