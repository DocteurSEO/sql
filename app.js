
const express = require('express');
const bodyParser = require("body-parser");
const {getPosts, getOnePost, createPost, deletePost, updatePost} = require("./sql");
// const {runSeed} = require("./seed");
// runSeed();

const app = express();
const port = 4054;


app.use(bodyParser.json())




 app.get("/api/posts", async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
});

app.get("/api/posts/:id", async (req, res) => {
    const post = await getOnePost(req.params.id);
    res.json(post);
})

app.post("/api/posts", async (req, res) => { 
    if(!req.body.title || !req.body.content){
        res.status(400).json({error: "title and content is required "});
        return;
    }
    const post = await createPost(req.body.title, req.body.content);
    res.json({status: "post added", data: {
      title:req.body.title,
      content: req.body.content
    }});
})

app.patch("/api/posts/:id", async (req, res) => {
    if(!req.body.title || !req.body.content){
        res.status(400).json({error: "title and content is required "});
        return;
    }
    const post = await updatePost(req.params.id, req.body.title, req.body.content);
    res.json({status: "post Updated", data: {
      title:req.body.title,
      content: req.body.content
    }});
})

app.delete("/api/posts/:id", async (req, res) => {
    const post = await deletePost(req.params.id);
    res.json({ status : 'deleted', post});
    
})
 
 
app.listen(port, () => console.log(`API listening on port ${port}!`));