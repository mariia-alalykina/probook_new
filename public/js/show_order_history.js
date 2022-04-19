'use strict'

let userId = sessionStorage.getItem('u_id'),
    $historyBlock = document.getElementById('order_history');

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

function createHistoryTable(orders) {
    let $headOfHistory = createElement('p');
    $headOfHistory.innerHTML = 'История заказов пользователя ' + sessionStorage.getItem('u_name');
    $historyBlock.append($headOfHistory);

    if (orders.length === 0) {
        let $noOrders = createElement('p');
        $noOrders.innerHTML = 'Вы не совершили ещё ни одного заказа.';
        $historyBlock.append($noOrders);
    } else {
        let $createPDFButton = createElement('button', 'createPDF');
        $createPDFButton.setAttribute('onclick', 'createPDF()');
        $createPDFButton.innerHTML = 'Создать PDF';
        $historyBlock.append($createPDFButton);

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

function createUserDataBlock() {
    let $userData = createElement('div', 'working_with_data');

    let $headOfBlock = createElement('p');
    $headOfBlock.setAttribute('style', "position: relative; display: inline-block; font-family: 'Montserrat', sans-serif; width: 90%;");
    $headOfBlock.innerHTML = 'Изменить личные данные';

    let $blockOfUserData = createElement('div');

    let $labelName = createElement('label');
    $labelName.setAttribute('for', 'name');
    let $bName = createElement('b');
    $bName.innerHTML = 'Имя';
    $labelName.append($bName);
    let $inputName = createElement('input');
    $inputName.setAttribute('type', 'text');
    $inputName.setAttribute('name', 'name');
    $inputName.setAttribute('id', 'change_name');

    let $labelSurname = createElement('label');
    $labelSurname.setAttribute('for', 'surname');
    let $bSurname = createElement('b');
    $bSurname.innerHTML = 'Фамилия';
    $labelSurname.append($bSurname);
    let $inputSurname = createElement('input');
    $inputSurname.setAttribute('type', 'text');
    $inputSurname.setAttribute('name', 'surname');
    $inputSurname.setAttribute('id', 'change_surname');

    let $labelPhone = createElement('label');
    $labelPhone.setAttribute('for', 'phone');
    let $bPhone = createElement('b');
    $bPhone.innerHTML = 'Номер телефона';
    $labelPhone.append($bPhone);
    let $inputPhone = createElement('input');
    $inputPhone.setAttribute('type', 'phone');
    $inputPhone.setAttribute('name', 'phone');
    $inputPhone.setAttribute('id', 'change_phone');

    let $labelEmail = createElement('label');
    $labelEmail.setAttribute('for', 'email');
    let $bEmail = createElement('b');
    $bEmail.innerHTML = 'Почта';
    $labelEmail.append($bEmail);
    let $inputEmail = createElement('input');
    $inputEmail.setAttribute('type', 'email');
    $inputEmail.setAttribute('name', 'email');
    $inputEmail.setAttribute('id', 'change_email');

    let $labelPsw1 = createElement('label');
    $labelPsw1.setAttribute('for', 'new_psw');
    let $bPsw1 = createElement('b');
    $bPsw1.innerHTML = 'Новый пароль';
    $labelPsw1.append($bPsw1);
    let $inputPsw1 = createElement('input');
    $inputPsw1.setAttribute('type', 'password');
    $inputPsw1.setAttribute('name', 'new_psw');
    $inputPsw1.setAttribute('id', 'new_psw');

    let $labelPsw2 = createElement('label');
    $labelPsw2.setAttribute('for', 'repeat_psw');
    let $bPsw2 = createElement('b');
    $bPsw2.innerHTML = 'Повторите пароль';
    $labelPsw2.append($bPsw2);
    let $inputPsw2 = createElement('input');
    $inputPsw2.setAttribute('type', 'password');
    $inputPsw2.setAttribute('name', 'repeat_psw');
    $inputPsw2.setAttribute('id', 'repeat_psw');

    let $changeButton = createElement('button');
    $changeButton.setAttribute('onclick', 'changeUserData()');
    $changeButton.innerHTML = 'Изменить';

    let $deleteButton = createElement('a');
    $deleteButton.setAttribute('id', 'delete_account');
    $deleteButton.setAttribute('onclick', 'deleteAccount()');
    $deleteButton.innerHTML = 'Удалить аккаунт';

    $userData.append($headOfBlock);

    $blockOfUserData.append($labelName);
    $blockOfUserData.append($inputName);
    $blockOfUserData.append($labelSurname);
    $blockOfUserData.append($inputSurname);
    $blockOfUserData.append($labelPhone);
    $blockOfUserData.append($inputPhone);
    $blockOfUserData.append($labelEmail);
    $blockOfUserData.append($inputEmail);
    $blockOfUserData.append($labelPsw1);
    $blockOfUserData.append($inputPsw1);
    $blockOfUserData.append($labelPsw2);
    $blockOfUserData.append($inputPsw2);
    $blockOfUserData.append($changeButton);
    $blockOfUserData.append($deleteButton);

    $userData.append($blockOfUserData);

    document.getElementById('account_block').append($userData);
}

function fillInFields(userData) {
    document.getElementById('change_name').value = userData[0].name;
    document.getElementById('change_surname').value = userData[0].surname;
    document.getElementById('change_phone').value = userData[0].phone_number;
    document.getElementById('change_email').value = userData[0].email;
}

window.onload = function() {
    if(sessionStorage.getItem('page') === 'profile') {
         createUserDataBlock();
         fetch ("users/" + userId, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
            .then (statusFunc)
            .then ((response) => { return response.json(); })
            .then ((result) => {
                fillInFields(result);
            })
            .catch((err) => { console.log(err); })
    }
    else {
        fetch ("users/" + userId, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
            .then (statusFunc)
            .then ((response) => { return response.json(); })
            .then ((result) => {
                sessionStorage.setItem('u_name', result[0].name);
            })
            .catch((err) => { console.log(err); })

        fetch ("order_history_id/" + userId, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((result) => {
                createHistoryTable(result);
            })          
            .catch((err) => { console.log(err); })
    }
}

function getId(elem)
{
    let bookId = elem.getAttribute('data-id');
    sessionStorage.setItem('book_id', bookId);
    window.location.href = 'book.html';
}