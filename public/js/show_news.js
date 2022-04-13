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

function createBlockOfNews(news) {
    let $newsContent = document.getElementsByClassName('news_content')[0];
    for (let i = 0; i < news.length; i++) {
        let $news = createElement('div', 'news');

        let $date = createElement('div', 'date');
        let date = news[i].date;
                date = date.split("");
                date[10] = " ";
                date = date.join("");
                date = date.split('.')[0];
                $date.innerHTML = date;

        let $newsHeader = createElement('div', 'news_header');
        let $header = createElement('h2');
        $header.innerHTML = news[i].header;
        let $image = createElement('img');
        $image.setAttribute('src', news[i].image);
        $newsHeader.append($header);
        $newsHeader.append($image);

        let $newsText = createElement('div', 'news_text');
        let $text = createElement('p');
        $text.innerHTML = news[i].text;
        $newsText.append($text);

        $news.append($date);
        $news.append($newsHeader);
        $news.append($newsText);

        $newsContent.append($news);
    }
}

window.onload = function() {
    fetch('news_list', {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    })
    .then(statusFunc)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        createBlockOfNews(result);
    })
    .catch((err) => { console.log(err); })
}