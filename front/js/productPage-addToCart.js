import { displayTooltip } from "./tooltip.js"

const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const hideErrorMessage = (errorMsgId) => {
    const errorMsg = document.querySelector(errorMsgId)
    errorMsg.classList.add('hidden')
    errorMsg.setAttribute("aria-hidden", "true")
}

const displayErrorMessage = (errorMsgId) => {    
    const colorErrorMsg = document.querySelector(errorMsgId)
    colorErrorMsg.classList.remove('hidden')
    colorErrorMsg.setAttribute("aria-hidden", "false")
}

const activateErrorMsgDisplay = (selectedProduct) => {
    if(!selectedProduct.color){
        displayErrorMessage("#colorErrorMsg")
    }
    if(selectedProduct.quantity <= 0 || selectedProduct.quantity > 100){
        displayErrorMessage("#quantityErrorMsg")
    }
}

const listenInputsForHideErrorMsg = () => {
    document
        .querySelector('#colors')
        .addEventListener('input', ()=>{
            hideErrorMessage("#colorErrorMsg")
        })
    document
        .querySelector('#quantity')
        .addEventListener('input', ()=>{
            hideErrorMessage("#quantityErrorMsg")
        })
}

const updateQuantityToLocalStorage = (selectedProduct, index) => {
    const itemInLocalStorage = JSON.parse(localStorage.getItem(index))
    itemInLocalStorage.quantity = parseFloat(itemInLocalStorage.quantity) + parseFloat(selectedProduct.quantity)
    localStorage.setItem(`${index}`, JSON.stringify(itemInLocalStorage))
}

const addSelectedProductInLocalStorage = (selectedProduct) => {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(selectedProduct))
}

const isSelectedProductInLocalStorage = (selectedProduct) => {
    for(let i=0; i < localStorage.length; i++){
        const itemInLocalStorage = JSON.parse(localStorage.getItem(i))
        if(selectedProduct.id === itemInLocalStorage.id && selectedProduct.color === itemInLocalStorage.color){
            return i
        }
    }
    return null
}

const addToLocalStorage = (selectedProduct) => {
    let indexOfSelectedProductInLocalStorage = isSelectedProductInLocalStorage(selectedProduct)
    if(indexOfSelectedProductInLocalStorage !== null){
        updateQuantityToLocalStorage(selectedProduct, indexOfSelectedProductInLocalStorage)
    }
    else{
        addSelectedProductInLocalStorage(selectedProduct)
    }
}

const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0 && selectedProduct.quantity <= 100)){
        return true
    }
    return false
}

const addingToCart = (productData) => {
    const selectedProduct = {
        id: productData._id,
        color: readInput('#colors'),
        quantity: readInput('#quantity')
    }
    if(colorAndQuantityAreFillIn(selectedProduct)){
        addToLocalStorage(selectedProduct)

        const messageSuccessAddingToCart = `Vous avez ajouté <strong>${selectedProduct.quantity} ${productData.name}</strong> de couleur <strong>${selectedProduct.color}</strong> à votre panier`
        displayTooltip(messageSuccessAddingToCart)
    }
    else{
        activateErrorMsgDisplay(selectedProduct)
    }
}

const listenAddToCartButton = (productData) => {
    document
        .querySelector('#addToCart')
        .addEventListener('click', () => {
            addingToCart(productData)
    })
    listenInputsForHideErrorMsg()
}

export {listenAddToCartButton}