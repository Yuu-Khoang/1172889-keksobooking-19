var axisXMin = 0;
var axisXMax = 1200;
var axisYmin = 130;
var axisYMax = 630;

var priceMin = 1;
var priceMax = 1000000;

var typeHotel = ['palace', 'flat', 'house', 'bungalo'];
var timeCheckIn = ['12:00', '13:00', '14:00'];
var timeCheckOut = ['12:00', '13:00', '14:00'];

var featuresHotel = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptionList = ['Очень удобное расположение и всего десять минут до круглосуточного магазина!', 'Чисто и уютно. То, что нужно для отдыха!', 'Внимательный и дружелюбный персонал, который поможет с любыми вопросами во время проживания', 'Потрясающий вид из окна на токийские рассветы и закаты']
var photoHotel = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getElementArray(array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

function getRandomArray(array) {
  var amount = getNumber(1, array.length);
  var randomArray = [];
  for (var i = 1; i < amount; i++) {
    var item = array[i];
    randomArray.push(item);
  };
  return randomArray;
};

function createAds() {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    var axisX = getNumber(axisXMin, axisXMax);
    var axisY = getNumber(axisYmin, axisYMax);

    var advertObject = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Объявление №' + (i + 1),
        'address': axisX + ', ' + axisY,
        'price': getNumber(priceMin, priceMax),
        'type': getElementArray(typeHotel),
        'rooms': getNumber(1, 100),
        'guests': getNumber(1, 3),
        'checkin': getElementArray(timeCheckIn),
        'checkout': getElementArray(timeCheckOut),
        'features': getRandomArray(featuresHotel),
        'description': getElementArray(descriptionList),
        'photos': getRandomArray(photoHotel)
      },
      'location': {
        'x': axisX,
        'y': axisY
      },
    }

    var pinMap = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = advertObject.location.x - 25 + 'px';
    pinElement.style.top = advertObject.location.y - 70 + 'px';
    pinElement.querySelector('img').alt = advertObject.offer.description;
    pinElement.querySelector('img').src = advertObject.author.avatar;
    pinMap.appendChild(pinElement);

    ads.push(advertObject);
  }
  return ads;
};

var mapRemove = document.querySelector('.map');
mapRemove.classList.remove('map--faded')

var generatedAds = createAds();
console.log(generatedAds)


