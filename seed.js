const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "main.sql";

const runSeed = async () => {
    console.log('hello')
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
  console.log('posts')
        db.run (`
           
            CREATE TABLE if not exists posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT VARCHAR(20),             
            content TEXT VARCHAR(200)
        
            )`,
        (err) => {
            if (err) {
                console.log(err)
            }else{
                console.log('ok')
                let insert = 'INSERT INTO posts (title, content) VALUES (?,?)'
                db.run(insert, ["Article 1 !", "Contenu 1 " ])
                db.run(insert, ["Article 2 !", "Contenu 1" ])
                db.run(insert, ["Article 3 !", "Contenu 1" ])
                db.run(insert, ["Article 3 !", "Contenu 1" ])  
                db.run(insert, ["Article 3 !", "Contenu 1" ])
                db.run(insert, ["Article 3 !", "Contenu 1" ])
            }
        }
        )
    }
}
)
}
module.exports = {
    runSeed
}