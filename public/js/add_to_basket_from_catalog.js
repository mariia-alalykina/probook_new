'use strict'

let d = document,
    itemBox = d.querySelectorAll('.prod_card'),       // блок каждого товара
    count_in_basket = d.querySelector('#img_basket span'); //количество товаров в корзине
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
      parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
      itemId = this.getAttribute('data-id'), // ID товара
      itemImg = parentBox.querySelector('.img_book_card').innerHTML, //фото товара
      itemTitle = parentBox.querySelector('.book_name').innerHTML, // название товара
      itemAuthor = parentBox.querySelector('.book_author').innerHTML, //имя автора
      itemPrice = parentBox.querySelector('.cost span').innerHTML; // стоимость товара
  
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

let bookId = 0;

/* function getId()
{
  bookId = this.getAttribute('data-id');
  localStorage.setItem('book-id', bookId);
  window.location.href = 'book.html';
} */

//обработчик для открытия каждой книги
/* for(let i = 0; i < itemBox.length; i++)
{
  addEvent(itemBox[i].querySelector('a'), 'click', getId);
} */

let goods_in_basket = 0;
goods_in_basket = localStorage.getItem('count_in_basket');
count_in_basket.innerHTML = goods_in_basket;
// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
for(let i = 0; i < itemBox.length; i++)
{
  addEvent(itemBox[i].querySelector('.add_to_basket'), 'click', addToBasket);
}
//функция-обработчик клика по корзине
function func_handler()
{
    window.location.href = "basket.html";
}
/* Открыть корзину */
addEvent(d.getElementById('img_basket'), 'click', func_handler);

