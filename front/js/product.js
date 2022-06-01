import { retrieveProductData } from "./api-calls.js"
import { errorManangement } from "./error.js"
import { listenAddToCartButton } from "./productPage-addToCart.js"

/**
 * Find product id in current URL
 * @returns {string}
 */
const retrieveProductId = () => {
    let url = new URLSearchParams(document.location.search)

    return url.get("id")
}

/**
 * Replace text in Head>Title by product name
 * @param {array} product
 */
const replacePageTitle = (product) => {
    document
        .querySelector('title')
        .innerText = product.name
}

/**
 * Create product image element with alt text
 * @param {array} product
 */
const createProductImg = (product) => {
    let img = document.createElement('img')
    img.src = product.imageUrl
    img.alt = product.altTxt
    
    document
        .querySelector('.item__img')
        .appendChild(img)
}

/**
 * Fill HTML elements with name, price and description of product
 * @param {array} product 
 */
const fillProductText = (product) => {
    document
        .querySelector('#title')
        .textContent = product.name

    document
        .querySelector('#price')
        .textContent = product.price

    document
        .querySelector('#description')
        .textContent = product.description
}

/**
 * Add colors to the select element
 * @param {array} product
 */
const addColorsForSelectElement = (product) => {
    product.colors.forEach(color => {
        let option = document.createElement('option')
        option.value = color
        option.textContent = color

        document
            .querySelector('#colors')
            .appendChild(option)
    });
}

/**
 * Display all the product details on page
 * @param { Object } product 
 */
const displayProductData = (product) => {
    replacePageTitle(product)
    createProductImg(product)
    fillProductText(product)
    addColorsForSelectElement(product)    
}

/**
 * Retrieve product data and display then
 */
const productPage = async () =>{
    const productId = retrieveProductId()
    const productData = await retrieveProductData(productId)
    displayProductData(productData)
    listenAddToCartButton(productData)
}

productPage()
