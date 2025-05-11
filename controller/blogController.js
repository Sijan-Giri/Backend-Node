const Blog = require("../model/blogModel");
const fs = require('fs')

exports.createBlog = async(req,res) => {
    const {title , subtitle , description} = req.body;
    const image = req.file.filename;
    if(!title || !subtitle || !description) {
        return res.status(400).json({
            message : "Please provide title , subtitle , description"
        })
    }

    const blog = await Blog.create({
        title,
        subtitle,
        description,
        image
    })

    res.status(200).json({
        message : "Blog created successfully",
        data : blog
    })

}

exports.getBlogs = async(req,res) => {
    const blog = await Blog.find();
    if(blog.length == 0) {
        return res.status(404).json({
            message : "Blogs not found!"
        })
    }
    res.status(200).json({
        message : "Blog fetched successfully",
        data : blog
    })
}

exports.getSingleBlog = async(req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const blog = await Blog.findById(id);
    if(!blog) {
        return res.status(404).json({
            message : "Blog with this id doesn't exists"
        })
    }
    res.status(200).json({
        message : "Blog fetched successfully",
        data : blog
    })
}

exports.deleteBlog = async (req,res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const blogExists = await Blog.findById(id);

    fs.unlink(`uploads/${blogExists.image}`,(err) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log("File deleted successfully")
        }
    })

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
        message : "Blog deleted successfully"
    })
    }

exports.updateBlog = async(req,res) => {
    const {id} = req.params;
    const {title , subtitle, description} = req.body;
    if(!id) {
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const image = req.file.filename;
    const updatingBlog = await Blog.findById(id)
    if(!updatingBlog) {
        return res.status(404).json({
            message : "Blog not found with this id"
        })
    }
    fs.unlink(`uploads/${updatingBlog.image}`,(err) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log("File deleted successfully")
        }
    }) 
    const blog = await Blog.findByIdAndUpdate(id,{
        title,
        subtitle,
        description,
        image
    },{new : true})
    res.status(200).json({
        message : "Blog updated successfully",
        data : blog
    })
}    
