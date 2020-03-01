'use strict';

var AXIS_X_MIN = 0;
var AXIS_X_MAX = 1200;
var AXIS_X_SHIFT = 25;
var AXIS_Y_MIN = 130;
var AXIS_Y_MAX = 630;
var AXIS_Y_SHIFT = 70;

var ADS_PIECES = 8;

var PRICE_MIN = 1;
var PRICE_MAX = 1000000;

var TYPE_HOTEL = ['palace', 'flat', 'house', 'bungalo'];
// var TYPE_HOTEL = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES_HOTEL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION_LIST = ['Очень удобное расположение и всего десять минут до круглосуточного магазина!', 'Чисто и уютно. То, что нужно для отдыха!', 'Внимательный и дружелюбный персонал, который поможет с любыми вопросами во время проживания', 'Потрясающий вид из окна на токийские рассветы и закаты'];
var PHOTO_HOTEL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinMap = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var adsList = document.querySelector('.map');
var adsTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getElementArray(array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
}

function getRandomArray(array) {
  var amount = getNumber(1, array.length);
  var randomArray = [];
  for (var i = 1; i < amount; i++) {
    var item = array[i];
    randomArray.push(item);
  }
  return randomArray;
}

function createAds() {
  var ads = [];
  for (var i = 0; i < ADS_PIECES; i++) {
    var coordinateX = getNumber(AXIS_X_MIN, AXIS_X_MAX);
    var coordinateY = getNumber(AXIS_Y_MIN, AXIS_Y_MAX);

    var advertObject = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Объявление №' + (i + 1),
        'address': coordinateX + ', ' + coordinateY,
        'price': getNumber(PRICE_MIN, PRICE_MAX),
        'type': getElementArray(TYPE_HOTEL),
        'rooms': getNumber(1, 100),
        'guests': getNumber(1, 3),
        'checkin': getElementArray(TIME_CHECKIN),
        'checkout': getElementArray(TIME_CHECKOUT),
        'features': getRandomArray(FEATURES_HOTEL),
        'description': getElementArray(DESCRIPTION_LIST),
        'photos': getRandomArray(PHOTO_HOTEL)
      },
      'location': {
        'x': coordinateX,
        'y': coordinateY
      },
    };
    ads.push(advertObject);
  }
  return ads;
}

var generatedAds = createAds();

function createPins() {
  for (var i = 0; i < generatedAds.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = generatedAds[i].location.x - AXIS_X_SHIFT + 'px';
    pinElement.style.top = generatedAds[i].location.y - AXIS_Y_SHIFT + 'px';
    pinElement.querySelector('img').alt = generatedAds[i].offer.description;
    pinElement.querySelector('img').src = generatedAds[i].author.avatar;
    pinMap.appendChild(pinElement);
  }
}

createPins();

function showCard(card) {
  var adsElement = adsTemplate.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = generatedAds[0].offer.title;
  adsElement.querySelector('.popup__text--address').textContent = generatedAds[0].offer.address;
  adsElement.querySelector('.popup__text--price').textContent = generatedAds[0].offer.price + '₽/ночь';
  if (generatedAds[0].offer.type === 'palace') {
    adsElement.querySelector('.popup__type').textContent = 'Дворец';
  }
  if (generatedAds[0].offer.type === 'flat') {
    adsElement.querySelector('.popup__type').textContent = 'Квартира';
  }
  if (generatedAds[0].offer.type === 'house') {
    adsElement.querySelector('.popup__type').textContent = 'Дом';
  }
  if (generatedAds[0].offer.type === 'bungalo') {
    adsElement.querySelector('.popup__type').textContent = 'Бунгало';
  }
  adsElement.querySelector('.popup__text--capacity').textContent = generatedAds[0].offer.rooms + ' комнаты для ' + generatedAds[0].offer.guests + ' гостей';
  adsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + generatedAds[0].offer.checkin + ', выезд до ' + generatedAds[0].offer.checkout;
  adsElement.querySelector('.popup__features').textContent = generatedAds[0].offer.features;
  adsElement.querySelector('.popup__description').textContent = generatedAds[0].offer.description;
  adsElement.querySelector('.popup__photo').src = photo;
  for (var j = 1; j < generatedAds.offer.photos; j++) {
    var photo = [];
    var item = generatedAds.offer.photos[j];
    photo.push(item);
  }
  adsElement.querySelector('img').src = generatedAds[0].author.avatar;
  adsList.insertBefore(adsElement, map.querySelector('.map__filters-container'));
}

var cardNumber = createPins[0];
showCard(cardNumber);

/*
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
*/
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// console.log(generatedAds);


