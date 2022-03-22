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

window.onload = function() {
    if(sessionStorage.getItem('page') === 'profile') {
         
    }
    else {
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