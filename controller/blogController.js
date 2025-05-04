const Blog = require("../model/blogModel");

exports.createBlog = async(req,res) => {
    const {title , subtitle , description} = req.body;
    if(!title || !subtitle || !description) {
        return res.status(400).json({
            message : "Please provide title , subtitle , description"
        })
    }

    const blog = await Blog.create({
        title,
        subtitle,
        description
    })

    res.status(200).json({
        message : "Blog created successfully",
        data : blog
    })

}