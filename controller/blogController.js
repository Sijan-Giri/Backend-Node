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

exports.getBlogs = async(req,res) => {
    const blog = await Blog.find();
    if(!blog) {
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

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
        message : "Blog deleted successfully"
    })
}