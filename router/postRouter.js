const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const upload = require('../middlewares/uploadImage')

router.get('/posts', PostController.findPosts)
router.get('/posts/:postId', PostController.findPostById)
router.post('/posts', upload.single('url_image'), PostController.createPost)
router.put('/posts/:postId', PostController.updatePost)
router.put('/posts/:postId/image', upload.single('url_image'), PostController.updatePostImage)
router.delete('/posts/:postId', PostController.deletePost)

module.exports = router