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

function addNews()
{
    let header = document.getElementById('add_news_header').value,
    image = document.getElementById('add_news_image').value,
    text = document.getElementById('add_news_text').value;

    if (header && image && text) 
    {
        fetch('news', {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                header: header,
                image: image,
                text: text
            })
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Новость успешно добавлена!');
                window.location.reload();
            } else {
                alert('Ошибка добавления новости!');
            }
        })        
    } else {
        alert('Заполните все поля!');
    }
}

function createAddNewsBlock() {
    let $newsData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить новость';

    let $blockOfNewsData = createElement('div');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'news_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Заголовок ';
    $labelHeader.append($bHeader);
    let $inputHeader = createElement('input');
    $inputHeader.setAttribute('type', 'text');
    $inputHeader.setAttribute('name', 'header');
    $inputHeader.setAttribute('id', 'add_news_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'news_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'news_image');
    $inputImage.setAttribute('id', 'add_news_image');

    let $labelText = createElement('label');
    $labelText.setAttribute('for', 'news_text');
    let $bText = createElement('b');
    $bText.innerHTML = 'Текст новости ';
    $labelText.append($bText);
    let $inputText = createElement('input');
    $inputText.setAttribute('type', 'text');
    $inputText.setAttribute('name', 'news_text');
    $inputText.setAttribute('id', 'add_news_text');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addNews()');
    $addButton.innerHTML = 'Добавить';

    $newsData.append($headOfBlock);

    $blockOfNewsData.append($labelHeader);
    $blockOfNewsData.append($inputHeader);
    $blockOfNewsData.append($labelImage);
    $blockOfNewsData.append($inputImage);
    $blockOfNewsData.append($labelText);
    $blockOfNewsData.append($inputText);
    $blockOfNewsData.append($br1);
    $blockOfNewsData.append($br2);
    $blockOfNewsData.append($addButton);

    $newsData.append($blockOfNewsData);

    document.getElementById('admin_block').append($newsData);
}

function createSelectionDate(dates, $select) {
    for (let i = 0; i < dates.length; i++) {
        let $date = createElement('option');
        let date = dates[i].date;
                date = date.split("");
                for(let j = 10; j < date.length; j++) {
                    date[j] = " ";
                }
                date = date.join("");
                date = date.split('.')[0];
                $date.innerHTML = date;
        $date.setAttribute('data-news-date', date);
        $select.append($date);
    }
}

function createChangeDeleteNewsBlock() {
    let $newsData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить информацию в новости';

    let $labelInputDate = createElement('label');
    $labelInputDate.setAttribute('for', 'news_date');
    let $bInputDate = createElement('b');
    $bInputDate.innerHTML = 'Выберите дату новости: ';
    $labelInputDate.append($bInputDate);
    
    let $divSelectionId1 = createElement('div', 'selection');
    $divSelectionId1.classList.add('choose_news_date');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_news_date');
    $selection1.setAttribute('name', 'news_date');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = "-";
    $selection1.append($optionDash1);

    fetch ("news_list", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionDate(dates, document.getElementById('input_news_date'));           
        })
        .catch((err) => { console.log(err); })  
    
    $divSelectionId1.append($selection1);
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить данные');
    $buttonShowData.setAttribute('onclick', 'showNewsData()');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $blockOfNewsData = createElement('div');

    let $labelHeader = createElement('label');
    $labelHeader.setAttribute('for', 'news_header');
    let $bHeader = createElement('b');
    $bHeader.innerHTML = 'Заголовок ';
    $labelHeader.append($bHeader);
    let $inputHeader = createElement('input');
    $inputHeader.setAttribute('type', 'text');
    $inputHeader.setAttribute('name', 'header');
    $inputHeader.setAttribute('id', 'add_news_header');

    let $labelImage = createElement('label');
    $labelImage.setAttribute('for', 'news_image');
    let $bImage = createElement('b');
    $bImage.innerHTML = 'Ссылка на изображение ';
    $labelImage.append($bImage);
    let $inputImage = createElement('input');
    $inputImage.setAttribute('type', 'text');
    $inputImage.setAttribute('name', 'news_image');
    $inputImage.setAttribute('id', 'add_news_image');

    let $labelText = createElement('label');
    $labelText.setAttribute('for', 'news_text');
    let $bText = createElement('b');
    $bText.innerHTML = 'Текст новости ';
    $labelText.append($bText);
    let $inputText = createElement('input');
    $inputText.setAttribute('type', 'text');
    $inputText.setAttribute('name', 'news_text');
    $inputText.setAttribute('id', 'add_news_text');

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $changeButton = createElement('button');
    $changeButton.setAttribute('onclick', 'changeNews()');
    $changeButton.innerHTML = 'Изменить';

    let $br5 = createElement('br');
    let $br6 = createElement('br');

    let $labelInputDelDate = createElement('label');
    $labelInputDelDate.setAttribute('for', 'del_news_date');
    let $bInputDelDate = createElement('b');
    $bInputDelDate.innerHTML = 'Выберите дату новости для удаления: ';
    $labelInputDelDate.append($bInputDelDate);
    
    let $divSelectionId2 = createElement('div', 'selection');
    $divSelectionId2.classList.add('choose_news_date');
    let $selection2 = createElement('select');
    $selection2.setAttribute('id', 'input_del_news_date');
    $selection2.setAttribute('name', 'del_news_date');
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = '-';
    $selection2.append($optionDash2);

    fetch ("news_list", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((dates) => {
            createSelectionDate(dates, document.getElementById('input_del_news_date'));           
        })
        .catch((err) => { console.log(err); })   

    $divSelectionId2.append($selection2);

    let $buttonDeleteNews = createElement('button');
    $buttonDeleteNews.innerHTML = 'Удалить';
    $buttonDeleteNews.setAttribute('onclick', 'deleteNews()');

    $newsData.append($headOfBlock);

    $blockOfNewsData.append($labelInputDate);
    $blockOfNewsData.append($divSelectionId1);
    $blockOfNewsData.append($buttonShowData);
    $blockOfNewsData.append($br1);
    $blockOfNewsData.append($br2);
    $blockOfNewsData.append($labelHeader);
    $blockOfNewsData.append($inputHeader);
    $blockOfNewsData.append($labelImage);
    $blockOfNewsData.append($inputImage);
    $blockOfNewsData.append($labelText);
    $blockOfNewsData.append($inputText);
    $blockOfNewsData.append($br3);
    $blockOfNewsData.append($br4);
    $blockOfNewsData.append($changeButton);
    $blockOfNewsData.append($br5);
    $blockOfNewsData.append($br6);
    $blockOfNewsData.append($labelInputDelDate);
    $blockOfNewsData.append($divSelectionId2);
    $blockOfNewsData.append($buttonDeleteNews);

    $newsData.append($blockOfNewsData);

    document.getElementById('admin_block').append($newsData);
}

function setValuesOfField(news) {
    document.getElementById('add_news_header').value = news[0].header;
    document.getElementById('add_news_image').value = news[0].image;
    document.getElementById('add_news_text').value = news[0].text;
}

function showNewsData() {
    let date = document.getElementById('input_news_date').value;
    if(date === '-') { 
        alert('Выберите дату новости!');
    } else {
        fetch ("news/" + date, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((news) => {
            setValuesOfField(news);           
        })
        .catch((err) => { console.log(err); }) 
    }    
}

function changeNews() {
    let date = document.getElementById('input_news_date').value,    
    header = document.getElementById('add_news_header').value,
    image = document.getElementById('add_news_image').value,
    text = document.getElementById('add_news_text').value;

    if (date !== "-") {
        if(header || image || text) {
            fetch ("news/" + date, {
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
                        alert('Новость изменена!');   
                        window.location.reload();      
                    } else if (result == false) {
                        alert('Ошибка изменения новости!');
                    }
                })
                .catch((err) => { console.log(err); })  
        } else {
            alert('Заполните хоть одно поле!');
        }
    } else {
        alert('Не выбрана дата для изменения новости!');
    }
}

function deleteNews() {
    let date = document.getElementById('input_del_news_date').value;
    if(date === "-") { 
        alert('Выберите дату новости!');
    } else {
        fetch ("news/" + date, {
        method: "DELETE",
        headers: { "Accept": "application/text", "Content-Type": "application/json" } })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            if(result == true) {
                alert('Новость успешно удалена!');
                window.location.reload();
            } else if(result == false) {
                alert('Ошибка удаления новости!');
            }
        })
        .catch((err) => { console.log(err); }) 
    }
}

window.onload = function() {
    if(sessionStorage.getItem('page') === 'add_news') {
        createAddNewsBlock();
    } else if (sessionStorage.getItem('page') === 'change_delete_news') {
        createChangeDeleteNewsBlock();
    } else if (sessionStorage.getItem('page') === 'add_article') {
        createAddArticleBlock();
    } else if (sessionStorage.getItem('page') === 'change_delete_article') {
        createChangeDeleteArticleBlock();
    }
}

