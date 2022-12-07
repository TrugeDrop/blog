const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");
const Comments = require("../models/Comments");
const badWordFilter = require("../bad-word-filter");

router.get("/", (req,res)=>{
    res.render("index", {title: "Ana Sayfa", admin: req.session.admin})
});

router.get("/offline", (req,res)=>{
    res.send("Çevrimdışısınız!");
});

router.get("/about", (req,res)=>{
    res.render("site/about", { title: "Hakkımda", admin: req.session.admin });
});

router.get("/blogs", (req,res)=>{
    res.render("site/blogs", { title: "Tüm Bloglar", admin: req.session.admin });
});

router.post("/blogs", (req,res)=>{
    Blog.find({active: true}, function(err, result){
       const blogs = req.body.count ? result.slice(0, req.body.count) : result;
        
       res.json(blogs);
    }).sort({ createdAt: -1 });
});

router.get("/login", (req, res) => {
   if(req.session.admin === true) return res.redirect("/admin");
    
   res.render("admin/login", {title: "Giriş Yap", admin: req.session.admin});
});

router.post("/login", (req, res) => {
    if(process.env.email === req.body.email && process.env.password === req.body.password){
        req.session.admin = true;
        
        res.redirect("/admin");
    }else{
        res.send("Kullanıcı adı veya parola hatalı!");
    }
});

router.get("/blog/:slug", (req,res)=>{
    Blog.findOne({ slug_name: req.params.slug, active: true }).then(result => {
        if(!result) return res.json({ status: 502, message: "Blog bulunamadı!" });
        
        res.render("site/blog", {title: result.name, admin: req.session.admin, blog: result});
    });
});

router.post("/comments", function(req, res){
    Comments.find({ blog_id: req.body.blog_id }, function(err, comments){
       res.json({ comments: comments });
    }).sort({ createdAt: -1 });
});

router.post("/comments/new", (req,res)=>{
    req.body.message = badWordFilter(req.body.message);
    
    const new_comment = new Comments(req.body);
    
    new_comment.save(function(err){
        if(err) return res.json({ status: 502, message: "Bir hata oluştu!" });
        
        res.json({ status: 200 });
    });
});

router.post("/blog/like", (req,res)=>{
    if(!req.body.user_id) return res.json({ status: 502, message: "Kullanıcı ID'si alınamadı!" });
    
    Blog.findById(req.body.blog_id).then(blog => {
        if(!blog) return res.json({ status: 502, message: "Blog bulunamadı!" });
        const is_user = blog.like.indexOf(req.body.user_id);
        const is_user_dislike = blog.dislike.indexOf(req.body.user_id);
        
        if(is_user_dislike !== -1){
            blog.dislike = blog.dislike.filter(function(data){ return data !== req.body.user_id });
        }
        
        if(is_user !== -1){
            blog.like = blog.like.filter(function(data){ return data !== req.body.user_id });
        }else{
            blog.like.push(req.body.user_id);
        }
        
        blog.save();
        
        res.json({ status: 200 });
    });
});

router.post("/blog/dislike", (req,res)=>{
    if(!req.body.user_id) return res.json({ status: 502, message: "Kullanıcı ID'si alınamadı!" });
    
    Blog.findById(req.body.blog_id).then(blog => {
        if(!blog) return res.json({ status: 502, message: "Blog bulunamadı!" });
        const is_user = blog.dislike.indexOf(req.body.user_id);
        const is_user_like = blog.like.indexOf(req.body.user_id);
        
        if(is_user_like !== -1){
            blog.like = blog.like.filter(function(data){ return data !== req.body.user_id });
        }
        
        if(is_user !== -1){
            blog.dislike = blog.dislike.filter(function(data){ return data !== req.body.user_id });
        }else{
            blog.dislike.push(req.body.user_id);
        }
        
        blog.save();
        
        res.json({ status: 200 });
    });
});

router.post("/blog/statistics", (req,res)=>{
    if(!req.body.user_id) return res.json({ status: 502, message: "Kullanıcı ID'si alınamadı!" });
    
    Blog.findById(req.body.blog_id).then(blog => {
        if(!blog) return res.json({ status: 502, message: "Blog bulunamadı!" });
        const is_like = blog.like.indexOf(req.body.user_id) !== -1;
        const is_dislike = blog.dislike.indexOf(req.body.user_id) !== -1;
        
        res.json({ status: 200, like: blog.like.length, dislike: blog.dislike.length, is_like: is_like, is_dislike: is_dislike });
    });
});

router.post("/blog/views/add", function(req, res){
   if(!req.body.user_id) return res.json({ status: 502, message: "Kullanıcı ID'si alınamadı!" });
    
    Blog.findById(req.body.blog_id).then(blog => {
        if(!blog) return res.json({ status: 502, message: "Blog bulunamadı!" });
        const is_user = blog.views.indexOf(req.body.user_id);
        
        if(is_user === -1) blog.views.push(req.body.user_id);
        
        blog.save();
        
        res.json({ status: 200 });
    }); 
});

module.exports = router;