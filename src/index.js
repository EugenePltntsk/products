import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const divEl = document.querySelector('#app');

class Product {
  constructor(
    type,
    brand,
    model,
    image,
    price,
    currency,
    color,
    description,
    isNew,
    quantity = 0
  ) {
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.image = image;
    this.price = price;
    this.currency = currency;
    this.color = color;
    this.description = description;
    this.isNew = isNew;
    this.quantity = quantity;
  }
  makeDescription() {
    return `Your product is ${this.type}. It's price is ${this.price}. Thank you for choosing ${this.brand}`;
  }
  changePrice(newPrice) {
    this.price = newPrice;
  }

  changeQuantity(newQuantity) {
    this.quantity = newQuantity;
  }

  addQuantity() {
    this.quantity += 1;
  }

  deleteQuantity() {
    this.quantity -= 1;
  }
}

const phone = new Product(
  'phones',
  'Samsung',
  'S22',
  'https://img.moyo.ua/img/products/5117/94_4000.jpg?1666105298',
  '850',
  '$',
  'black',
  'this is amazing product',
  true,
  '490 phones'
);

// console.log(phone)

// phones, tv, cars, computers, tablets, watches.
// const listOfProducts = ["phones", "tvs", "cars", "computers", "tablets", "watches"]

const listOfProducts = {
  phones: [],
  tvs: [],
  cars: [],
  computers: [],
  tablets: [],
  watches: [],
};

const makeProduct = (
  type,
  brand,
  model,
  image,
  price,
  currency,
  color,
  description,
  isNew,
  quantity = 0
) => {
  if (Object.keys(listOfProducts).includes(type)) {
    listOfProducts[type].push(
      new Product(
        type,
        brand,
        model,
        image,
        price,
        currency,
        color,
        description,
        isNew,
        quantity
      )
    );
  } else {
    return alert(`We don't sell ${type}`);
  }
};

makeProduct(
  'tablets',
  'Apple',
  'Pro12',
  'https://i.citrus.world/imgcache/size_800/uploads/shop/3/0/30fb1b95216e4c2af97949649d1cf968.jpg',
  '800',
  '$',
  'space gray',
  'good both for work and games',
  true,
  '85 tablets'
);

makeProduct(
  'phones',
  'Samsung',
  'S22',
  'https://img.moyo.ua/img/products/5117/94_4000.jpg?1666105298',
  '850',
  '$',
  'black',
  'this is amazing product',
  true,
  '490 phones'
);
console.log(listOfProducts);

makeProduct(
  'phones',
  'Apple',
  'Iphone 5',
  'https://mcstore.com.ua/image/cache/iblock/8b9/8b9f336dba39b6dfa634c446b33e699b-600x600.jpg',
  '150',
  '$',
  'black',
  'Nice phone',
  false,
  '18 phones'
);

makeProduct(
  'cars',
  'Mazda',
  'CX-5',
  'https://asset.kompas.com/crops/6k-KnbtmM-IHe8a5mUY3_gqQIik=/202x0:1282x720/750x500/data/photo/2022/02/06/61ff8e88a094a.jpg',
  30000,
  '$',
  'white',
  'I know, you want to buy it now',
  true,
  '20 cars'
);

makeProduct(
  'tablets',
  'Xiaomi',
  'Ultra14',
  'https://i.allo.ua/media/catalog/product/cache/1/image/524x494/602f0fa2c1f0d1ba5e241f914e856ff9/7/8/78867868678.jpg',
  12000,
  'Uah',
  'green',
  'the best tablet ever!!!',
  true,
  '999 tablets'
);

makeProduct(
  'cars',
  'Renault',
  'Captur',
  'https://bossauto-images.s3.eu-central-1.amazonaws.com/images/image_1640707866173-8b9caff3.jpg',
  15000,
  '$',
  'ivory',
  'Good value for money',
  false,
  '3 cars'
);

makeProduct(
  'watches',
  'Mazeratti',
  'Potenza',
  'https://ru.firstclasswatches.com/thumbnails/images/products/product71275-5404_cropped.jpg.thumb_FFFCFA_650x1000.jpg',
  300,
  '$',
  'gold/blue',
  'Italian style...',
  true,
  '17 watches'
);

// )

const getTemplate = ({
  type,
  brand,
  model,
  image,
  price,
  currency,
  color,
  description,
  isNew,
  quantity,
}) => {
  return `<li><a href='${image}'><span>Type of product: ${type}</span><span>Brand: ${brand}</span><span>${model}</span><img src="${image}" alt="${type}"/><span>Price: ${price}</span><span>Currency: ${currency}</span><span>Color: ${color}</span><p>Description: ${description}</p><span>new or used: ${
    isNew ? 'new' : 'used'
  }</span><span>Available: ${quantity}</span></a></li>`;
};

const drawAllProducts = obj => {
  for (let key in obj) {
    const ulElement = document.createElement('ul');
    obj[key].forEach(item => {
      ulElement.insertAdjacentHTML('beforeend', getTemplate(item));
    });
    divEl.appendChild(ulElement);
  }
};

drawAllProducts(listOfProducts);
