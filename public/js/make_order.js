'use strict'

async function sendForm() {
    let user = sessionStorage.getItem("u_id"), 
    $phone = document.querySelector("#phone").value, 
    $region = document.querySelector("#region").value, 
    $town = document.querySelector("#town").value, 
    $postOffice = document.querySelector("#post_office").value, 
    $payMethod = document.querySelector("#pay_method").value, 
    amount = localStorage.getItem("total_cost"), 
    cardData = localStorage.getItem("card"),
    orderStatus = "Заказ оформлен";
    
    if(user == null) { user = -1; } 
    
    if (user && $phone && $region && $town && $postOffice && $payMethod && amount && cardData && orderStatus) { 
        const response = await fetch ("api/make_order", {
            method: "POST",
            headers: { "Accept": "application/text", "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user,
                phone: $phone,
                region: $region,
                town: $town,
                postOffice: $postOffice,
                payMethod: $payMethod,
                orderStatus: orderStatus,
                totalCost: amount,
                books: cardData
            })
        });

        if (response.ok === true) {
            const result = await response.text();
            
            if(result == 'false') {
                alert("Произошла ошибка. Заказ не был отправлен. попробуйте снова через несколько минут.");
                window.location.reload();
            } else if (result == 'true') { 
                alert("Ваш заказ отправлен на обработку! Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения деталей заказа.");

                localStorage.removeItem("card"); 
                localStorage.setItem("count_in_basket", 0); 
                window.location.reload(); 
            }                        
        }
    } else { 
        alert("Не все поля заполнены.");
    } return false; 
}
