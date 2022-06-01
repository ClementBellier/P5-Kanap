import { retrieveProductsList } from "./api-calls.js"

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
 * Wait products list form API and create a card for each product
 */
const homePage = async () => {
    const productsList = await retrieveProductsList()

    productsList.forEach(product => {
        createHtmlCardForOneProduct(product)
        })
}

homePage()