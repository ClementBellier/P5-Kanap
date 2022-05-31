const retrieveProductData = async (productId) =>
        fetch(`http://localhost:3000/api/products/${productId}`)
        .then(res => res.json())
        .then(data => data)
        .catch(error =>errorManangement(error));

const postOrderToAPI = async (orderBody) =>
        fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { 
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json' 
        },
                body: JSON.stringify(orderBody)
        });

export {retrieveProductData}
export {postOrderToAPI}