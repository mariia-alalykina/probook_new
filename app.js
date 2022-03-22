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
app.post("/login", jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const password = req.body.password;

    let user = [email, password];

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(query, user, (err, result) => {
        if(err) console.log(err);
        if(result.length == 1) res.send("true");
        else res.send("false");
    });
});

// get user for entered personal account
app.post("/users/:email/:password", (req, res) => {
    const email = req.params['email'];
    const password = req.params['password'];

    let user = [email, password];

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?;';
    connection.query(query, user, (err, result) => {
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
app.post("/signup", jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const psw = req.body.password;

    let user = [name, email, psw, phone];

    const query = "INSERT INTO user VALUES (NULL, ?, ?, ?, NULL, ?);";

    connection.query(query, user, (err, result) => {
        if(err) {
            console.log(err);
            res.send("Пользователь с таким email уже существует!");
        }
        else {
            res.send("Регистрация прошла успешно! Теперь используйте форму для входа в Личный кабинет.");
        }
    });
});

//display all books with selected type of sort
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

//display books of selected genre with selected type of sort
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

//display all of the information about selected book
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

//display results of searching by bookname or author
app.get("/search/:text", (req, res) => {
    const textForSearching = req.params["text"];

    const query = `SELECT book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id WHERE book.name LIKE '%${textForSearching}%' OR authors.author_name LIKE '%${textForSearching}%' OR authors.author_surname LIKE '%${textForSearching}%';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({ error: "Ошибка поиска книг!" });
        }
        else {
            res.send(result);
        }
    });
});

//get author's surnames 
app.get('/authors', (req, res) => {
    const query = `SELECT authors.author_surname FROM authors ORDER BY authors.author_surname;`

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка запроса авторов!'})
        }
        else {
            res.send(result);
        }
    });
});

//get all of the years of publishing
app.get('/years', (req, res) => {
    const query = `SELECT DISTINCT book.year FROM book ORDER BY book.year DESC;`

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка запроса годов издания!'})
        }
        else {
            res.send(result);
        }
    });
});

//get all of the books by author
app.get('/authorbooks/:author', (req, res) => {
    const author = req.params['author'];

    const query = `SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE authors.author_surname = '${author}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка поиска книг по автору!'});
        }
        else {
            res.send(result);
        }
    })
});

//get all of the books by year
app.get('/yearbooks/:year', (req, res) => {
    const year = req.params['year'];

    const query = `SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.year = ${year};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка поиска книг по году издания!'});
        }
        else {
            res.send(result);
        }
    });
});

//get all of the books in the selected price range
app.get('/costbooks/:cost_from/:cost_to', (req, res) => {
    const costFrom = req.params['cost_from'];
    const costTo = req.params['cost_to'];

    const query = `SELECT book_image.url_image, book.price, book.name, authors.author_name, authors.author_surname, book.book_id FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE book.price BETWEEN ${costFrom} AND ${costTo};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: "Ошибка поиска книг по диапазону цен!"});
        } else {
            res.send(result);
        }
    });
});

//add details about order
app.post('/add_order', jsonParser, (req, res) => {
    debugger;
    if(!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const phone = req.body.phone;
    const region = req.body.region;
    const town = req.body.town;
    const postOffice = req.body.postOffice;
    const payMethod = req.body.payMethod;
    const orderStatus = req.body.orderStatus;
    const totalCost = req.body.totalCost;

    let order = [userId, phone, region, town, postOffice, payMethod, orderStatus, totalCost];

    const query1 = `INSERT INTO book_order VALUES (NULL, ?, NOW(), ?, ?, ?, ?, ?, ?, ?);`;

    connection.query(query1, order, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });    
});

//add books which are in order
app.post('/add_order_books', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    debugger;

    const books = req.body.books;

    for (let key in books) {
        let book = [key, books[key][3], books[key][4]];

        let query = `INSERT INTO order_details VALUES (LAST_INSERT_ID(), ?, ?, ?);`

        connection.query(query, book, (err, result) => {
            if(err) {
                console.log(err);
                res.send('false');
            }
        })
    }    

    res.send('true');
});

//get order history by user ID
app.get('/order_history_id/:id', (req, res) => {
    const id = Number.parseInt(req.params['id'], 10);

    let query = `SELECT book_order.order_id, book_order.date, book_order.phone_number, book_order.region, book_order.town, 
    book_order.post_office, book_order.payment_method, book_order.order_status, book_order.total_cost,
    order_details.book_id, order_details.number_of_books, order_details.cost_of_book,
    book.name, authors.author_name, authors.author_surname
    FROM book_order 
    LEFT JOIN order_details 
    ON order_details.order_id = book_order.order_id 
    LEFT JOIN book
    ON book.book_id = order_details.book_id
    LEFT JOIN books_authors
    ON books_authors.book_id = order_details.book_id
    LEFT JOIN authors 
    ON authors.author_id = books_authors.author_id
    WHERE book_order.user_id = ${id}`;

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err);
                res.json({error: `Ошибка отображения истории заказов клиента с id ${id}`});
            } else {
                res.send(result);
            }
        })   
});

//get order history by the date
app.get('/order_history_date/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `SELECT book_order.order_id, book_order.date, book_order.phone_number, book_order.region, book_order.town, 
    book_order.post_office, book_order.payment_method, book_order.order_status, book_order.total_cost,
    order_details.book_id, order_details.number_of_books, order_details.cost_of_book,
    book.name, authors.author_name, authors.author_surname
    FROM book_order 
    LEFT JOIN order_details 
    ON order_details.order_id = book_order.order_id 
    LEFT JOIN book
    ON book.book_id = order_details.book_id
    LEFT JOIN books_authors
    ON books_authors.book_id = order_details.book_id
    LEFT JOIN authors 
    ON authors.author_id = books_authors.author_id
    WHERE book_order.date BETWEEN ${dateFrom} AND ${dateTo}`;

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err);
                res.json({error: `Ошибка отображения истории заказов за дату ${dateFrom}`});
            } else {
                res.send(result);
            }
        })   
});

app.listen(3000, function() {
    console.log("Server started on 3000.");
});