const bcrypt = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const User = require('./../models/userModel')
const {secret_jwt, salt} = require('./../utils/keys')


const login = async (req, res) => {
  const {username, password} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password)
    if (passwordResult) {
      const token = sign(
        {username: candidate.username, _id: candidate._id, isAdmin: candidate.isAdmin, isSuperAdmin: candidate.isSuperAdmin},
        secret_jwt, {expiresIn: 60 * 60}
      )
      res.header('x-auth-token', token).send(true)
    } else {
      res.status(401).json({message: 'Пароли не совпадают. Попробуйте снова'})
    }
  } else {
    res.status(404).json({message: 'Пользователь с таким email не найден'})
  }
}

const register = async (req, res) => {
  const {username, password, firstName, lastName, phone, interestedCategory} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    res.status(409).json({message: 'Такой username уже занят. Попробуйте другой'})
  } else {
    const user = new User({username, password: bcrypt.hashSync(password, salt), firstName, lastName, phone, interestedCategory})
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = {login, register}
