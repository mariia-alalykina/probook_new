'use strict'

let pageBox = document.querySelector('#book_page');
        
let total_string = '',
	id = localStorage.getItem('book-id');

$.ajax(
{
    method: "GET",
    url: "get_book_data.php",
	dataType: "text",
	async: false,
    data: {book_id: id},
    success: function(data) {
    	total_string = data;
	}
});

pageBox.innerHTML = total_string;
