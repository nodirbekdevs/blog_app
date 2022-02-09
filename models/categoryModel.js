const {Schema, model} = require('mongoose')

const Category = model('Category', new Schema({
  name: {type: String, required: true}
}, {timestamps: true}))

module.exports = Category
