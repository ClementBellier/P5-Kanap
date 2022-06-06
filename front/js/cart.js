import { retrieveProductData } from "./api-calls.js"
import { listenOrderButton } from "./cart-order.js"

/**
 * Search change product index in cartArray
 * @param {object} changeProduct 
 * @param {array} cartProductArray 
 * @returns product index in cartProductArray
 */
const findProductIndexInArray = (changeProduct, cartProductArray) => {
  for(let i = 0; i < cartProductArray.length; i++){
    const sameIds = (cartProductArray[i].id === changeProduct.id)
    const sameColor = (cartProductArray[i].color === changeProduct.color)
    if(sameIds && sameColor){
      return i
    }
  }
  return null
}

/**
 * Test if quantity is between 0 and 100
 * @param {number} quantity 
 * @returns boolean
 */
const testCorrectQuantity = (quantity) => {
  return quantity > 0 && quantity <= 100
}

/**
 * Find change product and return it in an object
 * @param {event} e 
 * @returns object {id,color,qauntity} of change product
 */
const retrieveChangeProduct = (e) => {
  const articleParent = e.target.closest('article')
  const productId = articleParent.getAttribute('data-id')
  const productColor = articleParent.getAttribute('data-color')
  const quantity = parseFloat(e.target.value)
  const changeProduct = {
    id: productId,
    color: productColor,
    quantity: quantity
  }
  return (changeProduct)
}

/**
 * Listen to quantity change,
 * check correct quantity, change totalPrice and Localstorage
 * or ignore quantity change
 * @param {array} cartProductArray 
 */
const quantityChanges = (cartProductArray) => {
  document
    .querySelectorAll('.itemQuantity')
    .forEach(input => {
      input.addEventListener('input',(e)=>{
        const haveCorrectQuantity = testCorrectQuantity(e.target.value)
        const changeProduct = retrieveChangeProduct(e)
        const arrayIndex = findProductIndexInArray(changeProduct, cartProductArray)
        if(haveCorrectQuantity){
          cartProductArray[arrayIndex].quantity = changeProduct.quantity
          calculAndDisplayTotalPrice(cartProductArray)          
          copyArrayInLocalStorage(cartProductArray)
        }
        if(!haveCorrectQuantity){
          e.target.value = cartProductArray[arrayIndex].quantity
        }
      })
    })
}

/**
 * Remove product in cartProductArray
 * @param {array} cartProductArray 
 * @param {number} arrayIndex 
 */
const deleteInArray = (cartProductArray, arrayIndex) => {
  cartProductArray.splice(arrayIndex,1)
}

/**
 * Clear Localstorage and copy cartProductArray in it
 * @param {array} cartProductArray 
 */
const copyArrayInLocalStorage = (cartProductArray) => {
  localStorage.clear()
  cartProductArray.forEach(product =>{
    const productDatasForLocalStorage = {
      id: product.id,
      color: product.color,
      quantity: product.quantity
    }
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(productDatasForLocalStorage))
  })
}

/**
 * Search and remove HTML Element of deleted product
 * @param {object} deleteProduct 
 */
const hideDeleteProductHtmlElement = (deleteProduct) => {
  document.querySelectorAll('article').forEach(article => {
    const id = article.getAttribute('data-id')
    const color = article.getAttribute('data-color')
    if(id === deleteProduct.id && color === deleteProduct.color){
      document.querySelector('#cart__items').removeChild(article)
    }
  })
}

/**
 * Listen to delete buttons
 * and remove it from cartProductArray and Localstorage
 * @param {array} cartProductArray 
 */
const deleteProduct = (cartProductArray) => {
  document
    .querySelectorAll('.deleteItem')
    .forEach(deleteButton => {
      deleteButton.addEventListener('click', (e)=>{
        const deleteProduct = retrieveChangeProduct(e)
        const arrayIndex = findProductIndexInArray(deleteProduct, cartProductArray)
        deleteInArray(cartProductArray, arrayIndex)
        copyArrayInLocalStorage(cartProductArray)
        hideDeleteProductHtmlElement(deleteProduct)
        calculAndDisplayTotalPrice(cartProductArray)
        if(cartProductArray.length === 0){
          displayEmptyCart()
        }
      })
    })
}

/**
 * Display Quantity and Total Price
 * @param {number} totalPrice 
 * @param {number} quantity 
 */
const displayTotalPrice = (totalPrice, quantity) => {
    document.querySelector("#totalQuantity").textContent = quantity
    document.querySelector("#totalPrice").textContent = totalPrice
}

/**
 * Calcul and display total price
 * @param {array} cartProductArray 
 */
const calculAndDisplayTotalPrice = (cartProductArray) => {
    let totalPrice = 0
    let quantity = 0
    cartProductArray.forEach(product => {
        totalPrice += product.price * product.quantity
        quantity += product.quantity
    })
    displayTotalPrice(totalPrice, quantity)
}

/**
 * Sort cartProductArray by Id
 * @param {array} cartProductArray 
 */
const sortArrayById = (cartProductArray) => {
  cartProductArray.sort((a,z)=> a.id.localeCompare(z.id))
}

/**
 * Create and display Product HTML Element
 * @param {object} product 
 */
const createArticleHtmlElement = (product) => {
    document.querySelector("#cart__items")
            .insertAdjacentHTML('beforeend',
            `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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

/**
 * Retrieve product data from API,
 * make object and add it in cartPorductArray
 * @param {object} product 
 * @param {array} cartProductArray 
 */
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

/**
 * Display text, quantity (0) and price (0) when cart is empty
 */
const displayEmptyCart = () => {
  const emptyCart = document.createElement("h2")
  emptyCart.style.textAlign = "center"
  emptyCart.textContent = "Votre panier est vide."
  document.querySelector("#cart__items").appendChild(emptyCart)
  displayTotalPrice(0,0)
}

/**
 * Create a sort array of product in localstorage,
 * display on page and listen for user interaction
 * or display message if cart is empty
 */
const cartPage = async () => {
    const cartProductArray = []
    if(localStorage.length !== 0){
        for(let i = 0; i < localStorage.length; i++){
          const itemInLocalStorage = JSON.parse(localStorage.getItem(i))
          await addItemToCartProductArray(itemInLocalStorage, cartProductArray)
        }
      sortArrayById(cartProductArray)
      cartProductArray.forEach(product => createArticleHtmlElement(product))
      calculAndDisplayTotalPrice(cartProductArray)

      quantityChanges(cartProductArray)
      deleteProduct(cartProductArray)

      await listenOrderButton(cartProductArray)
    }
    if(localStorage.length === 0){
      displayEmptyCart()
    }
    
}

cartPage()