const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const hideErrorMessage = (errorMsgId) => {
    let errorMsg = document.querySelector(errorMsgId)
    errorMsg.classList.add('hidden')
    errorMsg.setAttribute("aria-hidden", "true")
}

const displayErrorMessage = (errorMsgId) => {    
    let colorErrorMsg = document.querySelector(errorMsgId)
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

const updateQuantityToLocalStorage = (selectedProduct, itemNumber) => {
    let itemInLocalStorage = JSON.parse(localStorage.getItem(itemNumber))
    itemInLocalStorage.quantity = parseFloat(itemInLocalStorage.quantity) + parseFloat(selectedProduct.quantity)
    localStorage.setItem(`${itemNumber}`, JSON.stringify(itemInLocalStorage))
}

const addSelectedProductInLocalStorage = (selectedProduct) => {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(selectedProduct))
}

const isSelectedProductInLocalStorage = (selectedProduct) => {
    for(let i=0; i < localStorage.length; i++){
        let itemInLocalStorage = JSON.parse(localStorage.getItem(i))
        if(selectedProduct.id === itemInLocalStorage.id && selectedProduct.color === itemInLocalStorage.color){
            return i
        }
    }
    return null
}

const processAddToLocalStorage = (selectedProduct) => {
    let itemNumberOfSelectedProductInLocalStorage = isSelectedProductInLocalStorage(selectedProduct)
    if(itemNumberOfSelectedProductInLocalStorage != null){
        updateQuantityToLocalStorage(selectedProduct, itemNumberOfSelectedProductInLocalStorage)
    }
    else{
        addSelectedProductInLocalStorage(selectedProduct)
    }
}

const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0 && selectedProduct.quantity <= 100)){
        return true
    }
}

const processAddingToCart = (productData) => {
    let selectedProduct = {
        id: productData._id,
        color: readInput('#colors'),
        quantity: readInput('#quantity')
    }
    if(colorAndQuantityAreFillIn(selectedProduct)){
        processAddToLocalStorage(selectedProduct)

        alert(`Vous avez ajouté ${selectedProduct.quantity} ${productData.name} ${selectedProduct.color} à votre panier`)
    }
    else{
        activateErrorMsgDisplay(selectedProduct)
    }
}

const listenAddToCartButton = (productData) => {
    document
        .querySelector('#addToCart')
        .addEventListener('click', () => {
            processAddingToCart(productData)
    })
    listenInputsForHideErrorMsg()
}

export {listenAddToCartButton}