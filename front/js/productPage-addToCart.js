const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const hideErrorMessage = (errorMsgId) => {
    let errorMsg = document.querySelector(errorMsgId)
    errorMsg.classList.add('hidden')
    errorMsg.setAttribute("aria-hidden", "true")
}

const displayErrorMessage = (selectedProduct) => {
    
    if(!selectedProduct.color){
        let colorErrorMsg = document.querySelector("#colorErrorMsg")
        colorErrorMsg.classList.remove('hidden')
        colorErrorMsg.setAttribute("aria-hidden", "false")
    }
    if(selectedProduct.quantity <= 0 || selectedProduct.quantity > 100){
        let quantityErrorMsg = document.querySelector("#quantityErrorMsg")
        quantityErrorMsg.classList.remove('hidden')
        quantityErrorMsg.setAttribute("aria-hidden", "false")
    }
}

const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0)){
        return true
    }
    displayErrorMessage(selectedProduct)
}

const updateQuantityToLocalStorage = (selectedProduct, itemNumber) => {
    let kanap = JSON.parse(localStorage.getItem(itemNumber))
    kanap.quantity = parseFloat(kanap.quantity) + parseFloat(selectedProduct.quantity)
    localStorage.setItem(`${itemNumber}`, JSON.stringify(kanap))
}

const selectedProductIsNotInLocalStorage = (selectedProduct) => {
    for(let i=0; i < localStorage.length; i++){
        let kanap = JSON.parse(localStorage.getItem(i))
        console.log(kanap)
        console.log(selectedProduct)
        if(selectedProduct.id === kanap.id && selectedProduct.color === kanap.color){
            updateQuantityToLocalStorage(selectedProduct, i)
            return false
        }
    }    
    return true
}

const addSelectedProductInLocalStorage = (selectedProduct) => {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(selectedProduct))
}

const processAddToLocalStorage = (selectedProduct) => {
    if(selectedProductIsNotInLocalStorage(selectedProduct)){
        addSelectedProductInLocalStorage(selectedProduct)
    }
}

const processAddingToCart = (productData) => {
    let selectedProduct = {
        id: productData._id,
        color: readInput('#colors'),
        quantity: readInput('#quantity')
    }
    hideErrorMessage("#colorErrorMsg")
    hideErrorMessage("#quantityErrorMsg")
    if(colorAndQuantityAreFillIn(selectedProduct)){
        processAddToLocalStorage(selectedProduct)

        alert(`Vous avez ajouté ${selectedProduct.quantity} ${productData.name} ${selectedProduct.color} à votre panier`)
    }
}

const listenAddToCartButton = (productData) => {
    document
        .querySelector('#addToCart')
        .addEventListener('click', () => {
            processAddingToCart(productData)
    })
}

export {listenAddToCartButton}