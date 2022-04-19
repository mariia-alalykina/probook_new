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

function createHistoryTable(orders) {
    let userId = sessionStorage.getItem('order_user_id');

    let $headOfHistory = createElement('p');
    $headOfHistory.innerHTML = 'История заказов пользователя ' + userId;
    $historyBlock.append($headOfHistory);

    if (orders.length === 0) {
        let $noOrders = createElement('p');
        $noOrders.innerHTML = 'История заказов пуста!';
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

function createHistoryTableByDate(orders) {
    let date = sessionStorage.getItem('order_date');

    let $headOfHistory = createElement('p');
    $headOfHistory.innerHTML = 'История заказов за ' + date;
    $historyBlock.append($headOfHistory);

    if (orders.length === 0) {
        let $noOrders = createElement('p');
        $noOrders.innerHTML = 'История заказов пуста!';
        $historyBlock.append($noOrders);
    } else {
        let $createPDFButton = createElement('button', 'createPDF');
        $createPDFButton.setAttribute('onclick', 'createPDF()');
        $createPDFButton.innerHTML = 'Создать PDF';
        $historyBlock.append($createPDFButton);
        
        let $historyTable = createElement('table');

        let $nameId = createElement('th');
        let $nameDate = createElement('th');
        let $nameUserId = createElement('th');
        let $nameBookname = createElement('th');
        let $nameAuthor = createElement('th');
        let $nameQuantity = createElement('th');
        let $namePrice = createElement('th');
        let $nameTotalSum = createElement('th');

        $nameId.innerHTML = 'Номер заказа';
        $nameDate.innerHTML = 'Дата';
        $nameUserId.innerHTML = 'ID пользователя';
        $nameBookname.innerHTML = 'Название книги';
        $nameAuthor.innerHTML = 'Автор';
        $nameQuantity.innerHTML = 'Количество';
        $namePrice.innerHTML = 'Цена';
        $nameTotalSum.innerHTML = 'Сумма заказа';

        $historyTable.append($nameId);
        $historyTable.append($nameDate);
        $historyTable.append($nameUserId);
        $historyTable.append($nameBookname);
        $historyTable.append($nameAuthor);
        $historyTable.append($nameQuantity);
        $historyTable.append($namePrice);
        $historyTable.append($nameTotalSum);

        let numberOfOrder = 0;
        let previousBookId = 0;

        for (let i = 0; i < orders.length; i++) {
            if(orders[i].book_id === previousBookId) {
                continue;
            }

            let $orderInfo = createElement('tr');

            let $orderId = createElement('td', 'order_id');
            let $orderDate = createElement('td');
            let $orderUserId = createElement('td');

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

                $orderUserId.innerHTML = orders[i].user_id;

                $orderTotalCost.innerHTML = orders[i].total_cost + ' грн.';
            }
            
            $orderInfo.append($orderId);
            $orderInfo.append($orderDate);
            $orderInfo.append($orderUserId);
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

function showUserHistory() {
    let userId = sessionStorage.getItem('order_user_id');

    fetch ("order_history_id/" + userId, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((orders) => {
            createHistoryTable(orders);
        })          
        .catch((err) => { console.log(err); })
}

function showOrdersByDate() {
    let date = sessionStorage.getItem('order_date');

    fetch ("order_history_date/" + date, {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
        .then (statusFunc)
        .then ((response) => {return response.json();})
        .then ((orders) => {
            createHistoryTableByDate(orders);
        })          
        .catch((err) => { console.log(err); })
}

window.onload = function() {
    switch (sessionStorage.getItem('type')) {
        case 'history_by_id': 
            showUserHistory();
            break;
        case 'history_by_date':
            showOrdersByDate();
            break;
    }
};

window.onclose = function() {
    sessionStorage.removeItem('order_user_id');
    sessionStorage.removeItem('type');
};

function getId(elem) {
    let bookId = elem.getAttribute('data-id');
    sessionStorage.setItem('book_id', bookId);
    window.location.href = 'book.html';
}