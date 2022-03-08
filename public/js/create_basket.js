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
    setCartData(cardData);
    
    window.location.reload();
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
      $tag.classList.add(className);
  }
  
  return $tag;
}

function createOrderForm()
{
  let $orderForm = createElement('div');
  $orderForm.setAttribute('id', 'order_form');

  let $container = createElement('div', 'container');
  $container.setAttribute('id', 'order');

  let $labelPhone = createElement('label');
  $labelPhone.setAttribute('for', 'phone');
  let $bLabelPhone = createElement('b');
  $bLabelPhone.innerHTML = 'Телефон';
  $labelPhone.append($bLabelPhone);

  let $phone = createElement('input');
  $phone.setAttribute('type', 'tel');
  $phone.setAttribute('id', 'phone');
  $phone.setAttribute('placeholder', '+380xxxxxxxxx');
  $phone.setAttribute('name', 'phone');
  $phone.setAttribute('required', '');

  let $labelRegion = createElement('label');
  $labelRegion.setAttribute('for', 'region');
  let $bLabelRegion = createElement('b');
  $bLabelRegion.innerHTML = 'Область';
  $labelRegion.append($bLabelRegion);

  let $region = createElement('input');
  $region.setAttribute('size', '17');
  $region.setAttribute('id', 'region');
  $region.setAttribute('placeholder', 'Днепропетровская');
  $region.setAttribute('name', 'region');
  $region.setAttribute('required', '');

  let $labelTown = createElement('label');
  $labelTown.setAttribute('for', 'town');
  let $blabelTown = createElement('b');
  $blabelTown.innerHTML = 'Город';
  $labelTown.append($blabelTown);

  let $town = createElement('input');
  $town.setAttribute('size', '17');
  $town.setAttribute('id', 'town');
  $town.setAttribute('placeholder', 'Днипро');
  $town.setAttribute('name', 'town');
  $town.setAttribute('required', '');

  let $labelPostOffice = createElement('label');
  $labelPostOffice.setAttribute('for', 'post_office');
  let $blabelPostOffice = createElement('b');
  $blabelPostOffice.innerHTML = 'Номер отделения НП/УкрПочты';
  $labelPostOffice.append($blabelPostOffice);

  let $postOffice = createElement('input');
  $postOffice.setAttribute('size', '17');
  $postOffice.setAttribute('id', 'post_office');
  $postOffice.setAttribute('placeholder', 'НП 38');
  $postOffice.setAttribute('name', 'post_office');
  $postOffice.setAttribute('required', '');

  let $labelPayMethod = createElement('label');
  $labelPayMethod.setAttribute('for', 'pay_method');
  let $blabelPayMethod = createElement('b');
  $blabelPayMethod.innerHTML = 'Метод оплаты';
  $labelPayMethod.append($blabelPayMethod);

  let $payMethod = createElement('input');
  $payMethod.setAttribute('maxsize', '30');
  $payMethod.setAttribute('id', 'pay_method');
  $payMethod.setAttribute('placeholder', 'Наложенный платёж');
  $payMethod.setAttribute('name', 'pay_method');
  $payMethod.setAttribute('required', '');
  
  let $buttonSend = createElement('button');
  $buttonSend.setAttribute('id', 'send_form');
  $buttonSend.setAttribute('onclick', 'sendForm();');
  $buttonSend.innerHTML = 'Отправить';

  let $script = createElement('script');
  $script.innerHTML = 'function sendForm() { let statusFunc = function(response) { if (response.status !== 200) { return Promise.reject(new Error(response.statusText)); } return Promise.resolve(response); } let user = sessionStorage.getItem("u_id"), $phone = document.querySelector("#phone").value, $region = document.querySelector("#region").value, $town = document.querySelector("#town").value, $postOffice = document.querySelector("#post_office").value, $payMethod = document.querySelector("#pay_method").value, amount = localStorage.getItem("total_cost"), cardData = JSON.parse(localStorage.getItem("card")), orderStatus = "Заказ оформлен"; if(user == null) { user = -1; } if (user && $phone && $region && $town && $postOffice && $payMethod && amount && cardData && orderStatus) { fetch ("add_order", { method: "POST", headers: { "Accept": "application/text", "Content-Type": "application/json" }, body: JSON.stringify({ userId: user, phone: $phone, region: $region, town: $town, postOffice: $postOffice, payMethod: $payMethod, orderStatus: orderStatus, totalCost: amount }) }) .then (statusFunc) .then ((response1) => {return response1.text();}) .then ((result1) => { if(result1 == "false") { alert("Произошла ошибка. Заказ не был отправлен. попробуйте снова через несколько минут."); } else if(result1 == "true") { fetch ("add_order_books", { method: "POST", headers: { "Accept": "application/text", "Content-Type": "application/json" }, body: JSON.stringify({ books: cardData }) }) .then (statusFunc) .then ((response2) => {return response2.text();}) .then ((result2) => { if(result2 == "false") { alert("Произошла ошибка. Заказ не был отправлен. попробуйте снова через несколько минут."); window.location.reload(); } else if (result2 == "true") { alert("Ваш заказ отправлен на обработку! Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения деталей заказа."); localStorage.removeItem("card"); localStorage.setItem("count_in_basket", 0); window.location.reload(); } }) .catch((err) => { console.log(err); }) }) .catch((err) => { console.log(err); }) } else { alert("Не все поля заполнены."); } }';

  $container.append($labelPhone);
  $container.append($phone);
  $container.append($labelRegion);
  $container.append($region);
  $container.append($labelTown);
  $container.append($town);
  $container.append($labelPostOffice);
  $container.append($postOffice);
  $container.append($labelPayMethod);
  $container.append($payMethod);
  $container.append($buttonSend);
  $container.append($script);
  
  $orderForm.append($container);

  cardCont.innerHTML = "";
  cardCont.append($orderForm);

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