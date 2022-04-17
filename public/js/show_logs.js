'use strict'

let $historyBlock = document.getElementById('logs_history');

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

function createHistoryTable(logs) {
    let $headOfHistory = createElement('p');
    $headOfHistory.innerHTML = 'Журнал логов';
    $historyBlock.append($headOfHistory);

    if (logs.length === 0) {
        let $noLogs = createElement('p');
        $noLogs.innerHTML = 'Журнал логов пуст.';
        $historyBlock.append($noLogs);
    } else {
        let $historyTable = createElement('table');

        let $nameId = createElement('th');
        let $nameDate = createElement('th');
        let $nameUser = createElement('th');
        let $nameAction = createElement('th');

        $nameId.innerHTML = 'Log ID';
        $nameDate.innerHTML = 'Дата';
        $nameUser.innerHTML = 'ID пользователя';
        $nameAction.innerHTML = 'Действие';

        $historyTable.append($nameId);
        $historyTable.append($nameDate);
        $historyTable.append($nameUser);
        $historyTable.append($nameAction);

        for (let i = 0; i < logs.length; i++) {

            let $logInfo = createElement('tr');

            let $logId = createElement('td', 'log_id');
            $logId.innerHTML = logs[i].log_id;

            let $logDate = createElement('td');
            let date = logs[i].log_date;
                date = date.split("");
                date[10] = " ";
                date = date.join("");
                date = date.split('.')[0];
                $logDate.innerHTML = date;

            let $userId = createElement('td', 'user_id');
            $userId.innerHTML = logs[i].user_id;

            let $logAction = createElement('td');
            $logAction.innerHTML = logs[i].log_action;            
            
            $logInfo.append($logId);
            $logInfo.append($logDate);
            $logInfo.append($userId);
            $logInfo.append($logAction);       

            $historyTable.append($logInfo);
        }
        $historyBlock.append($historyTable);
    }
}

window.onload = function() {
   {
        fetch ("logs", {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
            .then (statusFunc)
            .then ((response) => {return response.json();})
            .then ((logs) => {
                createHistoryTable(logs);
            })          
            .catch((err) => { console.log(err); });
    }
};