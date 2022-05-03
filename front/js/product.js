// Places for displaying product data
const itemImg = document.querySelector('.item__img')
const itemTitle = document.querySelector('#title')
const pageTitle = document.querySelector('title')
const itemPrice = document.querySelector('#price')
const itemDescr = document.querySelector('#description')
const colorSelect = document.querySelector('#colors')

/**
 * Find product id in current URL
 * @returns {string}
 */
const findProductId = () => {
    let url = new URLSearchParams(document.location.search)

    return url.get("id")
}

/**
 * Replace text in Head>Title by product name
 * @param {array} product
 */
const replacePageTitle = (product) => {
    pageTitle.innerText = product.name
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
    
    return img
}

/**
 * Fill element with name, price and description of product
 * @param {array} product 
 */
const fillProductText = (product) => {
    itemTitle.textContent = product.name
    itemPrice.textContent = product.price
    itemDescr.textContent = product.description
}

/**
 * Add colors to the select element
 * @param {array} product
 */
const addColors = (product) => {
    product.colors.forEach(color => {
        let option = document.createElement('option')
        option.value = color
        option.textContent = color
        colorSelect.appendChild(option)
    });
}

/**
 * Ask product data to API and display then on HTML
 */

fetch('http://localhost:3000/api/products/'+findProductId())
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(value){
        replacePageTitle(value)
        itemImg.appendChild(createProductImg(value))
        fillProductText(value)
        addColors(value)
    })
    .catch(function(err){
        alert(err)
    })
