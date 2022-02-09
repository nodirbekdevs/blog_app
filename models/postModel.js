const {Schema, model} = require('mongoose')

const Post = model('Post', new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  image: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
}, {timestamps: true}))

module.exports = Post
