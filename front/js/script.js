import { errorManangement } from "./error.js"

/**
 * Create a HTML card for 1 product at the end of items section
 * @param { Object } product
 */
const createHtmlCardForOneProduct = (product) => {
    document
        .querySelector('#items')
        .insertAdjacentHTML("beforeend",
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`
    )
}

/**
 * Ask products list to API and return it
 * @returns { Object } data
 */
const retrieveProductsList = async () => fetch("http://localhost:3000/api/products/")
    .then(res => res.json())
    .then(data => data)
    .catch(error =>errorManangement(error))


/**
 * Wait products list form API and create a card for each
 */
const homePage = async () => {
    const productsList = await retrieveProductsList()

    productsList.forEach(product => {
        createHtmlCardForOneProduct(product)
        })
}

homePage()