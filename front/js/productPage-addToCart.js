const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const colorAndQuantityAreFillIn = (selectedProduct) => {
    if(selectedProduct.color && (selectedProduct.quantity > 0)){
        return true
    }
    alert("Il manque une donnée")
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
    console.log("ajouté")
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