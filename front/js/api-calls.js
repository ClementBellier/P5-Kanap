const retrieveProductData = async (productId) => fetch(`http://localhost:3000/api/products/${productId}`)
        .then(res => res.json())
        .then(data => data)
        .catch(error =>errorManangement(error))


export {retrieveProductData}