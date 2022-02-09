const {Schema, model} = require('mongoose')

const User = model('User', new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  phone: {type: String, unique: true},
  interestedCategory: {type: Schema.Types.ObjectId, ref: 'Category'},
  isAdmin: {type: Boolean, default: false},
  isSuperAdmin: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true}
}, {timestamps: true}))

module.exports = User
