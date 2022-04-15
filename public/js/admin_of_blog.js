'use strict'

function addArticle()
{
    let header = document.getElementById('add_blog_header').value,
    image = document.getElementById('add_blog_image').value,
    text = document.getElementById('add_blog_introduction').value;

    if (header && image && text) 
    {
        fetch('article', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                title: header,
                image: image,
                introduction: text
            })
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Основная информация по статье успешно добавлена! Теперь добавьте книги к этой статье во вкладке "Добавить книги в статью".');
                window.location.reload();
            } else {
                alert('Ошибка добавления основной информации по статьe!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddArticleBlock() {
    let $blogData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить основную информацию по статье';

    let $blockOfBlogData = createElement('div');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'blog_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Заголовок ';
    $labelHeader.append($bHeader);
    let $inputHeader = createElement('input');
    $inputHeader.setAttribute('type', 'text');
    $inputHeader.setAttribute('name', 'blog_header');
    $inputHeader.setAttribute('id', 'add_blog_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'blog_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на основное изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'blog_image');
    $inputImage.setAttribute('id', 'add_blog_image');

    let $labelIntroduction = createElement('label');
    $labelIntroduction.setAttribute('for', 'blog_introduction');
    let $bIntroduction = createElement('b');
    $bIntroduction.innerHTML = 'Текст новости ';
    $labelIntroduction.append($bIntroduction);
    let $inputIntroduction = createElement('input');
    $inputIntroduction.setAttribute('type', 'text');
    $inputIntroduction.setAttribute('name', 'blog_introduction');
    $inputIntroduction.setAttribute('id', 'add_blog_introduction');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addArticle()');
    $addButton.innerHTML = 'Добавить';

    $blogData.append($headOfBlock);

    $blockOfBlogData.append($labelHeader);
    $blockOfBlogData.append($inputHeader);
    $blockOfBlogData.append($labelImage);
    $blockOfBlogData.append($inputImage);
    $blockOfBlogData.append($labelIntroduction);
    $blockOfBlogData.append($inputIntroduction);
    $blockOfBlogData.append($br1);
    $blockOfBlogData.append($br2);
    $blockOfBlogData.append($addButton);

    $blogData.append($blockOfBlogData);

    document.getElementById('admin_block').append($blogData);
}

function addBookArticle()
{
    let header = document.getElementById('add_blog_book_header').value,
    image = document.getElementById('add_blog_book_image').value,
    description = document.getElementById('add_blog_book_description').value;

    if (header && image && description) 
    {
        fetch('books_for_article', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                subtitle: header,
                image: image,
                description: description
            })
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга для статей успешно добавлена!');
                window.location.reload();
            } else {
                alert('Ошибка добавления книги!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddArticleBooksBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить книгу для статей';

    let $blockOfBookData = createElement('div');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'book_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Заголовок ';
    $labelHeader.append($bHeader);
    let $inputHeader = createElement('input');
    $inputHeader.setAttribute('type', 'text');
    $inputHeader.setAttribute('name', 'book_header');
    $inputHeader.setAttribute('id', 'add_blog_book_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'book_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'book_image');
    $inputImage.setAttribute('id', 'add_blog_book_image');

    let $labelDescription = createElement('label');
    $labelDescription.setAttribute('for', 'blog_book_description');
    let $bDescription = createElement('b');
    $bDescription.innerHTML = 'Описание книги';
    $labelDescription.append($bDescription);
    let $inputDescription = createElement('input');
    $inputDescription.setAttribute('type', 'text');
    $inputDescription.setAttribute('name', 'blog_book_description');
    $inputDescription.setAttribute('id', 'add_blog_book_description');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addBookArticle()');
    $addButton.innerHTML = 'Добавить';

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelHeader);
    $blockOfBookData.append($inputHeader);
    $blockOfBookData.append($labelImage);
    $blockOfBookData.append($inputImage);
    $blockOfBookData.append($labelDescription);
    $blockOfBookData.append($inputDescription);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($addButton);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function addBookInArticle()
{
    let article = document.getElementById('input_article_date').value,
    book = document.getElementById('input_article_book').value,
    $books = document.querySelectorAll('#input_article_book option');

    let bookId;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-article-book-id');
        }
    }

    if (article !== "-" && bookId !== "-") 
    {
        fetch('books_for_article/' + article + '/' + bookId, {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            }
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно добавлена в статью!');
                window.location.reload();
            } else {
                alert('Ошибка добавления книги!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddBooksToArticleBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить книгу в статью';

    let $blockOfBookData = createElement('div');

    let $labelArticle = createElement('label');
    $labelArticle.setAttribute('for', 'book_header');
    let $bArticle = createElement('b');
    $bArticle.innerHTML = 'Статья за ';
    $labelArticle.append($bArticle);

    let $divSelectionArticle = createElement('div', 'selection');
    $divSelectionArticle.classList.add('choose_article_date');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_article_date');
    $selection1.setAttribute('name', 'article_date');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("articles", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionDate(dates, $selection1);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionArticle.append($selection1);

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'book_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Книга ';
    $labelHeader.append($bHeader);
   
    let $divSelectionBook = createElement('div', 'selection');
    $divSelectionBook.classList.add('choose_article_book');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_article_book');
    $selection2.setAttribute('name', 'book_header');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = "-";
    $selection2.append($optionDash2);

    fetch ("books_for_article", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionBook(books, $selection2);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionBook.append($selection2);

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addBookInArticle()');
    $addButton.innerHTML = 'Добавить';

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelArticle);
    $blockOfBookData.append($divSelectionArticle);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($labelHeader);
    $blockOfBookData.append($divSelectionBook);
    $blockOfBookData.append($br3);
    $blockOfBookData.append($br4);
    
    $blockOfBookData.append($addButton);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function createSelectionDate(dates, $select) {
    for (let i = 0; i < dates.length; i++) {
        let $date = createElement('option');
        let date = dates[i].date;
                date = date.split("");
                date[10] = " ";
                date = date.join("");
                date = date.split('.')[0];
                $date.innerHTML = date;
        $date.setAttribute('data-article-date', date);
        $select.append($date);
    }
}

function createSelectionBook(books, $select) {
    for (let i = 0; i < books.length; i++) {
        let $book = createElement('option');
        $book.innerHTML = books[i].subtitle;
        $book.setAttribute('data-article-book-id', books[i].book_id);
        $select.append($book);
    }
}

function deleteBookFromArticle() {
    let article = document.getElementById('input_article_date').value,
    book = document.getElementById('input_article_book').value,
    $books = document.querySelectorAll('#input_article_book option');

    let bookId;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-article-book-id');
        }
    }

    if (article !== "-" && bookId !== "-") 
    {
        fetch('books_for_article/' + article + '/' + bookId, {
            method: 'DELETE',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            }
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно удалена из статьи!');
                window.location.reload();
            } else {
                alert('Ошибка удаления книги из статьи!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createDeleteBookFromArticle() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Удалить книгу из статьи';

    let $blockOfBookData = createElement('div');

    let $labelArticle = createElement('label');
    $labelArticle.setAttribute('for', 'book_header');
    let $bArticle = createElement('b');
    $bArticle.innerHTML = 'Статья за ';
    $labelArticle.append($bArticle);

    let $divSelectionArticle = createElement('div', 'selection');
    $divSelectionArticle.classList.add('choose_article_date');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_article_date');
    $selection1.setAttribute('name', 'article_date');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("articles", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionDate(dates, $selection1);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionArticle.append($selection1);

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'book_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Книга ';
    $labelHeader.append($bHeader);
   
    let $divSelectionBook = createElement('div', 'selection');
    $divSelectionBook.classList.add('choose_article_book');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_article_book');
    $selection2.setAttribute('name', 'book_header');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = "-";
    $selection2.append($optionDash2);

    fetch ("books_for_article", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionBook(books, $selection2);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionBook.append($selection2);

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $deleteButton = createElement('button');
    $deleteButton.setAttribute('onclick', 'deleteBookFromArticle()');
    $deleteButton.innerHTML = 'Удалить';

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelArticle);
    $blockOfBookData.append($divSelectionArticle);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($labelHeader);
    $blockOfBookData.append($divSelectionBook);
    $blockOfBookData.append($br3);
    $blockOfBookData.append($br4);
    
    $blockOfBookData.append($deleteButton);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function createChangeDeleteArticleBlock() {
    let $articleData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить основную информацию в статье';

    let $labelInputDate = createElement('label');
    $labelInputDate.setAttribute('for', 'article_date');
    let $bInputDate = createElement('b');
    $bInputDate.innerHTML = 'Выберите дату статьи: ';
    $labelInputDate.append($bInputDate);
    
    let $divSelectionArticle1 = createElement('div', 'selection');
    $divSelectionArticle1.classList.add('choose_article_date');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_article_date');
    $selection1.setAttribute('name', 'article_date');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("articles", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionShortDate(dates, $selection1);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionArticle1.append($selection1);
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить');
    $buttonShowData.setAttribute('onclick', 'showArticleData()');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $blockOfArticleData = createElement('div');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'article_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Заголовок ';
    $labelHeader.append($bHeader);
    let $inputHeader = createElement('input');
    $inputHeader.setAttribute('type', 'text');
    $inputHeader.setAttribute('name', 'article_header');
    $inputHeader.setAttribute('id', 'add_article_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'article_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'article_image');
    $inputImage.setAttribute('id', 'add_article_image');

    let $labelText = createElement('label');
    $labelText.setAttribute('for', 'article_text');
    let $bText = createElement('b');
    $bText.innerHTML = 'Вступление ';
    $labelText.append($bText);
    let $inputText = createElement('input');
    $inputText.setAttribute('type', 'text');
    $inputText.setAttribute('name', 'article_text');
    $inputText.setAttribute('id', 'add_article_text');

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $changeButton = createElement('button');
    $changeButton.setAttribute('onclick', 'changeArticle()');
    $changeButton.innerHTML = 'Изменить';

    let $br5 = createElement('br');
    let $br6 = createElement('br');

    let $labelInputDelDate = createElement('label');
    $labelInputDelDate.setAttribute('for', 'del_article_date');
    let $bInputDelDate = createElement('b');
    $bInputDelDate.innerHTML = 'Выберите дату статьи для удаления: ';
    $labelInputDelDate.append($bInputDelDate);
    
    let $divSelectionArticle2 = createElement('div', 'selection');
    $divSelectionArticle2.classList.add('choose_news_date');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_del_article_date');
    $selection2.setAttribute('name', 'del_article_date');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = '-';
    $selection2.append($optionDash2);

    fetch ("articles", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionShortDate(dates, $selection2);           
        })
        .catch((err) => { console.log(err); })   

    $divSelectionArticle2.append($selection2);

    let $buttonDeleteArticle = createElement('button');
    $buttonDeleteArticle.innerHTML = 'Удалить';
    $buttonDeleteArticle.setAttribute('onclick', 'deleteArticle()');

    $articleData.append($headOfBlock);

    $blockOfArticleData.append($labelInputDate);
    $blockOfArticleData.append($divSelectionArticle1);
    $blockOfArticleData.append($buttonShowData);
    $blockOfArticleData.append($br1);
    $blockOfArticleData.append($br2);
    $blockOfArticleData.append($labelHeader);
    $blockOfArticleData.append($inputHeader);
    $blockOfArticleData.append($labelImage);
    $blockOfArticleData.append($inputImage);
    $blockOfArticleData.append($labelText);
    $blockOfArticleData.append($inputText);
    $blockOfArticleData.append($br3);
    $blockOfArticleData.append($br4);
    $blockOfArticleData.append($changeButton);
    $blockOfArticleData.append($br5);
    $blockOfArticleData.append($br6);
    $blockOfArticleData.append($labelInputDelDate);
    $blockOfArticleData.append($divSelectionArticle2);
    $blockOfArticleData.append($buttonDeleteArticle);

    $articleData.append($blockOfArticleData);

    document.getElementById('admin_block').append($articleData);
}

function setValuesOfFieldForArticle(article) {
    document.getElementById('add_article_header').value = article[0].title;
    document.getElementById('add_article_image').value = article[0].image;
    document.getElementById('add_article_text').value = article[0].introduction;
}

function showArticleData() {
    let date = document.getElementById('input_article_date').value;
    if(date === '-') { 
        alert('Выберите дату статьи!');
    } else {
        fetch ("article/" + date, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((article) => {
            setValuesOfFieldForArticle(article);           
        })
        .catch((err) => { console.log(err); }) 
    }    
}

function changeArticle() {
    let date = document.getElementById('input_article_date').value,    
    header = document.getElementById('add_article_header').value,
    image = document.getElementById('add_article_image').value,
    text = document.getElementById('add_article_text').value;

    if (date !== "-") {
        if(header || image || text) {
            fetch ("article/" + date, {
                method: "PUT",
                headers: { "Accept": "application/text", "Content-Type": "application/json" },
                body: JSON.stringify({
                    header: header,
                    image: image,
                    text: text
                }) })
                .then (statusFunc)
                .then ((response) => {return response.json();})
                .then ((result) => {
                    if(result == true) {
                        alert('Статья изменена!');   
                        window.location.reload();      
                    } else if (result == false) {
                        alert('Ошибка изменения статьи!');
                    }
                })
                .catch((err) => { console.log(err); })  
        } else {
            alert('Заполните хоть одно поле!');
        }
    } else {
        alert('Не выбрана дата для изменения статьи!');
    }
}

function deleteArticle() {
    let date = document.getElementById('input_del_article_date').value;
    if(date === "-") { 
        alert('Выберите дату статьи!');
    } else {
        fetch ("article/" + date, {
        method: "DELETE",
        headers: { "Accept": "application/text", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            if(result == true) {
                alert('Статья успешно удалена!');
                window.location.reload();
            } else if(result == false) {
                alert('Ошибка удаления статьи!');
            }
        })
        .catch((err) => { console.log(err); }) 
    }
}



function createChangeDeleteBookArticleBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить информацию в книге для статей';

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'book_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Книга ';
    $labelHeader.append($bHeader);
   
    let $divSelectionBook = createElement('div', 'selection');
    $divSelectionBook.classList.add('choose_article_book');
    let $selection1 = createElement('select');
    $selection1.setAttribute('name', 'book_header');
    $selection1.setAttribute('id', 'input_article_book');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("books_for_article", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionBook(books, $selection1);           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionBook.append($selection1);

    let $br0 = createElement('br');
    let $br00 = createElement('br');
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить');
    $buttonShowData.setAttribute('onclick', 'showArticleBookData()');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $blockOfBookData = createElement('div');

    let $labelSubtitle = createElement('label');
    $labelSubtitle.setAttribute('for', 'article_book_header');
    let $bSubtitle = createElement('b');
    $bSubtitle.innerHTML = 'Название и автор ';
    $labelSubtitle.append($bSubtitle);
    let $inputSubtitle = createElement('input');
    $inputSubtitle.setAttribute('type', 'text');
    $inputSubtitle.setAttribute('name', 'article_book_header');
    $inputSubtitle.setAttribute('id', 'add_article_book_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'article_book_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'article_book_image');
    $inputImage.setAttribute('id', 'add_article_book_image');

    let $labelText = createElement('label');
    $labelText.setAttribute('for', 'article_book_text');
    let $bText = createElement('b');
    $bText.innerHTML = 'Описание ';
    $labelText.append($bText);
    let $inputText = createElement('input');
    $inputText.setAttribute('type', 'text');
    $inputText.setAttribute('name', 'article_book_text');
    $inputText.setAttribute('id', 'add_article_book_text');

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $changeButton = createElement('button');
    $changeButton.setAttribute('onclick', 'changeArticleBook()');
    $changeButton.innerHTML = 'Изменить';

    let $br5 = createElement('br');
    let $br6 = createElement('br');

    let $labelInputDelBook = createElement('label');
    $labelInputDelBook.setAttribute('for', 'del_article_book_date');
    let $bInputDelBook = createElement('b');
    $bInputDelBook.innerHTML = 'Выберите книгу для удаления: ';
    $labelInputDelBook.append($bInputDelBook);
    
    let $divSelectionBook2 = createElement('div', 'selection');
    $divSelectionBook2.classList.add('choose_article_book');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_del_article_book');
    $selection2.setAttribute('name', 'del_article_book');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = '-';
    $selection2.append($optionDash2);

    fetch ("books_for_article", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((books) => {
            createSelectionBook(books, $selection2);           
        })
        .catch((err) => { console.log(err); })   

    $divSelectionBook2.append($selection2);

    let $buttonDeleteBook = createElement('button');
    $buttonDeleteBook.innerHTML = 'Удалить';
    $buttonDeleteBook.setAttribute('onclick', 'deleteArticleBook()');

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelHeader);
    $blockOfBookData.append($divSelectionBook);
    $blockOfBookData.append($br0);
    $blockOfBookData.append($br00);
    $blockOfBookData.append($buttonShowData);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($labelSubtitle);
    $blockOfBookData.append($inputSubtitle);
    $blockOfBookData.append($labelImage);
    $blockOfBookData.append($inputImage);
    $blockOfBookData.append($labelText);
    $blockOfBookData.append($inputText);
    $blockOfBookData.append($br3);
    $blockOfBookData.append($br4);
    $blockOfBookData.append($changeButton);
    $blockOfBookData.append($br5);
    $blockOfBookData.append($br6);
    $blockOfBookData.append($labelInputDelBook);
    $blockOfBookData.append($divSelectionBook2);
    $blockOfBookData.append($buttonDeleteBook);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}

function setValuesOfFieldForBook(book) {
    document.getElementById('add_article_book_header').value = book[0].subtitle;
    document.getElementById('add_article_book_image').value = book[0].image;
    document.getElementById('add_article_book_text').value = book[0].description;
}

function showArticleBookData() {
    let book = document.getElementById('input_article_book').value,
    $books = document.querySelectorAll('#input_article_book option');

    let bookId;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-article-book-id');
        }
    }

    if(book === '-') { 
        alert('Выберите книгу!');
    } else {
        fetch ("books_for_article_id/" + bookId, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((book_) => {
            setValuesOfFieldForBook(book_);           
        })
        .catch((err) => { console.log(err); }) 
    }    
}

function changeArticleBook() {
    let book = document.getElementById('input_article_book').value,
    $books = document.querySelectorAll('#input_article_book option'),
    bookId,    
    header = document.getElementById('add_article_book_header').value,
    image = document.getElementById('add_article_book_image').value,
    text = document.getElementById('add_article_book_text').value;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-article-book-id');
        }
    }

    if (bookId !== "-") {
        if(header || image || text) {
            fetch ("books_for_article/" + bookId, {
                method: "PUT",
                headers: { "Accept": "application/text", "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"  },
                body: JSON.stringify({
                    header: header,
                    image: image,
                    text: text
                }) })
                .then (statusFunc)
                .then ((response) => {return response.json();})
                .then ((result) => {
                    if(result == true) {
                        alert('Данные книги изменены!');   
                        window.location.reload();      
                    } else if (result == false) {
                        alert('Ошибка изменения данных книги!');
                    }
                })
                .catch((err) => { console.log(err); })  
        } else {
            alert('Заполните хоть одно поле!');
        }
    } else {
        alert('Не выбрана книга для изменения!');
    }
}

function deleteArticleBook() {
    let book = document.getElementById('input_del_article_book').value,
    $books = document.querySelectorAll('#input_del_article_book option'),
    bookId;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-article-book-id');
        }
    }
    if(bookId === "-") { 
        alert('Выберите книгу!');
    } else {
        fetch ("books_for_article/" + bookId, {
        method: "DELETE",
        headers: { "Accept": "application/text", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно удалена!');
                window.location.reload();
            } else if(result == false) {
                alert('Ошибка удаления книги!');
            }
        })
        .catch((err) => { console.log(err); }) 
    }
}

