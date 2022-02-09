const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb) {cb(null, 'uploads/')},
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ? cb(null, true) : cb(null, false)
}

const limits = {fileSize: 1024 * 1024 * 5}

const upload = multer({storage, fileFilter, limits})

module.exports = upload
