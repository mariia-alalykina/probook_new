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

function addBook()
{
    let authorName = document.getElementById('add_author_name').value,
    authorSurname = document.getElementById('add_author_surname').value,
    series = document.getElementById('add_series').value,
    bookName = document.getElementById('add_name').value,
    publishingHouse = document.getElementById('add_publishing_house').value,
    year = document.getElementById('add_year').value,
    numberOfPages = document.getElementById('add_number_of_pages').value,
    ageLimit = document.getElementById('add_age_limit').value,
    description = document.getElementById('add_description').value,
    genre = document.getElementById('genres').value,
    availability = document.getElementById('add_availability').value,
    price = document.getElementById('add_price').value,
    image = document.getElementById('add_image').value;

    if (authorName && authorSurname && series && bookName && publishingHouse && year && numberOfPages && ageLimit && description && genre && availability && price && image)
    {
        fetch('book/add', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                authorName: authorName,
                authorSurname: authorSurname,
                series: series,
                bookName: bookName,
                publishingHouse: publishingHouse,
                year: year,
                numberOfPages: numberOfPages,
                ageLimit: ageLimit,
                description: description,
                genre: genre,
                availability: availability,
                price: price,
                image: image
            })
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно добавлена!');
                window.location.reload();
            } else {
                alert('Ошибка добавления книги!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddBookBlock() {
    let $bookData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить книгу';

    let $blockOfBookData = createElement('div');

    let $labelAuthorName = createElement('label');
    $labelAuthorName.setAttribute('for', 'author_name');
    let $bAuthorName = createElement('b');
    $bAuthorName.innerHTML = 'Имя автора';
    $labelAuthorName.append($bAuthorName);
    let $inputAuthorName = createElement('input');
    $inputAuthorName.setAttribute('type', 'text');
    $inputAuthorName.setAttribute('name', 'author_name');
    $inputAuthorName.setAttribute('id', 'add_author_name');

    let $labelAuthorSurname = createElement('label');
    $labelAuthorSurname.setAttribute('for', 'author_surname');
    let $bAuthorSurname = createElement('b');
    $bAuthorSurname.innerHTML = 'Фамилия автора';
    $labelAuthorSurname.append($bAuthorSurname);
    let $inputAuthorSurname = createElement('input');
    $inputAuthorSurname.setAttribute('type', 'text');
    $inputAuthorSurname.setAttribute('name', 'author_surname');
    $inputAuthorSurname.setAttribute('id', 'add_author_surname');

    let $labelSeries = createElement('label');
    $labelSeries.setAttribute('for', 'series');
    let $bSeries = createElement('b');
    $bSeries.innerHTML = 'Серия';
    $labelSeries.append($bSeries);
    let $inputSeries = createElement('input');
    $inputSeries.setAttribute('type', 'text');
    $inputSeries.setAttribute('name', 'series');
    $inputSeries.setAttribute('id', 'add_series');

    let $labelName = createElement('label');
    $labelName.setAttribute('for', 'b_name');
    let $bName = createElement('b');
    $bName.innerHTML = 'Название';
    $labelName.append($bName);
    let $inputName = createElement('input');
    $inputName.setAttribute('type', 'text');
    $inputName.setAttribute('name', 'b_name');
    $inputName.setAttribute('id', 'add_name');

    let $labelPublishingHouse = createElement('label');
    $labelPublishingHouse.setAttribute('for', 'publishing_house');
    let $bPublishingHouse = createElement('b');
    $bPublishingHouse.innerHTML = 'Издательство';
    $labelPublishingHouse.append($bPublishingHouse);
    let $inputPublishingHouse = createElement('input');
    $inputPublishingHouse.setAttribute('type', 'text');
    $inputPublishingHouse.setAttribute('name', 'publishing_house');
    $inputPublishingHouse.setAttribute('id', 'add_publishing_house');

    let $labelYear = createElement('label');
    $labelYear.setAttribute('for', 'year');
    let $bYear = createElement('b');
    $bYear.innerHTML = 'Год';
    $labelYear.append($bYear);
    let $inputYear = createElement('input');
    $inputYear.setAttribute('type', 'text');
    $inputYear.setAttribute('name', 'year');
    $inputYear.setAttribute('id', 'add_year');

    let $labelNumberOfPages = createElement('label');
    $labelNumberOfPages.setAttribute('for', 'number_of_pages');
    let $bNumberOfPages = createElement('b');
    $bNumberOfPages.innerHTML = 'Количество страниц';
    $labelNumberOfPages.append($bNumberOfPages);
    let $inputNumberOfPages = createElement('input');
    $inputNumberOfPages.setAttribute('type', 'text');
    $inputNumberOfPages.setAttribute('name', 'number_of_pages');
    $inputNumberOfPages.setAttribute('id', 'add_number_of_pages');

    let $labelAgeLimit = createElement('label');
    $labelAgeLimit.setAttribute('for', 'age_limit');
    let $bAgeLimit = createElement('b');
    $bAgeLimit.innerHTML = 'Возрастное ограничение';
    $labelAgeLimit.append($bAgeLimit);
    let $inputAgeLimit = createElement('input');
    $inputAgeLimit.setAttribute('type', 'text');
    $inputAgeLimit.setAttribute('name', 'age_limit');
    $inputAgeLimit.setAttribute('id', 'add_age_limit');

    let $labelDescription = createElement('label');
    $labelDescription.setAttribute('for', 'description');
    let $bDescription = createElement('b');
    $bDescription.innerHTML = 'Описание';
    $labelDescription.append($bDescription);
    let $inputDescription = createElement('input');
    $inputDescription.setAttribute('type', 'text');
    $inputDescription.setAttribute('name', 'description');
    $inputDescription.setAttribute('id', 'add_description');

    let $labelGenre = createElement('label');
    $labelGenre.setAttribute('for', 'genre');
    let $bGenre = createElement('b');
    $bGenre.innerHTML = 'Жанр ';
    $labelGenre.append($bGenre);
    let $selectGenre = createElement('select');
    $selectGenre.setAttribute('id', 'genres');
    $selectGenre.setAttribute('name', 'genre');
    $selectGenre.setAttribute('required', 'required');
        let $option0 = createElement('option');
        $option0.setAttribute('selected', 'selected');
        $option0.innerHTML = 'Выберите жанр';

        let $option1 = createElement('option');
        $option1.setAttribute('value', 'Художественная литература');
        $option1.innerHTML = 'Художественная литература';

        let $option2 = createElement('option');
        $option2.setAttribute('value', 'Научно-популярная литература');
        $option2.innerHTML = 'Научно-популярная литература';

        let $option3 = createElement('option');
        $option3.setAttribute('value', 'Учебная литература');
        $option3.innerHTML = 'Учебная литература';

        let $option4 = createElement('option');
        $option4.setAttribute('value', 'Саморазвитие');
        $option4.innerHTML = 'Саморазвитие';

        let $option5 = createElement('option');
        $option5.setAttribute('value', 'Биографии, мемуары');
        $option5.innerHTML = 'Биографии, мемуары';
    $selectGenre.append($option0);
    $selectGenre.append($option1);
    $selectGenre.append($option2);
    $selectGenre.append($option3);
    $selectGenre.append($option4);
    $selectGenre.append($option5);

    let $br1 = createElement('br'); 
    let $br2 = createElement('br');

    let $labelAvailability = createElement('label');
    $labelAvailability.setAttribute('for', 'availability');
    let $bAvailability = createElement('b');
    $bAvailability.innerHTML = 'Наличие';
    $labelAvailability.append($bAvailability);
    let $inputAvailability = createElement('input');
    $inputAvailability.setAttribute('type', 'text');
    $inputAvailability.setAttribute('name', 'availability');
    $inputAvailability.setAttribute('id', 'add_availability');

    let $labelPrice = createElement('label');
    $labelPrice.setAttribute('for', 'price');
    let $bPrice = createElement('b');
    $bPrice.innerHTML = 'Цена';
    $labelPrice.append($bPrice);
    let $inputPrice = createElement('input');
    $inputPrice.setAttribute('type', 'text');
    $inputPrice.setAttribute('name', 'price');
    $inputPrice.setAttribute('id', 'add_price');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'image');
    $inputImage.setAttribute('id', 'add_image');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addBook()');
    $addButton.innerHTML = 'Добавить';

    $bookData.append($headOfBlock);

    $blockOfBookData.append($labelAuthorName);
    $blockOfBookData.append($inputAuthorName);
    $blockOfBookData.append($labelAuthorSurname);
    $blockOfBookData.append($inputAuthorSurname);
    $blockOfBookData.append($labelSeries);
    $blockOfBookData.append($inputSeries);
    $blockOfBookData.append($labelName);
    $blockOfBookData.append($inputName);
    $blockOfBookData.append($labelPublishingHouse);
    $blockOfBookData.append($inputPublishingHouse);
    $blockOfBookData.append($labelYear);
    $blockOfBookData.append($inputYear);
    $blockOfBookData.append($labelNumberOfPages);
    $blockOfBookData.append($inputNumberOfPages);
    $blockOfBookData.append($labelAgeLimit);
    $blockOfBookData.append($inputAgeLimit);
    $blockOfBookData.append($labelDescription);
    $blockOfBookData.append($inputDescription);
    $blockOfBookData.append($labelGenre);
    $blockOfBookData.append($selectGenre);
    $blockOfBookData.append($br1);
    $blockOfBookData.append($br2);
    $blockOfBookData.append($labelAvailability);
    $blockOfBookData.append($inputAvailability);
    $blockOfBookData.append($labelPrice);
    $blockOfBookData.append($inputPrice);
    $blockOfBookData.append($labelImage);
    $blockOfBookData.append($inputImage);
    $blockOfBookData.append($addButton);

    $bookData.append($blockOfBookData);

    document.getElementById('admin_block').append($bookData);
}


window.onload = function() {
    if(sessionStorage.getItem('page') === 'add_book') {
        createAddBookBlock();
    }
}

