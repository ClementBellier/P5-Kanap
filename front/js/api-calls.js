import { errorManangement } from "./error.js"

/**
 * Ask product data to API and return them
 * @param {string} productId or empty for all products
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

export {retrieveProductData}
export {postOrderToAPI}