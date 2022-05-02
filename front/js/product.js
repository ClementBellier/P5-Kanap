// Places for displaying product data
const itemImg = document.querySelector('.item__img')
const itemTitle = document.querySelector('#title')
const itemPrice = document.querySelector('#price')
const itemDescr = document.querySelector('#description')
const colorSelect = document.querySelector('#colors')

/**
 * Take product id in current URL
 * @returns {string} product Id
 */
const findProductId = () => {
    let url = new URLSearchParams(document.location.search)
    return url.get("id")
}

/**
 * Display product image with alt text
 * @param {string} imageUrl 
 * @param {string} altTxt 
 */
const displayImg = (imageUrl, altTxt) => {
    let img = document.createElement('img')
    img.src = imageUrl
    img.alt = altTxt
    itemImg.appendChild(img)
}

/**
 * Display name, price and description of product
 * @param {sting} name 
 * @param {number} price 
 * @param {string} description 
 */
const displayText = (name, price, description) => {
    itemTitle.innerHTML = name
    itemPrice.innerHTML = price
    itemDescr.innerHTML = description
}

/**
 * Add colors to the select element
 * @param {array of string} colors 
 */
const addColors = (colors) => {
    colors.forEach(color => {
        let option = document.createElement('option')
        option.value = color
        option.innerText = color
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
        displayImg(value.imageUrl, value.altTxt)
        displayText(value.name, value.price, value.description)
        addColors(value.colors)
    })
    .catch(function(err){
        alert(err)
    })
