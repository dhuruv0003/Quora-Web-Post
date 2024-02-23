
const { log } = require("console");
const express = require("express");
const app = express();
const port = process.env.PORT||3000;
const path = require("path");
const methodOverride=require("method-override")
require('dotenv').config()

//Universally Unique ID is used to create unique identifiers for each post
const { v4: uuidv4 } = require("uuid");
uuidv4();

// Now for express to parse a url encoded data we use folloeing condition

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"))

//Since we have to perform CRUD operatio on our resource . Thereforre we define it with let keyword insted of const keyword

let posts = [
  {
    id: uuidv4(),
    username: "john_doe",
    content: "Never Think of Quick Success without hardwork Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et veritatis tempore molestias, dolorum sed quo soluta, similique obcaecati illo, possimus quibusdam. Beatae, et, nemo sapiente est, eos officia voluptatem consectetur corporis harumSuccess without hardwork Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et veritatis tempore molestias, dolorum sed quo soluta, similique obcaecati illo, possimus quibusdam. Beatae, et, nemo sapiente est, eos officia " ,
  },
  {
    id: uuidv4(),
    username: "amit_mahajan",
    content: "HardWork is important to achieve Succes Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et veritatis tempore molestias, dolorum sed quo soluta, similique obcaecati illo, possimus quibusdam. Beatae, et, nemo sapiente est, eos officia voluptatem consectetur corporis harum mollitia exercitationem! Maxime fugiat quia cupiditate non.",
  },
  {
    id: uuidv4(),
    username: "rajiv_Sukla",
    content: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et veritatis tempore molestias, dolorum sed quo soluta, similique obcaecati illo, possimus quibusdam. Beatae, et, nemo sapiente est, eos officia voluptatem consectetur corporis harum mollitia exercitationem! Maxime fugiat quia cupiditate non.",
  },
];

// Create Operation
app.get("/posts", (req, res) => {
  // res.send("server is wprking well")
  res.render("index.ejs", { posts });
});

//New Post Operation
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  //at the same time we will push new id for new post
  let id = uuidv4();
  posts.unshift({ id, username, content });
  // after publishing the post, redirect to home page
  res.redirect("/posts");
});
// View Single individual post operation having specific /:id

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  // console.log({id});
  // res.send(`Sab Changa si ${id}`);
  //Here we are comparing that the id in http request(posts/:id) is equivelent to that id in post. If yes then it return the post with that id and do action else undefined
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
        // goto hopscotch 
  let newcontent=req.body.content;
        //here req.body.conten represent the value of body request
  console.log(newcontent);
  let post = posts.find((p)=> id===p.id);
  post.content=newcontent;
  res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
  let {id}  = req.params;
  let post=posts.find((p) => id === p.id);
  res.render("edit.ejs",{ post });
});

app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
    // now filter all the element of array thet do not have id equal to the id given in api request. Because of the post of particular id will be automatically deleted/
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/posts`);
});

