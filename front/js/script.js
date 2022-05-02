const itemsSection = document.querySelector('#items')

/**
 * Add a product item last in items section
 * @param { Array } product
 */
const addProduct = (product) => {
    itemsSection.insertAdjacentHTML("beforeend",
        '<a href="./product.html?id='+product._id+'">'+
            '<article>'+
                '<img src="'+product.imageUrl+'" alt="'+product.altTxt+'">'+
                '<h3 class="productName">'+product.name+'</h3>'+
                '<p class="productDescription">'+product.description+'</p>'+
            '</article>'+
        '</a>'
    )
}

/**
 * Ask products list to API and add them in the page
 */
fetch("http://localhost:3000/api/products/")
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(value){
        value.forEach(element => {
            addProduct(element)
        })
    })
    .catch(function(err){
        itemsSection.appendChild(document.createElement('p')).innerHTML = "Une erreur sauvage est apparue !"
    })