var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subCategorySchema = new Schema({

    category_id: {type: String},
    sub_Category: {type: String}
});

module.exports = mongoose.model('subCategory', subCategorySchema);