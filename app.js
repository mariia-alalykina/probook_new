const { query } = require("express");
const express = require("express");
const { status } = require("express/lib/response");
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

//get all of the books
app.get("/books", (req, res) => {
    let query = `SELECT book_image.url_image, book.price, book.name, authors.author_id, authors.author_name, authors.author_surname, book.book_id, book.series, book.publishing_house, book.year, book.number_of_pages, book.age_limit, book.description, book.availability FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id;`;

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.json({error: 'Ошибка получения данных книг!'});
        } else {
            res.send(result);
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

    const query = `SELECT book_image.url_image, book.price, book.name, book.genre, authors.author_id, authors.author_name, authors.author_surname, book.book_id, book.series, book.publishing_house, book.year, book.number_of_pages, book.age_limit, book.description, book.availability FROM books_authors LEFT JOIN book ON book.book_id = books_authors.book_id LEFT JOIN authors ON authors.author_id = books_authors.author_id LEFT JOIN book_image ON book_image.book_id = books_authors.book_id WHERE books_authors.book_id = ${bookId};`;

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
    const query = `SELECT authors.author_id, authors.author_surname, authors.author_name FROM authors ORDER BY authors.author_surname;`

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

//add author
app.post('/author', jsonParser, (req, res) => {
    let authorName = req.body.name;
    let authorSurname = req.body.surname;

    let author = [authorSurname, authorName];

    const query = `INSERT INTO authors VALUES(NULL, ?, ?);`

    connection.query(query, author, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        }
        else {
            res.send('true');
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
    });
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

    const books = req.body.books;

    for (let key in books) {
        let book = [key, books[key][3], books[key][4]];

        let query = `INSERT INTO order_details VALUES (LAST_INSERT_ID(), ?, ?, ?);`

        connection.query(query, book, (err, result) => {
            if(err) {
                console.log(err);
                res.send('false');
            }
        });
    }    

    res.send('true');
});

//get order history by order ID
app.get('/order_history_order_id/:id', (req, res) => {
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
    WHERE book_order.order_id = ${id}`;

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err);
                res.json({error: `Ошибка отображения данных заказа с id ${id}`});
            } else {
                res.send(result);
            }
        });
});

//update order information by order id
app.put('/order_history_order_id/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const orderId = req.params['id'];
    const phone = req.body.phone;
    const region = req.body.region;
    const town = req.body.town;
    const postOffice = req.body.postOffice;
    const status = req.body.status;

    let query = `UPDATE book_order SET `;
    
    if (phone) {
        query += `phone_number = '${phone}'`;
    }
    if (region) {
        if(phone) { query += `, `}
        query += `region = '${region}'`;
    }
    if (town) {
        if(phone || region) { query += `, ` }
        query += `town = '${town}'`;
    }
    if (postOffice) {
        if(phone || region || town) { query += `, ` }
        query += `post_office = '${postOffice}'`;
    }
    if (status) {
        if(phone || region || town || postOffice) { query += `, ` }
        query += `order_status = '${status}'`;
    }
    query += ` WHERE order_id = ${orderId}`;

    connection.query(query, (err, result) => {
        if(err || result.affectedRows == 0) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//delete order by order id
app.delete('/order_history_order_id/:id', (req, res) => {
    const orderId = req.params['id'];

    let query = `DELETE FROM book_order WHERE order_id = ${orderId}`;

    connection.query(query, (err, result) => {
        if (err || result.affectedRows == 0) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//add book into the order
app.post('/order_books/:orderId/:bookId/:numberOfBooks', (req, res) => {   
    const orderId = req.params['orderId'];
    const bookId = req.params['bookId'];
    const numberOfBooks = req.params['numberOfBooks'];

    let book = [orderId, bookId, numberOfBooks];

    let query = `INSERT INTO order_details VALUES (?, ?, ?, (SELECT book.price FROM book WHERE book.book_id = ${bookId}));`

    connection.query(query, book, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            query = `CALL change_order_total_cost_after_adding_book(${orderId});`;

            connection.query(query, (err), (result) => {
                if(err) {
                    console.log(err);
                    res.send('false');
                } else {
                    res.send('true');
                }
            });
        }
    });
});

//delete book from order by order id
app.delete('/order_books/:orderId/:bookId', (req, res) => {
    const orderId = req.params['orderId'];
    const bookId = req.params['bookId'];

    let query = `DELETE FROM order_details WHERE order_id = ${orderId} AND book_id = ${bookId}`;

    connection.query(query, (err, result) => {
        if (err || result.affectedRows == 0) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
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
        });
});

//get order history by the date
app.get('/order_history_date/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `SELECT book_order.order_id, book_order.user_id, book_order.date, book_order.phone_number, book_order.region, book_order.town, 
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
    WHERE book_order.date BETWEEN '${dateFrom}' AND '${dateTo}'`;

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err);
                res.json({error: `Ошибка отображения истории заказов за дату ${dateFrom}`});
            } else {
                res.send(result);
            }
        }); 
});

//get user data by id
app.get('/users/:id', (req, res) => {
    const userId = req.params['id'];

    let query = `SELECT * FROM user WHERE user_id = ${userId}`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения данных пользователя с id ${userId}`});
        } else {
            res.send(result);
        }
    });
});

//update user data by id
app.put('/users/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    let query = `UPDATE user SET `;
    
    if (name) {
        query += `name = '${name}'`;
    }
    if (surname) {
        if(name) { query += `, `}
        query += `surname = '${surname}'`;
    }
    if (email) {
        if(name || surname) { query += `, ` }
        query += `email = '${email}'`;
    }
    if (phone) {
        if(name || surname || email) { query += `, ` }
        query += `phone_number = '${phone}'`;
    }
    if (password) {
        if(name || surname || email || phone) { query += `, ` }
        query += `password = '${password}'`;
    }
    query += ` WHERE user_id = ${userId}`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//delete user by id
app.delete('/users/:id', (req, res) => {
    const userId = req.params['id'];

    let query = `DELETE FROM user WHERE user_id = ${userId}`;

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//add new book
app.post('/book', jsonParser, (req, res) => {
    const authorId = req.body.authorId;
    const series = req.body.series;
    const bookName = req.body.bookName;
    const publishingHouse = req.body.publishingHouse;
    const year = req.body.year;
    const numberOfPages = req.body.numberOfPages;
    const ageLimit = req.body.ageLimit;
    const description = req.body.description; 
    const genre = req.body.genre;
    const availability = req.body.availability;
    const price = req.body.price;
    const image = req.body.image;

    let query = `CALL add_book('${series}', '${bookName}', '${publishingHouse}', ${year}, ${numberOfPages}, '${ageLimit}', '${description}', '${genre}', '${availability}', ${price}, '${image}', ${authorId});`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//change some book data
app.put('/book/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const bookId = req.params['id'];
    const series = req.body.series;
    const bookName = req.body.bookName;
    const publishingHouse = req.body.publishingHouse;
    const year = req.body.year;
    const numberOfPages = req.body.numberOfPages;
    const ageLimit = req.body.ageLimit;
    const description = req.body.description; 
    const genre = req.body.genre;
    const availability = req.body.availability;
    const price = req.body.price;

        let query = `UPDATE book SET `;
        if(series) {
            query += `series = '${series}'`;
        } 
        if(bookName) {
            if(series) { query += `, `; }
            query += `name = '${bookName}'`;
        }
        if(publishingHouse) {
            if(series || bookName) { query += `, `;}
            query += `publishing_house = '${publishingHouse}'`;
        }
        if(year) {
            if(series || bookName || publishingHouse) { query += `, `;}
            query += `year = '${year}'`;
        }
        if(numberOfPages) {
            if(series || bookName || publishingHouse || year) { query += `, `;}
            query += `number_of_pages = '${numberOfPages}'`;
        }
        if(ageLimit) {
            if(series || bookName || publishingHouse || year || numberOfPages) { query += `, `;}
            query += `age_limit = '${ageLimit}'`;
        }
        if(description) {
            if(series || bookName || publishingHouse || year || numberOfPages || ageLimit) { query += `, `;}
            query += `description = '${description}'`;
        }
        if(genre) {
            if(series || bookName || publishingHouse || year || numberOfPages || ageLimit || description) { query += `, `;}
            query += `genre = '${genre}'`;
        }
        if(availability) {
            if(series || bookName || publishingHouse || year || numberOfPages || ageLimit || description || genre) { query += `, `;}
            query += `availability = '${availability}'`;
        }
        if(price) {
            if(series || bookName || publishingHouse || year || numberOfPages || ageLimit || description || genre || availability) { query += `, `;}
            query += `price = '${price}'`;
        }
        query += ` WHERE book_id = ${bookId}; `;
    

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

app.delete('/book/:id', (req, res) => {
    const bookId = req.params['id'];

    let query = `CALL delete_book (${bookId})`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//update author of book
app.put('/book/author/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const bookId = req.params['id'];
    const authorId = req.body.authorId;

    let query = `UPDATE books_authors SET author_id = ${authorId} WHERE book_id = ${bookId}`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//update url-image of book
app.put('/book/image/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const bookId = req.params['id'];
    const image = req.body.image;

    let query = `UPDATE book_image SET url_image = '${image}' WHERE book_id = ${bookId};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//get all of the news 
app.get('/news_list', (req, res) => {
    let query = `SELECT * FROM news ORDER BY date DESC;`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения данных о новостях!`});
        } else {
            res.send(result);
        }
    });
});

//get the news by date
app.get('/news/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `SELECT * FROM news WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения данных по новости за ${dateFrom}!`});
        } else {
            res.send(result);
        }
    });
});

//add news 
app.post('/news', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const header = req.body.header;
    const image = req.body.image;
    const text = req.body.text;

    let data = [header, image, text];

    let query = `INSERT INTO news VALUES(NOW(), ?, ?, ?);`;

    connection.query(query, data, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//delete the news
app.delete('/news/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `DELETE FROM news WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//update the news
app.put('/news/:date', jsonParser, (req, res) => {
    const dateFrom = req.params['date'];
    const header = req.body.header;
    const image = req.body.image;
    const text = req.body.text;

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `UPDATE news SET `;

    if(header) {
        query += `header = '${header}'`;
    } 
    if(image) {
        if (header) { query += `, `;}
        query += `image = '${image}'`;
    }
    if(text) {
        if (header || image) { query += `, `;}
        query += `text = '${text}'`;
    }

    query += ` WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//get main information about articles in blog
app.get('/articles', (req, res) => {
    let query = `SELECT article.date, article.title, article.image, article.introduction FROM article ORDER BY article.date DESC;`

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка отображения данных блога.'});
        } else {
            res.send(result);
        }
    });
});

//get all of the books for articles
app.get('/books_for_article', (req, res) => {
 
    let query = `SELECT books_for_articles.book_id, books_for_articles.subtitle, books_for_articles.image, books_for_articles.description FROM books_for_articles`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения книг для статей.`})
        } else {
            res.send(result);
        }
    });
});

//get books in the selected article
app.get('/books_for_article/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();
 
    let query = `SELECT books_for_articles.book_id, books_for_articles.subtitle, books_for_articles.image, books_for_articles.description FROM books_articles LEFT JOIN books_for_articles ON books_for_articles.book_id = books_articles.book_id WHERE books_articles.article_date BETWEEN '${dateFrom}' AND '${dateTo}'`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения книг для статьи за ${dateFrom}.`})
        } else {
            res.send(result);
        }
    });
});

//get book for articles by id
app.get('/books_for_article_id/:id', (req, res) => {
    const bookId = req.params['id'];
 
    let query = `SELECT books_for_articles.book_id, books_for_articles.subtitle, books_for_articles.image, books_for_articles.description FROM books_for_articles WHERE books_for_articles.book_id = ${bookId}`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения данных книги.`})
        } else {
            res.send(result);
        }
    });
});

app.put('/books_for_article/:id', jsonParser, (req, res) => {
    const bookId = req.params['id'];
    const subtitle = req.body.header;
    const image = req.body.image;
    const description = req.body.text;

    let query = `UPDATE books_for_articles SET `;

    if(subtitle) {
        query += `subtitle = '${subtitle}'`;
    } 
    if(image) {
        if (subtitle) { query += `, `;}
        query += `image = '${image}'`;
    }
    if(description) {
        if (subtitle || image) { query += `, `;}
        query += `description = '${description}'`;
    }

    query += ` WHERE book_id = ${bookId};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//get article by date 
app.get('/article/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `SELECT * FROM article WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка отображения данных статьи за ${dateFrom}.`});
        } else {
            res.send(result);
        }
    })
})

//add main information about article
app.post('/article', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const title = req.body.title;
    const image = req.body.image;
    const introduction = req.body.introduction;

    let data = [title, image, introduction];

    let query = `INSERT INTO article VALUES(NOW(), ?, ?, ?);`;

    connection.query(query, data, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//update the news
app.put('/article/:date', jsonParser, (req, res) => {
    const dateFrom = req.params['date'];
    const title = req.body.header;
    const image = req.body.image;
    const text = req.body.text;

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `UPDATE article SET `;

    if(title) {
        query += `title = '${title}'`;
    } 
    if(image) {
        if (title) { query += `, `;}
        query += `image = '${image}'`;
    }
    if(text) {
        if (title || image) { query += `, `;}
        query += `introduction = '${text}'`;
    }

    query += ` WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    });
});

//delete article 
app.delete('/article/:date', (req, res) => {
    const dateFrom = req.params['date'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();

    let query = `DELETE FROM article WHERE date BETWEEN '${dateFrom}' AND '${dateTo}';`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    })
})

//add book, which uses in the articles
app.post('/books_for_article', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const subtitle = req.body.subtitle;
    const image = req.body.image;
    const description = req.body.description;

    let data = [subtitle, image, description];

    let query = `INSERT INTO books_for_articles VALUES(NULL, ?, ?, ?);`;

    connection.query(query, data, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    })
})

//delete book, which uses in the articles
app.delete('/books_for_article/:id', (req, res) => {
    const bookId = req.params['id'];

    let query = `DELETE FROM books_for_articles WHERE book_id = ${bookId};`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('false');
        } else {
            res.send('true');
        }
    })
})

//delete book from article
app.delete('/books_for_article/:date/:id', (req, res) => {
    const dateParam = req.params['date'];
    const bookId = req.params['id'];

    let date = new Date(Date.parse(dateParam));
    date.setHours(date.getHours() + 3);

    let dateQuery = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate() + ' ' + String(date.getHours()).replace(/^(.)$/, "0$1") + ':' + String(date.getMinutes()).replace(/^(.)$/, "0$1") + ':' + String(date.getSeconds()).replace(/^(.)$/, "0$1");

    let query = `DELETE FROM books_articles WHERE article_date = '${dateQuery}' AND book_id = ${bookId};`;

    connection.query(query, (err, result) => {
        if(err || result.affectedRows === 0) {
            date = new Date(Date.parse(dateParam));
            date.setHours(date.getHours() + 2);
            dateQuery = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate() + ' ' + String(date.getHours()).replace(/^(.)$/, "0$1") + ':' + String(date.getMinutes()).replace(/^(.)$/, "0$1") + ':' + String(date.getSeconds()).replace(/^(.)$/, "0$1");
            query = `DELETE FROM books_articles WHERE article_date = '${dateQuery}' AND book_id = ${bookId};`;

            connection.query(query, (err, result) => {
                if(err || result.affectedRows === 0) {
                    console.log(err);
                    res.send('false');
                } else {
                    res.send('true');
                }
            });
        } else {
            res.send('true');
        }
    });
});

//get certain book in the selected article
app.get('/books_for_article/:date/:id', (req, res) => {
    const dateFrom = req.params['date'];
    const bookId = req.body['id'];

    let date = new Date(Date.parse(dateFrom));
    date.setDate(date.getDate() + 1);

    const dateTo = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate();
 
    let query = `SELECT books_for_articles.book_id, books_for_articles.subtitle, books_for_articles.image, books_for_articles.description FROM books_articles LEFT JOIN books_for_articles ON books_for_articles.book_id = books_articles.book_id WHERE books_articles.book_id = ${bookId} AND books_articles.article_date BETWEEN '${dateFrom}' AND '${dateTo}'`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: `Ошибка получения книги с id ${bookId} для статьи за ${dateFrom}.`})
        } else {
            res.send(result);
        }
    });
});

//add certain book in the certain article
app.post('/books_for_article/:date/:id', (req, res) => {
    const dateParam = req.params['date'];
    const bookId = req.params['id'];

    let date = new Date(Date.parse(dateParam));
    date.setHours(date.getHours() + 3);

    let dateQuery = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate() + ' ' + String(date.getHours()).replace(/^(.)$/, "0$1") + ':' + String(date.getMinutes()).replace(/^(.)$/, "0$1") + ':' + String(date.getSeconds()).replace(/^(.)$/, "0$1");

    let query = `INSERT INTO books_articles VALUES('${dateQuery}', ${bookId});`;

    connection.query(query, (err, result) => {
        if(err) {
            date = new Date(Date.parse(dateParam));
            date.setHours(date.getHours() + 2);
            dateQuery = String(date.getFullYear()).replace(/^(.)$/, "0$1") +'-'+ String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '-' + date.getDate() + ' ' + String(date.getHours()).replace(/^(.)$/, "0$1") + ':' + String(date.getMinutes()).replace(/^(.)$/, "0$1") + ':' + String(date.getSeconds()).replace(/^(.)$/, "0$1");
            query = `INSERT INTO books_articles VALUES('${dateQuery}', ${bookId});`;

            connection.query(query, (err, result) => {
                if(err) {
                    console.log(err);
                    res.send('false');
                } else {
                    res.send('true');
                }
            })
        } else {
            res.send('true');
        }
    });
});

app.get('/logs', (req, res) => {
    let query = `SELECT * FROM logs;`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.json({error: 'Ошибка получения логов.'});
        } else {
            res.send(result);
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on 3000.");
});