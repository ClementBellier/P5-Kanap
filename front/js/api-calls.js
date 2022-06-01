import { errorManangement } from "./error.js"

/**
 * Ask products list to API and return it
 * @returns { Object } data
 */
const retrieveProductsList = async () => fetch("http://localhost:3000/api/products/")
        .then(res => res.json())
        .then(data => data)
        .catch(error =>errorManangement(error));

/**
 * Ask product data to API and return them
 * @returns { Object } product data
 */
const retrieveProductData = async (productId) =>
        fetch(`http://localhost:3000/api/products/${productId}`)
        .then(res => res.json())
        .then(data => data)
        .catch(error =>errorManangement(error));

/**
 * Post order to API and return orderId
 * @param {object} orderBody 
 * @returns {string} orderId
 */
const postOrderToAPI = async (orderBody) =>
        fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { 
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json' 
        },
                body: JSON.stringify(orderBody)
        })
        .then(res => res.json())
        .then(data => data.orderId)
        .catch(error =>errorManangement(error));

export {retrieveProductsList}
export {retrieveProductData}
export {postOrderToAPI}