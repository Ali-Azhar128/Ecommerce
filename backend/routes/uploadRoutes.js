import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/') //null is for error handling
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function checkFileTypes(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)//first argument for errors only
    } else {
        cb('Images only!')//since first argument is not null it throws an error
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileTypes(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`, // here
        });
})

export default router