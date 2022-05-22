import { retrieveProductData } from "./api-calls.js"

const displayTotalPrice = (totalPrice, quantity) => {
    document.querySelector("#totalQuantity").innerHTML = quantity
    document.querySelector("#totalPrice").innerHTML = totalPrice
}

const calculAndDisplayTotalPrice = (cartProductArray) => {
    let totalPrice = 0
    let quantity = 0
    cartProductArray.forEach(product => {
        totalPrice += product.price * product.quantity
        quantity += product.quantity
    })
    displayTotalPrice(totalPrice, quantity)
}

const sortArrayById = (cartProductArray) => {
  cartProductArray.sort((a,z)=> a.id.localeCompare(z.id))
}

const createArticleHtmlElement = (product) => {
    document.querySelector("#cart__items")
            .insertAdjacentHTML('beforeend',
            `<article class="cart__item" data-id="${product.ID}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>`)
}

const addItemToCartProductArray = async (product, cartProductArray) => {
    const productData = await retrieveProductData(product.id)
    const productDetails = {
        id: product.id,
        color: product.color,
        quantity: parseFloat(product.quantity),
        name: productData.name,
        imageUrl: productData.imageUrl,
        altTxt: productData.altTxt,
        price: productData.price
    }
    cartProductArray.push(productDetails)
}

const cartPage = async () => {
    const cartProductArray = []
    for(let i = 0; i < localStorage.length; i++){
        const itemInLocalStorage = JSON.parse(localStorage.getItem(i))
        await addItemToCartProductArray(itemInLocalStorage, cartProductArray)
    }
    sortArrayById(cartProductArray)
    cartProductArray.forEach(product => createArticleHtmlElement(product))
    calculAndDisplayTotalPrice(cartProductArray)
}

cartPage()