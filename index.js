const { render } = require("ejs");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
app.use(express.urlencoded({extended: true}));
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));


let posts = [
    {
        id : uuidv4(),
        username : "Arjun Patil",
        content : "Free Fire"
    },
    {
        id : uuidv4(),
        username : "Anuj Patil",
        content : "Vastagune huiiye"
    },
    {
        id : uuidv4(),
        username : "Vijay Hajare",
        content : "Chashmish"
    },
    {
        id : uuidv4(),
        username : "Abhishek Kapse",
        content : "Amme tumake bhalo bashi"
    }
]



//index route
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

//new route
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

//New route
app.post("/posts", (req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id ,username, content});
    res.redirect("/posts");
});


//Show route

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});



//Edit route
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});

    
});
//Edit route

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
    
});


app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});



//Root route
app.get("/", (req,res)=>{
    res.send("server is working");
});

app.listen(port, ()=>{
    console.log("app is listening ");
});
