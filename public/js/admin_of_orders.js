'use strict'
let $historyBlock = document.getElementById('order_history');

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

function checkPhone(phone) {
    if(phone.match(/^380\d{9}$/) || phone === "") { return true; }
    else {
        alert('Введён некорректный номер телефона.');
        return false;
    }
}

function createHistoryTable(orders) {
    let userId = document.getElementById('input_user_id').value;

    let $headOfHistory = createElement('p');
    $headOfHistory.innerHTML = 'История заказов пользователя ' + userId;
    $historyBlock.append($headOfHistory);

    if (orders.length === 0) {
        let $noOrders = createElement('p');
        $noOrders.innerHTML = 'Пользователь не совершил ещё ни одного заказа.';
        $historyBlock.append($noOrders);
    } else {
        let $historyTable = createElement('table');

        let $nameId = createElement('th');
        let $nameDate = createElement('th');
        let $nameBookname = createElement('th');
        let $nameAuthor = createElement('th');
        let $nameQuantity = createElement('th');
        let $namePrice = createElement('th');
        let $nameTotalSum = createElement('th');

        $nameId.innerHTML = 'Номер заказа';
        $nameDate.innerHTML = 'Дата';
        $nameBookname.innerHTML = 'Название книги';
        $nameAuthor.innerHTML = 'Автор';
        $nameQuantity.innerHTML = 'Количество';
        $namePrice.innerHTML = 'Цена';
        $nameTotalSum.innerHTML = 'Сумма заказа';

        $historyTable.append($nameId);
        $historyTable.append($nameDate);
        $historyTable.append($nameBookname);
        $historyTable.append($nameAuthor);$historyTable.append($nameQuantity);$historyTable.append($namePrice);$historyTable.append($nameTotalSum);

        let numberOfOrder = 0;
        let previousBookId = 0;

        for (let i = 0; i < orders.length; i++) {
            if(orders[i].book_id === previousBookId) {
                continue;
            }

            let $orderInfo = createElement('tr');

            let $orderId = createElement('td', 'order_id');
            let $orderDate = createElement('td');

            let $orderBook = createElement('td');
                let $bookHref = createElement('a');
                $bookHref.setAttribute('href', 'book.html');
                $bookHref.setAttribute('data-id', orders[i].book_id);
                $bookHref.setAttribute('onclick', 'getId(this)');

                let $bookName = createElement('p');
                $bookName.innerHTML = orders[i].name;
                $bookHref.append($bookName);
            $orderBook.append($bookHref);

            let $orderAuthor = createElement('td');
            $orderAuthor.innerHTML = orders[i].author_name + ' ' + orders[i].author_surname;

            let $orderQuantity = createElement('td', 'number');
            $orderQuantity.innerHTML = orders[i].number_of_books;

            let $orderCost = createElement('td', 'cost');
                let $cost = createElement('span');
                $cost.innerHTML = orders[i].cost_of_book;
            $orderCost.append($cost);
            $orderCost.append(' грн.');

            let $orderTotalCost = createElement('td', 'amount');
            

            if(orders[i].order_id !== numberOfOrder) {
                $orderId.innerHTML = orders[i].order_id;

                let date = orders[i].date;
                date = date.split("");
                date[10] = " ";
                date = date.join("");
                date = date.split('.')[0];
                $orderDate.innerHTML = date;
                numberOfOrder = orders[i].order_id;

                $orderTotalCost.innerHTML = orders[i].total_cost + ' грн.';
            }
            
            $orderInfo.append($orderId);
            $orderInfo.append($orderDate);
            $orderInfo.append($orderBook);
            $orderInfo.append($orderAuthor);
            $orderInfo.append($orderQuantity);
            $orderInfo.append($orderCost);
            $orderInfo.append($orderTotalCost);          

            previousBookId = orders[i].book_id;

            $historyTable.append($orderInfo);
        }
        $historyBlock.append($historyTable);
    }
}

function createShowUserHistory() {
    let $orderData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Посмотреть историю заказов пользователя';

    let $blockOfOrderData = createElement('div');

    let $labelId = createElement('label');
    $labelId.setAttribute('for', 'user_id');
    let $bId = createElement('b');
    $bId.innerHTML = 'ID пользователя ';
    $labelId.append($bId);
    let $inputId = createElement('input');
    $inputId.setAttribute('type', 'text');
    $inputId.setAttribute('name', 'user_id');
    $inputId.setAttribute('id', 'input_user_id');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $showButton = createElement('button');
    $showButton.setAttribute('onclick', 'showUserHistory()');
    $showButton.innerHTML = 'Отобразить историю';

    $orderData.append($headOfBlock);

    $blockOfOrderData.append($labelId);
    $blockOfOrderData.append($inputId);
    $blockOfOrderData.append($br1);
    $blockOfOrderData.append($br2);
    $blockOfOrderData.append($showButton);

    $orderData.append($blockOfOrderData);

    document.getElementById('admin_block').append($orderData);
}

function showUserHistory() {
    let userId = document.getElementById('input_user_id').value;
    if(userId) {
        sessionStorage.setItem('type', 'history_by_id');
        sessionStorage.setItem('order_user_id', userId);
        window.open('show_orders.html');
    } else {
        alert('Введите ID пользователя!');
    } 
}

function showOrderData() {
    let orderId = document.getElementById('input_order_id').value;

    fetch ("order_history_order_id/" + orderId, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((result) => {
            fillInFields(result);
        })
        .catch((err) => { console.log(err); })
}

function fillInFields(order) {
    if(order.length === 0) {
        alert('Такого заказа не существует!');
    } else {
        document.getElementById('add_order_phone').value = order[0].phone_number;
        document.getElementById('add_order_region').value = order[0].region;
        document.getElementById('add_order_town').value = order[0].town;
        document.getElementById('add_order_post_office').value = order[0].post_office;
        
        let $orderStatuses = document.querySelectorAll('.choose_order_status option');
        for(let i = 0; i < $orderStatuses.length; i++) {
            if($orderStatuses[i].getAttribute('selected')) {
                $orderStatuses[i].removeAttribute('selected');
            }
        }
        for(let i = 0; i < $orderStatuses.length; i++) {
            if($orderStatuses[i].value == order[0].order_status) {
                $orderStatuses[i].setAttribute('selected', 'selected');
            }
        }
    }
}

function createChangeDeleteOrderBlock() {
    let $orderData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить основные данные заказа';

    let $labelId = createElement('label');
    $labelId.setAttribute('for', 'order_id');
    let $bId = createElement('b');
    $bId.innerHTML = 'Номер заказа ';
    $labelId.append($bId);
    let $inputId = createElement('input');
    $inputId.setAttribute('type', 'text');
    $inputId.setAttribute('name', 'order_id');
    $inputId.setAttribute('id', 'input_order_id');

    let $br1 = createElement('br');
    let $br2 = createElement('br');
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить данные');
    $buttonShowData.setAttribute('onclick', 'showOrderData()');

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $blockOfOrderData = createElement('div');

    let $labelPhone = createElement('label');
    $labelPhone.setAttribute('for', 'order_phone');
    let $bPhone = createElement('b');
    $bPhone.innerHTML = 'Номер телефона ';
    $labelPhone.append($bPhone);
    let $inputPhone = createElement('input');
    $inputPhone.setAttribute('type', 'phone');
    $inputPhone.setAttribute('name', 'order_phone');
    $inputPhone.setAttribute('id', 'add_order_phone');

    let $labelRegion = createElement('label');
    $labelRegion.setAttribute('for', 'order_region');
    let $bRegion = createElement('b');
    $bRegion.innerHTML = 'Область доставки ';
    $labelRegion.append($bRegion);
    let $inputRegion = createElement('input');
    $inputRegion.setAttribute('type', 'text');
    $inputRegion.setAttribute('name', 'order_region');
    $inputRegion.setAttribute('id', 'add_order_region');

    let $labelTown = createElement('label');
    $labelTown.setAttribute('for', 'order_town');
    let $bTown = createElement('b');
    $bTown.innerHTML = 'Город доставки ';
    $labelTown.append($bTown);
    let $inputTown = createElement('input');
    $inputTown.setAttribute('type', 'text');
    $inputTown.setAttribute('name', 'order_town');
    $inputTown.setAttribute('id', 'add_order_town');

    let $labelPostOffice = createElement('label');
    $labelPostOffice.setAttribute('for', 'order_post_office');
    let $bPostOffice = createElement('b');
    $bPostOffice.innerHTML = 'Почтовое отделение ';
    $labelPostOffice.append($bPostOffice);
    let $inputPostOffice = createElement('input');
    $inputPostOffice.setAttribute('type', 'text');
    $inputPostOffice.setAttribute('name', 'order_post_office');
    $inputPostOffice.setAttribute('id', 'add_order_post_office');

    let $labelStatus = createElement('label');
    $labelStatus.setAttribute('for', 'order_status');
    let $bStatus = createElement('b');
    $bStatus.innerHTML = 'Статус заказа ';
    $labelStatus.append($bStatus);

    let $divSelectionStatus = createElement('div', 'selection');
    $divSelectionStatus.classList.add('choose_order_status');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_order_status');
    $selection1.setAttribute('name', 'order_status');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = '-';
    let $optionDash2 = createElement('option');
    $optionDash2.innerHTML = 'Заказ оформлен';
    let $optionDash3 = createElement('option');
    $optionDash3.innerHTML = 'Заказ принят';
    let $optionDash4 = createElement('option');
    $optionDash4.innerHTML = 'В сборке';
    let $optionDash5 = createElement('option');
    $optionDash5.innerHTML = 'Отправлен';
    let $optionDash6 = createElement('option');
    $optionDash6.innerHTML = 'Доставлен';
    let $optionDash7 = createElement('option');
    $optionDash7.innerHTML = 'Получен';
    $selection1.append($optionDash1);
    $selection1.append($optionDash2);
    $selection1.append($optionDash3);
    $selection1.append($optionDash4);
    $selection1.append($optionDash5);
    $selection1.append($optionDash6);
    $selection1.append($optionDash7);
    $divSelectionStatus.append($selection1);

    let $br5 = createElement('br');
    let $br6 = createElement('br');

    let $changeButton = createElement('button');
    $changeButton.setAttribute('onclick', 'changeOrder()');
    $changeButton.innerHTML = 'Изменить';

    let $br7 = createElement('br');
    let $br8 = createElement('br');

    let $labelInputDelOrder = createElement('label');
    $labelInputDelOrder.setAttribute('for', 'del_news_date');
    let $bInputDelOrder = createElement('b');
    $bInputDelOrder.innerHTML = 'Введите номер заказа для удаления: ';
    $labelInputDelOrder.append($bInputDelOrder);
    let $inputOrderDelId = createElement('input');
    $inputOrderDelId.setAttribute('type', 'text');
    $inputOrderDelId.setAttribute('name', 'del_order_id');
    $inputOrderDelId.setAttribute('id', 'input_del_order_id');
    
    let $buttonDeleteOrder = createElement('button');
    $buttonDeleteOrder.innerHTML = 'Удалить';
    $buttonDeleteOrder.setAttribute('onclick', 'deleteOrder()');

    $orderData.append($headOfBlock); 

    $blockOfOrderData.append($labelId);
    $blockOfOrderData.append($inputId);
    $blockOfOrderData.append($br1);
    $blockOfOrderData.append($br2);
    $blockOfOrderData.append($buttonShowData);
    $blockOfOrderData.append($br3);
    $blockOfOrderData.append($br4);
    $blockOfOrderData.append($labelPhone);
    $blockOfOrderData.append($inputPhone);
    $blockOfOrderData.append($labelRegion);
    $blockOfOrderData.append($inputRegion);
    $blockOfOrderData.append($labelTown);
    $blockOfOrderData.append($inputTown);
    $blockOfOrderData.append($labelPostOffice);
    $blockOfOrderData.append($inputPostOffice);
    $blockOfOrderData.append($labelStatus);
    $blockOfOrderData.append($divSelectionStatus);
    $blockOfOrderData.append($br5);
    $blockOfOrderData.append($br6);
    $blockOfOrderData.append($changeButton);
    $blockOfOrderData.append($br7);
    $blockOfOrderData.append($br8);
    $blockOfOrderData.append($labelInputDelOrder);
    $blockOfOrderData.append($inputOrderDelId);
    $blockOfOrderData.append($buttonDeleteOrder);

    $orderData.append($blockOfOrderData);

    document.getElementById('admin_block').append($orderData);
}

function changeOrder() {
    let orderId = document.getElementById('input_order_id').value;
    let phone = document.getElementById('add_order_phone').value;
    let region = document.getElementById('add_order_region').value;
    let town = document.getElementById('add_order_town').value;
    let postOffice = document.getElementById('add_order_post_office').value;
    let status = document.getElementById('input_order_status').value;

    if(orderId) {
        if(phone || region || town || postOffice || status) {
           if(checkPhone(phone)) {
            fetch ("order_history_order_id/" + orderId, {
                method: "PUT",
                headers: { "Accept": "application/text", "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: phone,
                    region: region,
                    town: town,
                    postOffice: postOffice,
                    status: status
                }) })
                .then (statusFunc)
                .then ((response) => {return response.json();})
                .then ((result) => {
                    if(result == true) {
                        alert('Данные заказа изменены!');   
                        window.location.reload();      
                    } else if (result == false) {
                        alert('Ошибка изменения данных заказа!');
                    }
                })
                .catch((err) => { console.log(err); })
            }            
        } else {
            alert('Заполните хоть одно поле!');
        }
    } else {
        alert('Не введён номер заказа для изменения данных!');
    }
}

function deleteOrder() {
    let orderId = document.getElementById('input_del_order_id').value;

    if(!orderId) {
        alert('Введите номер заказа для удаления!');
    } else {
        fetch ("order_history_order_id/" + orderId, {
            method: "DELETE",
            headers: { "Accept": "application/text", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((result) => {
                if(result == true) {
                    alert('Заказ успешно удален!');
                    window.location.reload();
                } else if(result == false) {
                    alert('Ошибка удаления заказа!');
                }
            })
            .catch((err) => { console.log(err); }) 
    }
}

function createShowOrdersByDate() {
    let $orderData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Посмотреть заказы за определённую дату';

    let $blockOfOrderData = createElement('div');

    let $labelDate = createElement('label');
    $labelDate.setAttribute('for', 'order_date');
    let $bDate = createElement('b');
    $bDate.innerHTML = 'Дата заказа ';
    $labelDate.append($bDate);
    let $inputDate = createElement('input');
    $inputDate.setAttribute('type', 'date');
    $inputDate.setAttribute('id', 'order_date');
    $inputDate.setAttribute('name', 'order_date');

    let $br1 = createElement('br');
    let $br2 = createElement('br');

    let $showButton = createElement('button');
    $showButton.setAttribute('onclick', 'showOrdersByDate()');
    $showButton.innerHTML = 'Отобразить заказы';

    $orderData.append($headOfBlock);

    $blockOfOrderData.append($labelDate);
    $blockOfOrderData.append($inputDate);
    $blockOfOrderData.append($br1);
    $blockOfOrderData.append($br2);
    $blockOfOrderData.append($showButton);

    $orderData.append($blockOfOrderData);

    document.getElementById('admin_block').append($orderData);
}

function createSelectionBooks(books, $select) {
    for(let i = 0; i < books.length; i++) {
        let $book = createElement('option');
        $book.setAttribute('data-order-book-id', books[i].book_id);
        $book.innerHTML = books[i].author_name + ' ' + books[i].author_surname + ' ' + '"' + books[i].name + '"';
        $select.append($book);
    }
}

function showOrderBooksData() {
    let orderId = document.getElementById('input_order_id').value;

    if(orderId) {
        fetch ("order_history_order_id/" + orderId, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" } })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((books) => {
                if(books.length == 0 || !books[0].book_id) {
                    alert('Заказ не найден или в нём отсутствуют книги!')
                } else {
                    createSelectionBooks(books, document.getElementById('input_del_order_book')); 
                }          
            })
            .catch((err) => { console.log(err); })
    } else {
        alert('Введите номер заказа!');
    }
}

function showOrdersByDate() {
    let date = document.getElementById('order_date').value;
    if(date) {
        sessionStorage.setItem('type', 'history_by_date');
        sessionStorage.setItem('order_date', date);
        window.open('show_orders.html');
    } else {
        alert('Выберите дату заказа!');
    } 
}

function deleteOrderBook() {
    let orderId = document.getElementById('input_order_id').value,
    book = document.getElementById('input_del_order_book').value,
    $books = document.querySelectorAll('#input_del_order_book option');

    let bookId;

    for(let i = 0; i < $books.length; i++) {
        if($books[i].value == book) {
            bookId = $books[i].getAttribute('data-order-book-id');
        }
    }

    if(orderId && bookId !== "-") {
        fetch('order_books/' + orderId + '/' + bookId, {
            method: 'DELETE',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            }
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно удалена из заказа!');
                window.location.reload();
            } else {
                alert('Ошибка удаления книги из заказа!');
            }
        })        
    } else {
        alert('Поля с номером заказа и книгой для удаления должны быть заполнены!');
    }
}

function addBookToOrder() {
    let orderId = document.getElementById('input_order_id').value,
    bookId = document.getElementById('input_order_book_id').value,
    numberOfBooks = document.getElementById('input_number_order_book_id').value;

    if(orderId && bookId && numberOfBooks) {
        fetch('order_books/' + orderId + '/' + bookId + '/' + numberOfBooks, {
            method: 'POST',
            headers: {
                "Accept": "application/text", "Content-Type": "application/json", "Access-Control-Allow-Headers": "*"
            }
        })
        .then (statusFunc) 
        .then ((response) => { return response.json(); })
        .then ((result) => {
            if(result == true) {
                alert('Книга успешно добавлена в заказ!');
                window.location.reload();
            } else {
                alert('Ошибка добавления книги в заказ!');
            }
        })        
    } else {
        alert('Заполните поля с номером заказа, ID книги и количеством книг!');
    }
}

function createAddDeleteOrderBooks() {
    let $orderData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Добавить/удалить книги из заказа';

    let $blockOfOrderData = createElement('div');

    let $labelId = createElement('label');
    $labelId.setAttribute('for', 'order_id');
    let $bId = createElement('b');
    $bId.innerHTML = 'Номер заказа ';
    $labelId.append($bId);
    let $inputId = createElement('input');
    $inputId.setAttribute('type', 'text');
    $inputId.setAttribute('name', 'order_id');
    $inputId.setAttribute('id', 'input_order_id');

    let $br1 = createElement('br');
    let $br2 = createElement('br');
    
    let $buttonShowData = createElement('input');
    $buttonShowData.setAttribute('type', 'button');
    $buttonShowData.setAttribute('value', 'Отобразить данные');
    $buttonShowData.setAttribute('onclick', 'showOrderBooksData()');

    let $br3 = createElement('br');
    let $br4 = createElement('br');

    let $labelBookId = createElement('label');
    $labelBookId.setAttribute('for', 'order_book_id');
    let $bBookId = createElement('b');
    $bBookId.innerHTML = 'ID книги ';
    $labelBookId.append($bBookId);
    let $inputBookId = createElement('input');
    $inputBookId.setAttribute('type', 'text');
    $inputBookId.setAttribute('name', 'order_book_id');
    $inputBookId.setAttribute('id', 'input_order_book_id');

    let $labelNumberOfBooks = createElement('label');
    $labelNumberOfBooks.setAttribute('for', 'number_order_book_id');
    let $bNumberOfBooks = createElement('b');
    $bNumberOfBooks.innerHTML = 'Количество книг ';
    $labelNumberOfBooks.append($bNumberOfBooks);
    let $inputNumberOfBooks = createElement('input');
    $inputNumberOfBooks.setAttribute('type', 'text');
    $inputNumberOfBooks.setAttribute('name', 'number_order_book_id');
    $inputNumberOfBooks.setAttribute('id', 'input_number_order_book_id');

    let $br5 = createElement('br');
    let $br6 = createElement('br');

    let $addButton = createElement('button');
    $addButton.setAttribute('onclick', 'addBookToOrder()');
    $addButton.innerHTML = 'Добавить книгу к заказу';

    let $br7 = createElement('br');
    let $br8 = createElement('br');
    let $br9 = createElement('br');

    let $labelInputDelBook = createElement('label');
    $labelInputDelBook.setAttribute('for', 'del_order_book');
    let $bInputDelBook = createElement('b');
    $bInputDelBook.innerHTML = 'Выберите книгу для удаления из заказа: ';
    $labelInputDelBook.append($bInputDelBook);
    
    let $divSelectionBook = createElement('div', 'selection');
    $divSelectionBook.classList.add('choose_order_book');
    let $selection1 = createElement('select');
    $selection1.setAttribute('id', 'input_del_order_book');
    $selection1.setAttribute('name', 'del_order_book');
    let $optionDash1 = createElement('option');
    $optionDash1.innerHTML = '-';
    $selection1.append($optionDash1);
    $divSelectionBook.append($selection1);

    let $buttonDeleteBook = createElement('button');
    $buttonDeleteBook.innerHTML = 'Удалить';
    $buttonDeleteBook.setAttribute('onclick', 'deleteOrderBook()');

    $orderData.append($headOfBlock);

    $blockOfOrderData.append($labelId);
    $blockOfOrderData.append($inputId);
    $blockOfOrderData.append($br1);
    $blockOfOrderData.append($br2);
    $blockOfOrderData.append($buttonShowData);
    $blockOfOrderData.append($br3);
    $blockOfOrderData.append($br4);
    $blockOfOrderData.append($labelBookId);
    $blockOfOrderData.append($inputBookId);
    $blockOfOrderData.append($labelNumberOfBooks);
    $blockOfOrderData.append($inputNumberOfBooks);
    $blockOfOrderData.append($br5);
    $blockOfOrderData.append($br6);
    $blockOfOrderData.append($addButton);
    $blockOfOrderData.append($br7);
    $blockOfOrderData.append($br8);
    $blockOfOrderData.append($br9);
    $blockOfOrderData.append($labelInputDelBook);
    $blockOfOrderData.append($divSelectionBook);
    $blockOfOrderData.append($buttonDeleteBook);

    $orderData.append($blockOfOrderData);

    document.getElementById('admin_block').append($orderData);
}

window.onload = function() {
    switch(sessionStorage.getItem('page')) {
        case 'show_user_history':
            createShowUserHistory();
            break;
        case 'show_orders_by_date': 
            createShowOrdersByDate();
            break;
        case 'change_delete_order':
            createChangeDeleteOrderBlock();
            break;
        case 'add_delete_order_books':
            createAddDeleteOrderBooks();
            break;
    };
};