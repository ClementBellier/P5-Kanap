const retrieveOrderId = () => {
    const url = new URLSearchParams(document.location.search)

    return url.get("orderId")
}

const confirmationPage = () => {
    const orderId = retrieveOrderId()
    document.querySelector("#orderId").innerHTML = orderId
}

confirmationPage()