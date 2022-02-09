'use strict'

let user_id = sessionStorage.getItem('u_id'),
    total_string = "",
    history_block = document.getElementById('order_history');

$.ajax(
{
    method: "POST",
    url: "show_order_history.php",
    dataType: "text",
    async: false,
    data: {user_id: user_id},
    success: function(data) {
        total_string = data;
    }
});

history_block.innerHTML = total_string;

function getId(elem)
{
    let bookId = elem.getAttribute('data-id');
    localStorage.setItem('book-id', bookId);
    window.location.href = 'book.html';
}