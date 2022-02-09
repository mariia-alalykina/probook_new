'use strict'

function add_book()
{
    let author = document.getElementById('add_author').value,
    series = document.getElementById('add_series').value,
    b_name = document.getElementById('add_name').value,
    publishing_house = document.getElementById('add_publishing_house').value,
    year = document.getElementById('add_year').value,
    number_of_pages = document.getElementById('add_number_of_pages').value,
    age_limit = document.getElementById('add_age_limit').value,
    description = document.getElementById('add_description').value,
    genre = document.getElementById('add_genre').value,
    availability = document.getElementById('add_availability').value,
    price = document.getElementById('add_price').value,
    image = document.getElementById('add_image').value;

    if (author && series && b_name && publishing_house && year && number_of_pages && age_limit && description && genre && availability && price && image)
    {
        let book_data = {author: author, series: series, name: b_name, publishing_house: publishing_house, year: year, number_of_pages: number_of_pages, age_limit: age_limit, description: description, genre: genre, availability: availability, price: price, image: image};

        $.ajax(
        {
            method: "POST",
            url: "add_book.php",
            dataType: "text",
            async: false,
            data: book_data,
            success: function(data) {
                alert(data);
            }
        });
        location.reload();
        return false;
    }
}

