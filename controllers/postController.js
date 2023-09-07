require("dotenv").config()
const {Post} = require('../models')
class PostController {
    static async findPosts(req, res, next) {
        try {
            const data = await Post.findAll()
            if (data.length == 0) {
                throw {name: "ErrorNotFound"}
            }
            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }
    static async findPostById(req, res, next) {
        try {
            const id = req.params.postId

            const data = await Post.findOne({
                where: {id}
            })
            if (!data) {
                throw {name: "ErrorNotFound"}
            }
            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }
    static async createPost(req, res, next) {
        try {
                const { title, content, author } = req.body;
                const url_image = req.file ? req.file.filename : null;
            
                const post = await Post.create({
                  title,
                  content,
                  url_image: `http://localhost:${process.env.PORT}/uploads/${url_image}`,
                  author,
                });
                if(!post) {
                    throw {name: "FailedCreate"}
                }
            
                res.status(201).json({ message: 'Create post successfully!'});
        } catch (error) {
            next(error)
        }
    }
    static async updatePost(req, res, next) {
        try {
            const id = req.params.postId
            const {title, content, author} = req.body

            const findPost = await Post.findOne({
                where: {id}
            })
            if (!findPost) {
                throw {name: "ErrorNotFound"}
            }

            const updatePost = await Post.update({ title, content, author }, {
                where: {
                  id
                }
            })
            if (updatePost[0] === 0) {
                throw { name: "FailedUpdate" };
            }

            res.status(200).json({message: "Update post successfully!"})
        } catch (error) {
            next(error)
        }
    }
    static async updatePostImage(req, res, next) {
        try {
            const id = req.params.postId
            const url_image = req.file ? req.file.filename : null;
            if (url_image === null) {
                throw {name: "IncompleteData"}
            }

            const updatePostImage = await Post.update({ url_image }, {
                where: {
                  id
                }
            })
            if (updatePostImage[0] === 0) {
                throw { name: "FailedUpdate" };
            }

            res.status(200).json({message: "Update image post successfully!"})
        } catch (error) {
            next(error)
        }
    }
    static async deletePost(req, res, next) {
        try {
            const id = req.params.postId
            const deletePost = await Post.destroy({
                where:{id}
            })

            if (deletePost[0] === 0) {
                throw { name: "FailedDelete" };
            }

            res.status(200).json({message: "Delete post successfully!"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PostController