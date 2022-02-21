'use strict'

let d = document,
    cardCont = d.getElementById('basket'),    // блок вывода данных корзины
    count_in_basket = d.querySelector('#img_basket span'); 
// Функция кроссбраузерной установки обработчика событий
function addEvent(elem, type, handler)
{
  if(elem.addEventListener)
  {
    elem.addEventListener(type, handler, false);
  } 
  else 
  {
    elem.attachEvent('on' + type, function() { handler.call( elem ); } );
  }
  return false;
}
// Получаем данные из LocalStorage
function getCardData(){
  return JSON.parse(localStorage.getItem('card'));
}

function setCartData(o){
  localStorage.setItem('card', JSON.stringify(o));
  return false;
}

// Открываем корзину со списком добавленных товаров
let cardData = getCardData(), // вытаскиваем все данные корзины
      totalItems = '',
      totalCost = 0;
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cardData !== null)
  {
      totalItems += '<div class="basket_head">Корзина</div>';
        for(let items in cardData)
        {
            totalItems += '<div class="item"><div class="button_del"><span class="delete_btn" data-id = "' + items + '"></span></div>';
            totalItems += '<div class="basket_image">' + cardData[items][0] + '</div>';
            totalItems += '<div class="description"><span>' + cardData[items][1] + '</span>';
            totalItems += '<span>' + cardData[items][2] + '</span></div>';
            totalItems += '<div class="quantity"><p><span>' + cardData[items][3] + '</span> шт.</p></div>';
            totalItems += '<div class="total_price"><span>' + (cardData[items][4] * cardData[items][3])+ '</span> грн.</div></div>'; 
            totalCost += cardData[items][4] * cardData[items][3];
        }
        localStorage.setItem('total_cost', totalCost);
        totalItems += '<div id = "total_cost"><p>Очистить корзину</p><p>Итого: <span>' + totalCost + '</span> грн.</p></div>';
        totalItems += '<button type = "submit" id = "make_order">Оформить заказ</button>';
        cardCont.innerHTML = totalItems;
   }
   else 
   {
    // если в корзине пусто, то сигнализируем об этом
    cardCont.innerHTML = '<div class="basket_head">Корзина</div><div style = "margin: 10px;">Корзина пуста!</div>';
   }
//функция-обработчик клика по корзине
function func_handler()
{
    window.location.href = "basket.html";
}

//удалить из корзины
function removeFromBasket()
{
    let book_author = document.querySelector('#basket .description span:first-child').innerHTML;
    for (let item in cardData)
    {
        if(item == this.getAttribute('data-id'))
        {
          let itemBlock = this.parentNode.parentNode;
          count_in_basket.innerHTML -= itemBlock.querySelector('.quantity span').innerHTML;
          localStorage.setItem('count_in_basket', count_in_basket.innerHTML);
          if (localStorage.getItem('count_in_basket') == 0)
          {
            localStorage.removeItem('card');
            localStorage.removeItem('total_cost');
            window.location.reload();
            return;
          }
          delete cardData[item];          
        }
    }    
    setCartData(cardData)
    
    window.location.reload();
}

function createOrderForm()
{
  let totalForm = '';
  totalForm += '<div id = "order_form"><form id = "order" method="POST"><div class="container"><label for="phone"><b>Телефон</b></label><input type="tel" id = "phone" placeholder="+380xxxxxxxxx" name="phone" required><label for="region"><b>Область</b></label><input size = 17 id = "region" placeholder="Днепропетровская" name="region" required><label for="town"><b>Город</b></label><input size = 17 id = "town" placeholder="Днипро" name="town" required><label for="post_office"><b>Номер отделения НП/УкрПочты</b></label><input size = 17 id = "post_office" placeholder="НП 38" name="post_office" required><label for="pay_method"><b>Метод оплаты</b></label><input maxsize = 30 id = "pay_method" placeholder="Наложенный платёж" name="pay_method" required><button id = "send_form" type="submit" onclick = "return sendForm();">Отправить</button> <script> function sendForm() { let user = sessionStorage.getItem("u_id"), phone = document.querySelector("#phone").value, comment = document.querySelector("#comment").value, amount = localStorage.getItem("total_cost"), card_data = localStorage.getItem("card"); if(user == null) { user = -1; } let send_data = {user: user, phone: phone, comment: comment, amount: amount, card_data: card_data}, result; if (user && phone && comment && amount && card_data) { $.ajax( { method: "POST", url: "make_order.php", dataType: "text", async: false, data: send_data, success: function(data) { if(data == "true") { result = true; alert("Ваш заказ отправлен на обработку! Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения деталей заказа."); } else { result = false; alert("Произошла ошибка. Заказ не был отправлен. попробуйте снова через несколько минут."); } } }); if (result === true) { localStorage.removeItem("card"); localStorage.setItem("count_in_basket", 0); window.location.reload(); } else if (result === false) { window.location.reload(); } } else {alert("Не все поля заполнены.");} return false; } </script></div></form></div>';
  cardCont.innerHTML = totalForm;
}

let goods_in_basket = 0;
goods_in_basket = localStorage.getItem('count_in_basket');
count_in_basket.innerHTML = goods_in_basket;

/* Открыть корзину */
addEvent(d.getElementById('img_basket'), 'click', func_handler);

//очистить корзину
if(d.querySelector('#total_cost p:first-child'))
{
  addEvent(d.querySelector('#total_cost p:first-child'), 'click', function(e) 
  {
    localStorage.removeItem('card');
    localStorage.setItem('count_in_basket', 0);
    window.location.reload();
  })
}

//оформить заказ
if (d.getElementById('make_order'))
{
  addEvent(d.getElementById('make_order'), 'click', createOrderForm);
}

let itemBox = d.querySelectorAll('.delete_btn');
//добавляем обработчики ко всем кнопкам удалить
for(var i = 0; i < itemBox.length; i++)
{
  addEvent(itemBox[i], 'click', removeFromBasket);
}