const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject('');
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error!');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

// getRequest('api').then()  // пример использования


class List {
    constructor(url, container){
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    handleData(data){
        this.goods = data;
        this.render();
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new list[this.constructor.name](product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init(){
        return false
    }
}
class Item {
    constructor(el, img = 'https://placehold.it/200x150'){
        this.product_name = el.product_name;
        this.price = el.price;
        this.img = img;
        this.id_product = el.id_product
    }

    render(){
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn"
                        data-id="${this.id_product}"
                        data-price="${this.price}"
                        data-name="${this.product_name}"
                        data-img="${this.img}">
                        Купить
</button>
                    </div>
                </div>`;

    }
}


class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchGoods();
        // this._getProducts().then(() => this.render());
        this._getProducts();
        // .then(data => {
        //     this.goods = data;
        //     this.render();
        // })
    }
    calcTotalCost(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    // _fetchGoods(){
    //     this.goods = [
    //         {title: 'Notebook', price: 2000},
    //         {title: 'Mouse', price: 20},
    //         {title: 'Keyboard', price: 35},
    //         {title: 'Gamepad', price: 48},
    //         {title: 'Chair', price: 500},
    //     ];
    // }
    // getProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb()
    //     })
    // }

    _getProducts(){
        // return fetch(`${API}/catalogData.json`)
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = data;
                this.render()
            })
            .catch(error => console.log(error))
    }
    render(){
        let block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new Product(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class Product {
    constructor(item, img = 'https://placehold.it/200x150'){
        this.product_name = item.product_name;
        this._price = item.price;
        this.img = img;
    }
    get price(){
        return this._price;
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                    </div>
                </div>`;
    }
}

class Basket {
    constructor(container = '.basket'){
        this.container = container;
        this.contents = [];
        this.amount = 0;
        this.countGoods = 0;
        this.allProducts = [];
        this._getBasket();
    }
    _getBasket(){
        fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.contents = data["contents"];
                this.amount = data["amount"];
                this.countGoods = data["countGoods"];
                this.render()
            })
            .catch(error => console.log(error))
    }
    addItem(){}
    removeItem() {}
    countItems(){}
    calcTotalCost(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    clear(){}
    render(){
        let block = document.querySelector(this.container);
        for (let item of this.contents){
            const productObj = new BasketItem(item);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        let totalCost = this.calcTotalCost();
        block.insertAdjacentHTML('beforeend', `<p>Итого - ${totalCost} $</p>`);
    }
}

class BasketItem {
    constructor(item){
        this.id_product = item.id_product;
        this.product_name = item.product_name;
        this.price = item.price;
        this.quantity = item.quantity;
    }
    render(){
        return `<div class="basket-item">
                    <div class="desc">
                        <p>${this.product_name} (${this.price} $) - ${this.quantity} шт.</p>
                        <button id="add" class="btn-cart" type="button">Добавить</button>
                        <button id="remove" class="btn-cart" type="button">Удалить</button>
                    </div>
                </div>`;
    }
}

const list = new ProductsList();
// list.render();
// list.getProducts(() => {
//     list.render();
// });
const basket = new Basket();