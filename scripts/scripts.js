let productsContainer = document.querySelector('#products');
let cartItems = document.querySelector('#cart-items');
let cartSection = document.querySelector('#cartSection');
let totalItemsEl = document.querySelector('.total-items');
let totalPriceEl = document.querySelector('.total-price')

// show products function

function showAllProducts() {
    for (let i = 0; i < products.length; i++) {
        productsContainer.innerHTML +=

            ` 

                <div class="product-item">

                    <div class="product-image">
                        <img src="`+ products[i].imgSrc + `" alt="productImage">
                    </div>

                    <div class="product-title">`+ products[i].name + `</div>
                    <div class="product-instock">تعداد موجود : `+ products[i].instock + `</div>
                    <hr>
                    <div class="product-data">
                        <div class="product-price right">`+ commafy(products[i].price) + `</div>
                        <div class="add-to-cart left" onclick="addToCart(` + products[i].id + `)"><img src="images/add-to-cart.png" alt="add-to-cart" class="addTo">
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>

            `

    };
} showAllProducts();



// cart array

let cart = [];

// add to cart function

function addToCart(id) {

    let itemId = cart.some(function (item) {
        return item.id == id;
    })
    if (itemId) {
        // cart.splice(item);
        changeNumberOfUnits('plus', id)
    } else {
        let item = products.find(function (p) {
            return p.id == id
        })
        item.numberOfUnits = 1;
        cart.push(item)
        renderCartItem();
    }
}

// render cart items

function renderCartItem() {
    cartItems.innerHTML = ' ';
    for (let i = 0; i < cart.length; i++) {
        cartItems.innerHTML += `<li class="cart-item">

                        <div class="p-name">` + cart[i].name + `</div>
                        <div class="p-price">` + commafy(cart[i].price) + `</div>

                        <div class="p-unit">

                            <span class="plus" onclick="changeNumberOfUnits('plus' , ` + cart[i].id + `)"><i class="fa-solid fa-plus"></i></span>
                            <span class="unit"> ` + cart[i].numberOfUnits + ` </span>
                            <span class="minus" onclick="changeNumberOfUnits('minus' , ` + cart[i].id + `)"><i class="fa-solid fa-minus"></i></span>

                        </div>

                    </li>`
        renderTotal();
    }
}

//change number of units

function changeNumberOfUnits(action, id) {
    // console.log(action + '  -  ' + id)
    cart = cart.map(function (item) {
        let oldNumberOfUnit = item.numberOfUnits;

        if (item.id == id) {
            if (action == 'plus' && oldNumberOfUnit < item.instock) {
                oldNumberOfUnit++;
            } else if (action == 'minus' && oldNumberOfUnit >= 1) {
                oldNumberOfUnit--;
            }
        }
        item.numberOfUnits = oldNumberOfUnit;
        return item;
    })
    cart = cart.filter(item => item.numberOfUnits > 0);

    renderCartItem();
    renderTotal();
}

// render total 

function renderTotal() {
    let totalPrice = 0;
    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].numberOfUnits;
        totalPrice += cart[i].price * cart[i].numberOfUnits; 
    }

    totalItemsEl.innerHTML = totalItems;
    totalPriceEl.innerHTML = commafy(totalPrice);
}

// opener cart

cartSection.addEventListener('click', function () {

    let cartSectionOpen = cartSection.getAttribute('class');
    let cartContent = document.querySelector('#cartContentList');
    let final = document.querySelector('#final');

    if (cartSectionOpen == 'close') {
        cartSection.setAttribute('class', 'open')
        cartContent.setAttribute('class', 'openCartContent')
        final.setAttribute('class', 'final-show')
    } else {
        cartSection.setAttribute('class', 'close')
        cartContent.setAttribute('class', 'closeCartContent')
        final.setAttribute('class', 'final-hide')
    }

});