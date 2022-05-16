const readInput = (htmlElement) => {
    return document.querySelector(htmlElement).value
}

const colorAndQuantityAreFillIn = (chosenProduct) => {
    if(chosenProduct.color && (chosenProduct.quantity > 0)){
        return true
    }
    alert("Il manque une donnée")
}

const chosenProductIsInLocalStorage = (chosenProduct) => {
    for(let i=0; i < localStorage.length; i++){
        let kanap = JSON.parse(localStorage.getItem(i))
        if(chosenProduct.id === kanap.id && chosenProduct.color === kanap.color){
            return true
        }
    }
}

const addChosenProductInLocalStorage = (chosenProduct) => {
    let chosenProductJson = JSON.stringify(chosenProduct)
    localStorage.setItem(`${localStorage.length}`,chosenProductJson)
}

const processAddToLocalStorage = (chosenProduct) => {
    if(chosenProductIsInLocalStorage(chosenProduct)){
    }
    else{        
        addChosenProductInLocalStorage(chosenProduct)
    }
}

const processAddingToCart = (productData) => {
    let chosenProduct = {
        id: productData._id,
        color: readInput('#colors'),
        quantity: readInput('#quantity')
    }
    if(colorAndQuantityAreFillIn(chosenProduct)){
        processAddToLocalStorage(chosenProduct)

        alert(`Vous avez ajouté ${chosenProduct.quantity} ${productData.name} ${chosenProduct.color} à votre panier`)
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