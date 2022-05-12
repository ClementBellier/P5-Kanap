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
 * @returns {HTMLElement}
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
 * Ask product data to API and return them
 * @returns { Object }
 */
const retrieveProductData = async () => fetch('http://localhost:3000/api/products/'+retrieveProductId())
        .then(res => res.json())
        .then(data => data)
        .catch(err => alert(err))

/**
 * Retrieve product data and display then
 */
const productPage = async () =>{
    const productData = await retrieveProductData()
    displayProductData(productData)
}

productPage()