import { displayTooltip } from "./tooltip.js"

const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const hideErrorMessage = (parent) => {
    const errorMsg = document.querySelector(parent)
    if(errorMsg.querySelector("p")){
        errorMsg.removeChild(document.querySelector(`${parent} p`))
    }
}

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

const activateErrorMsgDisplay = (selectedProduct) => {
    if(!selectedProduct.color){
        displayErrorMessage(".item__content__settings__color","Merci de choisir une couleur.")
    }
    if(selectedProduct.quantity <= 0 || selectedProduct.quantity > 100){
        displayErrorMessage(".item__content__settings__quantity","La quantité doit être comprise entre 1 et 100.")
    }
}

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

const updateQuantityToLocalStorage = (selectedProduct, index) => {
    const itemInLocalStorage = JSON.parse(localStorage.getItem(index))
    const newItemQuantity = parseFloat(itemInLocalStorage.quantity) + parseFloat(selectedProduct.quantity)
    if(newItemQuantity <= 100){
        itemInLocalStorage.quantity = newItemQuantity
        localStorage.setItem(`${index}`, JSON.stringify(itemInLocalStorage))
        return true
    }
    if(newItemQuantity > 100){
        const quantityTooltip = "quantityErrorMsgTooltip"
        const messageErrorQuantity = `Vous ne pouvez avoir plus de <strong>100 exemplaires</strong> de ce canapé.<br>Vous en avez déjà <strong>${itemInLocalStorage.quantity}</strong> dans votre panier.`
        displayTooltip(quantityTooltip, messageErrorQuantity)
        return false
    }
    return false
}

const addSelectedProductInLocalStorage = (selectedProduct) => {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(selectedProduct))
    return true
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
        return updateQuantityToLocalStorage(selectedProduct, indexOfSelectedProductInLocalStorage)
    }
    return addSelectedProductInLocalStorage(selectedProduct)
}

const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0 && selectedProduct.quantity <= 100)){
        return true
    }
    return false
}

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
            const messageSuccessAddingToCart = `Vous avez ajouté <strong>${parseFloat(selectedProduct.quantity)} ${productData.name}</strong> de couleur <strong>${selectedProduct.color}</strong> à votre panier`
            displayTooltip(successTooltip, messageSuccessAddingToCart)
        }
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