import { displayTooltip } from "./tooltip.js"

/**
 * Return the value of a input
 * @param {string} htmlElement (Id or class of Input HTML Element)
 * @returns 
 */
const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
};

/**
 * Remove HTML Element of ErrorMessage if it's display
 * @param {string} parent 
 */
const hideErrorMessage = (parent) => {
    const errorMsg = document.querySelector(parent)
    if(errorMsg.querySelector("p")){
        errorMsg.removeChild(document.querySelector(`${parent} p`))
    }
}

/**
 * Create and display Error Message Element
 * @param {string} parent 
 * @param {string} errorMessage 
 */
const displayErrorMessage = (parent, errorMessage) => {
    const parentError = document.querySelector(parent)
    if(!parentError.querySelector("p")){
        const errorMsgElement = document.createElement("p")
        errorMsgElement.style.color = "#fbbcbc"
        errorMsgElement.style.marginLeft= "8px"
        errorMsgElement.style.marginTop= "6px"
        errorMsgElement.innerHTML = errorMessage
        parentError.appendChild(errorMsgElement)
    }
}


/**
 * Display ErrorMessage if color and/or quantity is missing
 * @param {object} selectedProduct 
 */
const activateErrorMsgDisplay = (selectedProduct) => {
    if(!selectedProduct.color){
        displayErrorMessage(".item__content__settings__color","Merci de choisir une couleur.")
    }
    if(selectedProduct.quantity <= 0 || selectedProduct.quantity > 100){
        displayErrorMessage(".item__content__settings__quantity","La quantité doit être comprise entre 1 et 100.")
    }
}

/**
 * Listen Inputs change and hideErrorMessage
 */
const listenInputsForHideErrorMsg = () => {
    document
        .querySelector('#colors')
        .addEventListener('input', ()=>{
            hideErrorMessage(".item__content__settings__color")
        })
    document
        .querySelector('#quantity')
        .addEventListener('input', ()=>{
            hideErrorMessage(".item__content__settings__quantity")
        })
}

/**
 * Update quantity of a product already in localstorage or display ErrorTooltip if quantity > 100
 * @param {object} selectedProduct 
 * @param {number} index 
 * @returns 
 */
const updateQuantityToLocalStorage = (selectedProduct, index) => {
    const itemInLocalStorage = JSON.parse(localStorage.getItem(index))
    const newItemQuantity = parseFloat(itemInLocalStorage.quantity) + parseFloat(selectedProduct.quantity)
    if(newItemQuantity <= 100){
        itemInLocalStorage.quantity = newItemQuantity
        localStorage.setItem(`${index}`, JSON.stringify(itemInLocalStorage))
        return true
    }
    if(newItemQuantity > 100){
        const errorTooltip = "errorMsgTooltip"
        const parentOfErrorTooltip = "#addToCart"
        const messageErrorQuantity = `Vous ne pouvez avoir plus de <strong>100 exemplaires</strong> de ce canapé.<br>Vous en avez déjà <strong>${itemInLocalStorage.quantity}</strong> dans votre panier.`
        displayTooltip(errorTooltip, parentOfErrorTooltip, messageErrorQuantity)
        return false
    }
    return false
}

/**
 * Add product in localstorage
 * @param {object} selectedProduct 
 * @returns 
 */
const addSelectedProductInLocalStorage = (selectedProduct) => {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(selectedProduct))
    return true
}

/**
 * Test if product is in localstorage, return index if true
 * @param {object} selectedProduct 
 * @returns 
 */
const isSelectedProductInLocalStorage = (selectedProduct) => {
    for(let i=0; i < localStorage.length; i++){
        const itemInLocalStorage = JSON.parse(localStorage.getItem(i))
        if(selectedProduct.id === itemInLocalStorage.id && selectedProduct.color === itemInLocalStorage.color){
            return i
        }
    }
    return null
}

/**
 * Test if product is in localstorage then call update function else add function
 * @param {object} selectedProduct 
 * @returns 
 */
const addToLocalStorage = (selectedProduct) => {
    let indexOfSelectedProductInLocalStorage = isSelectedProductInLocalStorage(selectedProduct)
    if(indexOfSelectedProductInLocalStorage !== null){
        return updateQuantityToLocalStorage(selectedProduct, indexOfSelectedProductInLocalStorage)
    }
    return addSelectedProductInLocalStorage(selectedProduct)
}

/**
 * Test if color and quantity inputs are correctly completed
 * @param {object} selectedProduct 
 * @returns 
 */
const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0 && selectedProduct.quantity <= 100)){
        return true
    }
    return false
}

/**
 * Create selectedProduct object with id, color and quantity, add it to LocalStorage and display success message or display error message
 * @param {object} productData 
 */
const addingToCart = (productData) => {
    const selectedColor = readInput('#colors')
    const selectedQuantity = readInput('#quantity')
    const selectedProduct = {
        id: productData._id,
        color: selectedColor,
        quantity: selectedQuantity
    }
    if(colorAndQuantityAreFillIn(selectedProduct)){
        if(addToLocalStorage(selectedProduct)){
            const successTooltip = "successMsgTooltip"
            const parentOfSuccessTooltip = "#addToCart"
            const messageSuccessAddingToCart = `Vous avez ajouté <strong>${parseFloat(selectedProduct.quantity)} ${productData.name}</strong> de couleur <strong>${selectedProduct.color}</strong> à votre panier`
            displayTooltip(successTooltip, parentOfSuccessTooltip, messageSuccessAddingToCart)
        }
    }
    else{
        activateErrorMsgDisplay(selectedProduct)
    }
}

/**
 * Listen action in cart button then call adding function
 * @param {object} productData 
 */
const listenAddToCartButton = (productData) => {
    document
        .querySelector('#addToCart')
        .addEventListener('click', () => {
            addingToCart(productData)
    })
    listenInputsForHideErrorMsg()
}

export {listenAddToCartButton}
export {readInput}