const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 35},
    {id: 4, title: 'Gamepad', price: 58},
    {id: 5, title: 'Chair', price: 200},
    {id: 6, title: 'Table'},
];

const renderProduct = (id, title, price = 0) => `<div class="product-item">
                                                    <h3>${title}</h3>
                                                    <p>${price}</p>
                                                    <button 
                                                    data-id="${id}"
                                                    data-price="${price}"
                                                    data-title="${title}"
                                                    >Купить</button>
                                                </div>`;
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.id, item.title, item.price));
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);