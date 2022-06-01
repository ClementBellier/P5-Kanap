/**
 * Retrieve order id in URL
 * @returns {string} order id
 */
const retrieveOrderId = () => {
    const url = new URLSearchParams(document.location.search)

    return url.get("orderId")
}

/**
 * Retrieve Order id and display it
 * or display error message
 */
const confirmationPage = () => {
    const orderId = retrieveOrderId()
    console.log(orderId)
    if(orderId !== 'undefined' && orderId !== 'null' && orderId.length>0){
        document.querySelector("#orderId").innerHTML = orderId
        localStorage.clear()
    }
    else{
        document.querySelector(".confirmation").innerHTML = `<p><strong>Mince ! Il y a eu une erreur.</strong><br>Veuillez nous contacter au 01 23 45 67 89<br>ou par mail à <a href="mailto:support@name.com">support@name.com</a></p>`
    }
}

confirmationPage()