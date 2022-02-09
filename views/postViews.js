const Post = require('./../models/postModel')

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user category").sort({'createdAt': -1, 'updatedAt': -1})
    if (!posts) res.status(500).send({success: false})
    res.status(200).send(posts)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const searchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({path: 'category', match: {category: req.query.category}})
    if (!posts) res.status(500).send({success: false})
    res.status(200).send(posts)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user category")
    if (!post) res.status(500).send({success: false})
    res.status(200).send(post)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const makePost = async (req, res) => {
  const {title, content, category} = req.body
  const image = req.file ? req.file.path : ''
  const user = req.user ? req.user._id : ''
  const post = new Post({title, content, image, user: user, category})
  try {
    await post.save()
    if (!post) res.status(500).send(post)
    res.status(201).send(post)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const updatePost = async (req, res) => {
  const {title, content, category} = req.body
  const image = req.file ? req.file.path : ''
  // const post = Post.findById(req.params.id)
  // if (req.user._id != post.user) res.status(500).send({success: false})
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {title, content, image, category}, {new: true})
    if (!post) res.status(500).send({success: false})
    res.status(201).send(post)
  } catch (e) {
    res.status(404).send({success: false, error: e})
  }
}

const deletePost = async (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(post => {
    if (post) return res.status(201).json({success: true})
    else return res.status(500).json({success: false})
  }).catch(e => {
    res.status(404).send({success: false, error: e});
  })
}

module.exports = {getPosts, searchPosts, getPost, makePost, updatePost, deletePost}
