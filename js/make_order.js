'use strict'

function sendForm()
{
    let user = sessionStorage.getItem('u_id'),
    phone = document.querySelector('#phone').value,
    comment = document.querySelector('#comment').value,
    amount = localStorage.getItem('total_cost'),
    card_data = localStorage.getItem('card');

    if(user == null)
    {
        user = -1;
    }

    let send_data = {user: user, phone: phone, comment: comment, amount: amount, card_data: card_data},
        result;

    if (user && phone && comment && amount && card_data)
    {
            $.ajax(
            {
                method: "POST",
                url: "make_order.php",
                dataType: "text",
                async: false,
                data: send_data,
                success: function(data) {
                    if(data == 'true')
                    {
                        result = true;
                        alert("Ваш заказ отправлен на обработку! Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения деталей заказа.");
                    }
                    else 
                    {
                        result = false;
                        alert("Произошла ошибка. Заказ не был отправлен. попробуйте снова через несколько минут.");
                    }
                }
            });    
        
        if (result === true)
        {
            localStorage.removeItem('card');
            localStorage.setItem('count_in_basket', 0);
            window.location.reload();
        }
        else if (result === false)
        {
            window.location.reload();
        }
    }
    else {alert("Не все поля заполнены.");}
    return false;
}


