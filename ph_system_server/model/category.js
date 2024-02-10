const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program'},
    
    }, {
    timestamps: true
});
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
