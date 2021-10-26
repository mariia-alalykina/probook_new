'use strict'

let total_string = '',
	genre = sessionStorage.getItem('genre'),
    catalogBox = document.querySelector('#book_catalog'),
    selected_value = sessionStorage.getItem('sort');

function getSorted()
{
    let selected_value = document.getElementById('sort').value;
    sessionStorage.setItem('sort', selected_value);
}

    if (genre)
    {
        let data = { book_genre: genre, sort_type: selected_value };
        $.ajax(
        {
            method: "GET",
            url: "sort.php",
            dataType: "text",
            async: false,
            data: data,
            success: function(data) {
                total_string = data;
            }
        });
    } 
    
    catalogBox.innerHTML = total_string;
    
        