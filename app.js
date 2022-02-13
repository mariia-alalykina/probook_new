const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection( {
    host: "localhost",
    user: "Mariia",
    database: "probook",
    password: "Database1@@@"
});

function createConnection() {
    connection.connect(function(err){
        if (err) {
          return console.error("Ошибка: " + err.message);
        }
        else{
          console.log("Подключение к серверу MySQL успешно установлено");
        }
     });
}

createConnection();

 // закрытие подключения
 /* connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
}); */

const app = express();
const path = require('path');
const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/public/index.html");
});

app.get("/about", function(request, response){
    response.sendFile(__dirname + "/public/about.html");
});

app.get("/basket", function(request, response){
    response.sendFile(__dirname + "/public/basket.html");
});

app.get("/blog", function(request, response){
    response.sendFile(__dirname + "/public/blog.html");
});

app.get("/catalog", function(request, response){
    response.sendFile(__dirname + "/public/catalog.html");
});

app.get("/contacts", function(request, response){
    response.sendFile(__dirname + "/public/contacts.html");
});

app.get("/delivery", function(request, response){
    response.sendFile(__dirname + "/public/delivery.html");
});

app.get("/login", function(request, response){
    response.sendFile(__dirname + "/public/login.html");
});

app.get("/news", function(request, response){
    response.sendFile(__dirname + "/public/news.html");
});

app.post("/api/login", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const password = req.body.password;

    let user = [email, password];

   // createConnection();

    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(sql, user, function(err, result) {
        if(err) console.log(err);
        if(result.length == 1) res.send(true);
        else res.send(false);
    });

    //connection.end();    
    debugger;
});

app.post("/api/user/:email/:password", function(req, res) {
    debugger;
    const email = req.params['email'];
    const password = req.params['password'];

    let user = [email, password];

    //createConnection();

    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(sql, user, function(err, result) {
        if(err) console.log(err);
        let user_ = null;
        user_ = result;
        if(user_){
            res.send(user_);
        }
        else{
            res.status(404).send();
        }
    });

    //connection.end();
});

app.listen(3000, function() {
    console.log("Server started on 3000.");
});