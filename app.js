const express = require("express");
const mysql = require("mysql2");

/* const connection = mysql.createConnection( {
    host: "localhost",
    user: "Mariia",
    database: "probook",
    password: "Database1@@@"
}); */

const app = express();
const path = require('path');
const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'public')));

/* app.get("/", function(request, response){
     
    // отправляем ответ
    response.sendFile(__dirname + "/public/index.html");
}); */




app.listen(3000, function() {
    console.log("Server started on 3000.");
});