import { readInput } from "./productPage-addToCart.js"
import { postOrderToAPI } from "./api-calls.js"

const cartInputsNames = ["firstName","lastName","address","city","email"]

const cartErrorMessages = {
    firstName: "<strong>Le prénom</strong> ne doit <strong>pas</strong> contenir de <strong>chiffres</strong> ni de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    lastName: "<strong>Le nom</strong> ne doit <strong>pas</strong> contenir de <strong>chiffres</strong> ni de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    address: "<strong>L'adresse</strong> ne doit <strong>pas</strong> contenir de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong>  ",
    city: "<strong>La ville</strong> ne doit <strong>pas</strong> contenir de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    email: "<strong>L'email</strong> doit être dans le <strong>format</strong> suivant <strong>exemple@domaine.fr</strong>"
}

const cartEmptyMessages = {
    firstName: "<strong>Le prénom</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: Obi-Wan).",
    lastName: "<strong>Le nom</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: Kenobi).",
    address: "<strong>L'adresse</strong> est <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: 3bis, Mer de Sable).",
    city: "<strong>La ville</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: 1977 Mos Espa, Tatooine).",
    email: "<strong>L'email</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: obi-wan.kenobi@conseil-jedi.org)."
}

const formRegExp = {
    firstName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    lastName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    address: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    city: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    email: /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/,
}

const listenCartInputsForErrorMsg = () =>{
    cartInputsNames.forEach(input => {
        document.querySelector(`#${input}`).addEventListener('input', ()=>{
            if(isCorrectlyFillIn(input)){
                document.querySelector(`#${input}`).style.backgroundColor = "#FFFFFF"
                document.querySelector(`#${input}ErrorMsg`).innerHTML = ''
            }
        })
    })
}

const postOrder = async (orderBody) => {
    return await postOrderToAPI(orderBody)
}

const buildOrderBody = (cartProductArray) => {
    const firstName = readInput('#firstName')
    const lastName = readInput('#lastName')
    const address = readInput('#address')
    const city = readInput('#city')
    const email = readInput('#email')
    const productArray = []
    cartProductArray.forEach(product => productArray.push(product.id))
    const orderBody = {
        contact:{
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: productArray
    }
    return orderBody
}

const displayMessage = (input, emptyInput) => {
    document.querySelector(`#${input}`).style.backgroundColor = "#fbbcbc"
    let cartMessages
    if(emptyInput){
        cartMessages = cartEmptyMessages
    }
    else{
        cartMessages = cartErrorMessages
    }
    document.querySelector(`#${input}ErrorMsg`).innerHTML = cartMessages[input]
}

const isCorrectlyFillIn = (input) => {
    const value = readInput(`#${input}`)
    const emptyInput = value.length === 0
    if(emptyInput){
        displayMessage(input, emptyInput)
    }
    const regExp = formRegExp[input]
    if(!regExp.test(value)){
        displayMessage(input, emptyInput)
        return false
    }
    return true
}

const checkInputsCorrectlyFillIn = () => {
    if(cartInputsNames.every(input => isCorrectlyFillIn(input)))
    {
        return true
    }
    return false
}

const order = async (cartProductArray) => {
    if(checkInputsCorrectlyFillIn()){
        const orderBody = buildOrderBody(cartProductArray)
        const orderId = await postOrder(orderBody)
        const confirmationUrl = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${orderId}`
        document.location.href = confirmationUrl
    }
}

const listenOrderButton = (cartProductArray) => {
    document
        .querySelector("#order")
        .addEventListener('click', (e) => {
            e.preventDefault()
            order(cartProductArray)
        })
    listenCartInputsForErrorMsg()
}

export {listenOrderButton}