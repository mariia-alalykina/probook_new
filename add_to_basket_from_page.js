'use strict'

let d = document,
    itemBox = d.querySelector('#book_page'), // блок с информацией о книге
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
// Записываем данные в LocalStorage
function setCartData(o){
  localStorage.setItem('card', JSON.stringify(o));
  return false;
}
// Добавляем товар в корзину
function addToBasket(e)
{
  this.disabled = true; // блокируем кнопку на время операции с корзиной
  let cardData = getCardData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = document.getElementById('book_page'), // родительский элемент кнопки "Добавить в корзину"
      itemId = this.getAttribute('data-id'), // ID товара
      itemImg = parentBox.querySelector('.img_book_page').innerHTML, //фото товара
      itemTitle = parentBox.querySelector('#book_content .main_inform .b_name span').innerHTML, // название товара
      itemAuthor = parentBox.querySelector('#book_content .main_inform .author span').innerHTML, //имя автора
      itemPrice = parentBox.querySelector('.price_info .price span').innerHTML; // стоимость товара
  
  if(cardData.hasOwnProperty(itemId))
  { // если такой товар уже в корзине, то добавляем +1 к его количеству
    cardData[itemId][3] += 1;
  } 
  else 
  { // если товара в корзине еще нет, то добавляем в объект
    cardData[itemId] = [itemImg, itemTitle, itemAuthor, 1, itemPrice];
  }
  if(!setCartData(cardData))
  { // Обновляем данные в LocalStorage
    this.disabled = false; // разблокируем кнопку после обновления LS
  }
  count_in_basket.innerHTML++;
  localStorage.setItem('count_in_basket', count_in_basket.innerHTML);
 return false;
}

let goods_in_basket = 0;
goods_in_basket = localStorage.getItem('count_in_basket');
count_in_basket.innerHTML = goods_in_basket;

// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
addEvent(itemBox.querySelector('.add_to_basket'), 'click', addToBasket);
//функция-обработчик клика по корзине
function func_handler()
{
    window.location.href = "basket.html";
}
/* Открыть корзину */
addEvent(d.getElementById('img_basket'), 'click', func_handler);
