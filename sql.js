const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "main.sql";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }
});

async function getPosts() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM posts", (err, rows) => {
            if (err) {
              reject(err)
              return;
            }
            resolve(rows)
          });
    })
}

async function getOnePost (id){
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM posts WHERE id = ?", id, (err, rows) => {
            if (err) {
              reject(err)
              return;
            }
            resolve(rows)
          });
    })
}

async function createPost(title, content){
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO posts (title, content) VALUES (?,?)", [title, content], (err) => {
            if (err) {
              reject(err)
              return;
            }
            resolve()
          });
    })
}

async function deletePost(id){
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM posts WHERE id = ?", id, (err) => {
            if (err) {
              reject(err)
              return;
            }
            resolve()
          });
    })
}

async function updatePost(id, title, content){
    return new Promise((resolve, reject) => {
        db.run("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], (err) => {
            if (err) {
              reject(err)
              return;
            }
            resolve()
          });
    })
}

module.exports = {
    getPosts, 
    getOnePost,
    createPost,
    deletePost,
    updatePost
}
