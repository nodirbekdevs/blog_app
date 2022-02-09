const User = require('./../models/userModel')
const bcrypt = require('bcryptjs')
const {salt} = require('./../utils/keys')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("interestedCategory").sort({'createdAt': -1, 'updatedAt': -1});
    if (!users) res.status(500).json({success: false});
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("interestedCategory");
    if (!user) res.status(500).json({success: false});
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const makeUser = async (req, res) => {
  const {username, password, firstName, lastName, phone, interestedCategory} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    res.status(409).json({message: 'Такой username уже занят. Попробуйте другой'})
  } else {
    const user = new User({username, password: bcrypt.hashSync(password, salt), firstName, lastName, phone, interestedCategory})
    try {
      await user.save()
      if (!user) res.status(500).send({status: false})
      res.status(201).json(user)
    } catch (e) {
      res.status(404).send({success: false, error: e})
    }
  }
}

const updateUser = async (req, res) => {
  const {username, firstName, lastName, phone, interestedCategory} = req.body
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, {username, firstName, lastName, phone, interestedCategory}, {new: true}
    )
    if (!user) res.status(500).send({status: false})
    res.status(201).json(user)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const makeAdmin = async (req, res) => {
  const {username, password, firstName, lastName, phone, interestedCategory} = req.body;
  const candidate = await User.findOne({username: username});
  if (candidate) {
    res.status(409).json({message: 'Такой username уже занят. Попробуйте другой'});
  } else {
    const user = new User({username, password: bcrypt.hashSync(password, salt), firstName, lastName, phone, interestedCategory, isAdmin: true});
    try {
      await user.save()
      if (!user) res.status(500).send({status: false})
      res.status(201).json(user)
    } catch (e) {
      res.status(404).send({success: false, error: e})
    }
  }
}

const updateToSuperAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {isSuperAdmin: true}, {new: true})
    if (!user) res.status(500).send({status: false})
    res.status(201).json(user)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const updateAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {isAdmin: req.body.isAdmin}, {new: true});
    if (!user) res.status(500).send({status: false})
    res.status(201).json(user)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const blockOrUnblock = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {isActive: req.body.isActive}, {new: true});
    if (!user) res.status(500).send({status: false})
    res.status(201).json(user)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if (user) return res.status(201).json({success: true})
    else return res.status(500).json({success: false})
  }).catch(e => {
    res.status(404).send({success: false, error: e})
  })
}

module.exports = {getUsers, getUser, makeUser, updateUser, makeAdmin, updateToSuperAdmin, updateAdmin, blockOrUnblock, deleteUser}
