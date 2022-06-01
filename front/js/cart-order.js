import { readInput } from "./productPage-addToCart.js"
import { postOrderToAPI } from "./api-calls.js"

/**
 * Inputs names
 */
const CART_INPUTS_NAMES = ["firstName","lastName","address","city","email"]

/**
 * Error Messages for inputs
 */
const CART_ERROR_MESSAGES = {
    firstName: "<strong>Le prénom</strong> ne doit <strong>pas</strong> contenir de <strong>chiffres</strong> ni de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    lastName: "<strong>Le nom</strong> ne doit <strong>pas</strong> contenir de <strong>chiffres</strong> ni de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    address: "<strong>L'adresse</strong> ne doit <strong>pas</strong> contenir de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong>  ",
    city: "<strong>La ville</strong> ne doit <strong>pas</strong> contenir de <strong>caractères spéciaux</strong> sauf <strong>' . , -</strong> ",
    email: "<strong>L'email</strong> doit être dans le <strong>format</strong> suivant <strong>exemple@domaine.fr</strong>"
}
/**
 * Empty messages for inputs
 */
const CART_EMPTY_MESSAGES = {
    firstName: "<strong>Le prénom</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: Obi-Wan).",
    lastName: "<strong>Le nom</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: Kenobi).",
    address: "<strong>L'adresse</strong> est <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: 3bis, Mer de Sable).",
    city: "<strong>La ville</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: 1977 Mos Espa, Tatooine).",
    email: "<strong>L'email</strong> est un <strong>champ obligatoire</strong>. Veuillez le renseigner (ex: obi-wan.kenobi@conseil-jedi.org)."
}

/**
 * Regular Expressions for inputs
 */
const FORM_REGEXP = {
    firstName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    lastName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    address: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    city: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    email: /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/,
}

/**
 * Listen to inputs and test if is correctly fill in
 */
const listenCartInputsForErrorMsg = () =>{
    CART_INPUTS_NAMES.forEach(input => {
        document.querySelector(`#${input}`).addEventListener('input', ()=>{
            if(isCorrectlyFillIn(input)){
                document.querySelector(`#${input}`).style.backgroundColor = "#FFFFFF"
                document.querySelector(`#${input}ErrorMsg`).innerHTML = ''
            }
        })
    })
}

/**
 * Post orderbody to API
 * @param {object} orderBody 
 * @returns {string} order id
 */
const postOrder = async (orderBody) => {
    return await postOrderToAPI(orderBody)
}

/**
 * Retrieve inputs values, products id and build order body
 * @param {array} cartProductArray 
 * @returns {object} body for post to API
 */
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

/**
 * display error or empty message for input
 * @param {string} input name
 * @param {boolean} isEmpty 
 */
const displayMessage = (input, isEmpty) => {
    document.querySelector(`#${input}`).style.backgroundColor = "#fbbcbc"
    let cartMessages
    if(isEmpty){
        cartMessages = CART_EMPTY_MESSAGES
    }
    else{
        cartMessages = CART_ERROR_MESSAGES
    }
    document.querySelector(`#${input}ErrorMsg`).innerHTML = cartMessages[input]
}

/**
 * Test if input is correctly fill in or empty
 * and display corresponding message
 * @param {string} input 
 * @returns {boolean}
 */
const isCorrectlyFillIn = (input) => {
    const value = readInput(`#${input}`)
    const isEmpty = value.length === 0
    if(isEmpty){
        displayMessage(input, isEmpty)
        return false
    }
    const regExp = FORM_REGEXP[input]
    if(!regExp.test(value)){
        displayMessage(input, isEmpty)
        return false
    }
    return true
}

/**
 * Test if all inputs are correctly fill in
 * @returns {boolean}
 */
const checkInputsCorrectlyFillIn = () => {
    if(CART_INPUTS_NAMES.every(input => isCorrectlyFillIn(input)))
    {
        return true
    }
    return false
}

/**
 * If all inputs are correctly fill in,
 * build and post order
 * and redirects to confirmation page
 * @param {array} cartProductArray 
 */
const order = async (cartProductArray) => {
    if(checkInputsCorrectlyFillIn()){
        const orderBody = buildOrderBody(cartProductArray)
        const orderId = await postOrder(orderBody)
        const confirmationUrl = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${orderId}`
        document.location.href = confirmationUrl
    }
}

/**
 * Listen to order button or inputs
 * @param {array} cartProductArray 
 */
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