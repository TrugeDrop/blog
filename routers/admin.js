const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");
const path = require("path");

router.get("/", (req, res) => {
    res.render("admin/index", { title: "Yönetici Paneli", admin: req.session.admin });
});

router.get("/new-blog", (req, res) => {
    res.render("admin/new-blog", { title: "Yeni Blog", admin: req.session.admin });
});

router.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs){
       res.render("admin/blogs", { title: "Bloglar", blogs: blogs, admin: req.session.admin }); 
    });
});

router.get("/blog/edit/:id", (req, res) => {
    Blog.findById(req.params.id, function(err, blog){
       if(!blog) return res.send("Blog bulunamadı!");
        
       res.render("admin/edit-blog", { title: "Blog'u Düzenle", blog: blog, admin: req.session.admin }); 
    });
});

router.post("/new-blog", (req, res) => {
    const { name, slug_name, description, content } = req.body;
    const thumbnail = req.files.thumbnail;
    let file_type = thumbnail.name.split(".");
    file_type = file_type[file_type.length-1];
    if(file_type !== "png" && file_type !== "jpg" && file_type !== "jpeg") return res.send("Geçersiz thumbnail uzantısı! png, jpeg veya jpg uzantıları kabul edilir.");
    const tags = req.body.tags.split(",");
    const sources = req.body.sources.split(",");
    
    const new_blog = new Blog({
        name,
        slug_name,
        content,
        tags,
        sources: sources[0] === "" ? [] : sources,
        thumbnail: "/thumbnails/"+slug_name+"."+file_type,
        description,
        active: true
    });
    
    new_blog.save(function(err){
       if(err) return res.send(err);
        
       thumbnail.mv(path.resolve('public/thumbnails', slug_name+"."+file_type), function(error){
            if(error) return res.send(error);
            res.send("İşlem başarılı!");
       });
    });
});

router.post("/blog/edit/:id", (req, res) => {
    const { name, slug_name, description, content } = req.body;
    //const thumbnail = req.files.thumbnail;
    //let file_type = thumbnail.name.split(".");
    //file_type = file_type[file_type.length-1];
    //if(file_type !== "png" && file_type !== "jpg" && file_type !== "jpeg") return res.send("Geçersiz thumbnail uzantısı! png, jpeg veya jpg uzantıları kabul edilir.");
    const tags = req.body.tags.split(",");
    const sources = req.body.sources.split(",");
    
    Blog.findById(req.params.id, function(err, blog){
        blog.name = name;
        blog.slug_name = slug_name;
        blog.description = description;
        blog.content = content;
        blog.tags = tags;
        blog.sources = sources[0] === "" ? [] : sources;
        
        blog.save(function(err){
           if(err) return res.send(err);

           res.send("İşlem başarılı!");
        });
    });
});

router.post("/blog/deactive", function(req, res){
   Blog.findById(req.body.id, function(err, blog){
      if(!blog) return res.json({status: 502, message: "Blog bulunamadı!"}); 
       
      blog.active = false;
      blog.save();
       
      res.json({ status: 200 });
   });
});

router.post("/blog/active", function(req, res){
   Blog.findById(req.body.id, function(err, blog){
      if(!blog) return res.json({status: 502, message: "Blog bulunamadı!"}); 
       
      blog.active = true;
      blog.save();
       
      res.json({ status: 200 });
   });
});

module.exports = router;