'use strict'

let statusFunc = function(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
    }
      return Promise.resolve(response);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }    
    return $tag;
}

function createBlockOfArticleBooks(books, $article) {
    for (let i = 0; i < books.length; i++) {
        let $book = createElement('div', 'post_book');
        let $header = createElement('h3');
        $header.innerHTML = books[i].subtitle;

        let $image = createElement('img');
        $image.setAttribute('src', books[i].image);

        let $description = createElement('p');
        $description.innerHTML = books[i].description;

        $book.append($header);
        $book.append($image);
        $book.append($description);

        $article.append($book);
    }
}

function createBlockOfArticles(articles) {
    let $blogContent = document.getElementsByClassName('blog_content')[0];

    for (let i = 0; i < articles.length; i++) {
        let $article = createElement('div', 'post');

        let $date = createElement('div', 'date');
        let date = articles[i].date;
                date = date.split("");
                date[10] = " ";
                date = date.join("");
                date = date.split('.')[0];
                $date.innerHTML = date;

        
        let $mainImageDiv = createElement('div', 'galery');
        let $header = createElement('h2');
        $header.innerHTML = articles[i].title;
        let $mainImage = createElement('img');
        $mainImage.setAttribute('src', articles[i].image);
        $mainImageDiv.append($header);
        $mainImageDiv.append($mainImage);

        let $previewDiv = createElement('div', 'preview');
        let $preview = createElement('p');
        $preview.innerHTML = articles[i].introduction;
        $previewDiv.append($preview);

        $article.append($date);
        $article.append($mainImageDiv);
        $article.append($previewDiv);

        fetch('books_for_article/' + date, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
        .then(statusFunc)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            createBlockOfArticleBooks(result, $article);
        })
        .catch((err) => { console.log(err); })

        $blogContent.append($article);
    }
}

window.onload = function() {
    fetch('articles', {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    })
    .then(statusFunc)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        createBlockOfArticles(result);
    })
    .catch((err) => { console.log(err); })
}