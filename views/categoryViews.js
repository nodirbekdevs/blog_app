const Category = require('./../models/categoryModel')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({'createdAt': -1, 'updatedAt': -1});
    if (!categories) res.status(500).json({success: false})
    res.status(200).send(categories)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(500).json({success: false})
    res.status(201).send(category)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const makeCategory = async (req, res) => {
  const category = new Category({name: req.body.name})
  try {
    await category.save()
    if (!category) res.status(500).json({success: false})
    res.status(200).send(category)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if (!category) res.status(500).json({success: false})
    res.status(200).send(category)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const deleteCategory = async (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(category => {
    if (category) return res.status(500).json({success: true})
    else return res.status(500).json({success: false})
  }).catch(error => {
    return res.status(404).send({success: false, error: error})
  })
}

module.exports = {getCategories, getCategory, makeCategory, updateCategory, deleteCategory}
