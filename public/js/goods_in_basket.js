'use strict'

let goods_in_basket = 0,
count_in_basket = document.querySelector('#img_basket span');

goods_in_basket = localStorage.getItem('count_in_basket');
count_in_basket.innerHTML = goods_in_basket;