'use strict'

let total_string = '',
    text_search = sessionStorage.getItem('search'),
    resultBox = document.querySelector('#search_result');

if (text_search)
{
    $.ajax(
    {
        method: "GET",
        url: "search_result.php",
        dataType: "text",
        async: false,
        data: {_search: text_search},
        success: function(data) {
            total_string = data;
        }
    });
}

resultBox.innerHTML = total_string;

function getId(elem)
{
    let bookId = elem.getAttribute('data-id');
    localStorage.setItem('book-id', bookId);
    window.location.href = 'book.html';
}