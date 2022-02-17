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
const { isBuffer } = require("util");
const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'public')));

function createBooksQuery(genre, typeOfSort) {
    let bookGenre = "";
    let query = "";

    if (genre == 'fiction') {bookGenre = "Художественная литература";}
    else if (genre == 'non-fiction') {bookGenre = 'Научно-популярная литература';}
    else if (genre == 'study') {bookGenre = 'Учебная литература';}
    else if (genre == 'self-edu') {bookGenre = 'Саморазвитие';}
    else if (genre == 'bio') {bookGenre = 'Биографии, мемуары';}

    switch(typeOfSort) {
        case "by_name": 
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.genre = '" + bookGenre + "' ORDER BY book.name";
            
            break;
        case "by_price_up": 
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.genre = '" + bookGenre + "' ORDER BY book.price";

            break;
        case "by_price_down":
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.genre = '" + bookGenre + "' ORDER BY book.price DESC";
            
            break;
        case "by_id":
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.genre = '" + bookGenre + "' ORDER BY book.book_id";

            break;
    }
    return query;
}

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

//check whether user with these email and password exists
app.post("/login", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const password = req.body.password;

    let user = [email, password];

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(query, user, function(err, result) {
        if(err) console.log(err);
        if(result.length == 1) res.send("true");
        else res.send("false");
    });
});

// get user for entered personal account
app.post("/users/:email/:password", function(req, res) {
    const email = req.params['email'];
    const password = req.params['password'];

    let user = [email, password];

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(query, user, function(err, result) {
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
});

//add new user to the database
app.post("/signup", jsonParser, function(req, res) {
    debugger;
    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const psw = req.body.password;

    let user = [name, email, psw, phone];

    const query = "INSERT INTO user VALUES (NULL, ?, ?, ?, NULL, ?);";

    connection.query(query, user, function(err, result) {
        if(err) {
            console.log(err);
            res.send("Пользователь с таким email уже существует!");
        }
        else {
            res.send("Регистрация прошла успешно! Теперь используйте форму для входа в Личный кабинет.");
        }
    });
});

app.get("/books/all/:typeOfSort", (req, res) => {
    const typeOfSort = req.params["typeOfSort"];

    let query = "";
    
    switch(typeOfSort) {
        case "by_name": 
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id ORDER BY book.name";
            
            break;
        case "by_price_up": 
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id ORDER BY book.price";

            break;
        case "by_price_down":
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id ORDER BY book.price DESC";
            
            break;
        case "by_id":
            query = "SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id ORDER BY book.book_id";

            break;
    }

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({ error: "Ошибка отображения книг!" });
        }
        else {
            res.send(result);
        }
    });
});

app.get("/books/:genre/:typeOfSort", (req, res) => {
    const genre = req.params['genre'];
    const typeOfSort = req.params["typeOfSort"];

    let query = createBooksQuery(genre, typeOfSort);

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({ error: "Ошибка отображения книг!" });
        }
        else {
            res.send(result);
        }
    });
});

app.get("/books/:id", (req, res) => {
    const bookId = req.params["id"];

    const query = `SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id, book.series, book.publishing_house, book.year, book.number_of_pages, book.age_limit, book.description, book.availability FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE books_authors.book_id = ${bookId};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({ error: "Ошибка отображения книги!" });
        }
        else {
            res.send(result);
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on 3000.");
});