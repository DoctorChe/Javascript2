class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchGoods();
    }
    calcTotalCost(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    _fetchGoods(){
        this.goods = [
            {title: 'Notebook', price: 2000},
            {title: 'Mouse', price: 20},
            {title: 'Keyboard', price: 35},
            {title: 'Gamepad', price: 48},
            {title: 'Chair', price: 500},
        ];
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
        this.title = item.title;
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
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                    </div>
                </div>`;

    }
}

class Basket {
    constructor(){}
    addItem(){}
    removeItem(){}
    countItems(){}
    calcTotalPrice(){}
    clear(){}
    render(){}
}

class BasketItem {
    constructor(){}
    render(){}
}

const list = new ProductsList();
list.render();
console.log(list.calcTotalCost());
