const Blog = require("../model/blogModel");
const fs = require('fs')

exports.createBlog = async(req,res) => {
    const {title , subtitle , description} = req.body;
    let filename;
    if(req.file){
        filename = "http://localhost:3000/" + req.file.filename;
    }
    else {
        filename = "https://imgs.search.brave.com/K6hVeZBEzyEWq7XzsOQ7dlSOR1medhpgGQ8rotY9C_8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vM2Z0QUxn/WU4xVEJDdnBUQmo2/SHNRaTYzMFgtVGMz/YmEtYTNZUnlKMmxJ/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L1pu/SmxaUzF3YUc5MGJ5/OXcvY205bmNtRnRi/V2x1WnkxaS9ZV05y/WjNKdmRXNWtMV052/L2JHeGhaMlZmTWpN/dE1qRTAvT1Rrd01U/YzNPUzVxY0djXy9j/MlZ0ZEQxaGFYTmZh/SGxpL2NtbGtKbmM5/TnpRdw.jpeg"
    }
    if(!title || !subtitle || !description) {
        return res.status(400).json({
            message : "Please provide title , subtitle , description"
        })
    }

    const blog = await Blog.create({
        title,
        subtitle,
        description,
        image : filename
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
