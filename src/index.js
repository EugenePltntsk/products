import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { nanoid } from 'nanoid';
import './css/styles.css';
import { getProducts, postProduct, deleteProduct } from './helpers/API';


// postProduct( { type: 'phones',
// brand: 'Samsung',
// model: 'S22',
// image: 'https://img.moyo.ua/img/products/5117/94_4000.jpg?1666105298',
// price: '850',
// currency: '$',
// color: 'black',
// description: 'this is amazing product',
// isNew: true,
// quantity: '490 phones'} );

const refs = {
  divEl: document.querySelector('#app'),
  formEl: document.querySelector('#form'),
};
let listOfProducts = {
    phones: [],
    tvs: [],
    cars: [],
    computers: [],
    tablets: [],
    watches: [],
  };

refs.divEl.addEventListener("click", async event => {
    if(event.target.tagName === "BUTTON" && event.target.name === "delete") {
       const deletedProduct = await deleteProduct(event.target.id)
       console.log(deletedProduct);
       listOfProducts[deletedProduct.type] = listOfProducts[deletedProduct.type].filter(item => item.id !== event.target.id);
        }
        event.target.closest("li").remove();

    
    })
       
    
    


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





const drawAllProducts = obj => {
    
  for (let key in obj) {
    const ulElement = document.createElement('ul');
    ulElement.classList.add(`${key}`);
    obj[key].forEach(item => {
      ulElement.insertAdjacentHTML('beforeend', getTemplate(item));
    });
    refs.divEl.appendChild(ulElement);
  }
};

const sortAndFillListOfProducts = async () => {
    const result = await getProducts();
    result.forEach( item => {
        listOfProducts[item.type].push(item);
    })
    drawAllProducts(listOfProducts);
}

sortAndFillListOfProducts();

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

const getAllProducts = async () => {
  allProductsFromApi = await getProducts();
};

const listOfCurrency = ['$', 'Uah', 'Euro'];

const makeProduct = async ({
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
  const newProduct = new Product(
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
  );

  const postData = await postProduct(newProduct);

  listOfProducts[type].push(postData);

  return postData;
};

// makeProduct(
//   'tablets',
//   'Apple',
//   'Pro12',
//   'https://i.citrus.world/imgcache/size_800/uploads/shop/3/0/30fb1b95216e4c2af97949649d1cf968.jpg',
//   '800',
//   '$',
//   'space gray',
//   'good both for work and games',
//   true,
//   '85 tablets'
// );

// makeProduct(
//   'phones',
//   'Samsung',
//   'S22',
//   'https://img.moyo.ua/img/products/5117/94_4000.jpg?1666105298',
//   '850',
//   '$',
//   'black',
//   'this is amazing product',
//   true,
//   '490 phones'
// );

// makeProduct(
//   'phones',
//   'Apple',
//   'Iphone 5',
//   'https://mcstore.com.ua/image/cache/iblock/8b9/8b9f336dba39b6dfa634c446b33e699b-600x600.jpg',
//   '150',
//   '$',
//   'black',
//   'Nice phone',
//   false,
//   '18 phones'
// );

// makeProduct(
//   'cars',
//   'Mazda',
//   'CX-5',
//   'https://asset.kompas.com/crops/6k-KnbtmM-IHe8a5mUY3_gqQIik=/202x0:1282x720/750x500/data/photo/2022/02/06/61ff8e88a094a.jpg',
//   30000,
//   '$',
//   'white',
//   'I know, you want to buy it now',
//   true,
//   '20 cars'
// );

// makeProduct(
//   'tablets',
//   'Xiaomi',
//   'Ultra14',
//   'https://i.allo.ua/media/catalog/product/cache/1/image/524x494/602f0fa2c1f0d1ba5e241f914e856ff9/7/8/78867868678.jpg',
//   12000,
//   'Uah',
//   'green',
//   'the best tablet ever!!!',
//   true,
//   '999 tablets'
// );

// makeProduct(
//   'cars',
//   'Renault',
//   'Captur',
//   'https://itc.ua/wp-content/uploads/2021/09/foto-2-1-1-1.jpg',
//   15000,
//   '$',
//   'ivory',
//   'Good value for money',
//   false,
//   '3 cars'
// );

// makeProduct(
//   'watches',
//   'Mazeratti',
//   'Potenza',
//   'https://ru.firstclasswatches.com/thumbnails/images/products/product71275-5404_cropped.jpg.thumb_FFFCFA_650x1000.jpg',
//   300,
//   '$',
//   'gold/blue',
//   'Italian style...',
//   true,
//   '17 watches'
// );

// )

const getTemplate = ({
    id,
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
  }</span><span>Available: ${quantity}</span></a><button type='button' name ='delete' id='${id}'>Delete Product</button></li>`;
};

const fillOptionsType = () => {
  const options = Object.keys(listOfProducts).map(item => {
    return `<option value="${item}">${item.slice(0, -1)}</option>`;
  });

  refs.formEl.elements.type.innerHTML = options.join('');
};

fillOptionsType();

const fillOptionsCurrency = () => {
  const optionsCurrency = listOfCurrency.map(item => {
    return `<option value='${item}'>${item}</option>`;
  });
  refs.formEl.elements.currency.innerHTML = optionsCurrency.join('');
};

fillOptionsCurrency();

const createProductBySubmit = async event => {
  event.preventDefault();
  
  const type = event.target.elements.type.value;
  const brand = event.target.elements.brand.value;
  const model = event.target.elements.model.value;
  const image = event.target.elements.image.value;
  const price = event.target.elements.price.value;
  const currency = event.target.elements.currency.value;
  const color = event.target.elements.color.value;
  const description = event.target.elements.description.value;
  const isNew = !!event.target.elements.isNew.value;
  const quantity = event.target.elements.quantity.value;

  const result = await makeProduct({
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
  });

  document.querySelector(`.${type}`).insertAdjacentHTML(
    'beforeend', getTemplate(result));

    event.target.reset();

};

refs.formEl.addEventListener('submit', createProductBySubmit);

// зробити форму. наповнити джанними (оформити, додати селекти, заповнити радіобаттони, плейсхолдери).
// зібрати данні з форми. по сабміту створити товар. DONE!

//після захолду на сторінку.. треба зчитати з локал стор. запустити функйц. яка відмалює, якщо там щось є.
// коли створ товар ми маємо в локал стор записати новий обʼєкт з нашими даними(оновити локал стор)
