import { readInput } from "./productPage-addToCart.js"
import { postOrderToAPI } from "./api-calls.js"

const cartInputsNames = ["firstName","lastName","address","city","email"]

const cartErrorMessages = {
    firstName: "Le prénom ne doit pas contenir de chiffres ni de caractères spéciaux excepté ',-. ",
    lastName: "Le nom ne doit pas contenir de chiffres ni de caractères spéciaux excepté ',-. ",
    address: "L'adresse ne doit pas contenir de caractères spéciaux excepté ',-. ",
    city: "La ville ne doit pas contenir de caractères spéciaux excepté ',-. ",
    email: "L'email doit être dans le format suivant exemple@domaine.fr"
}

const cartEmptyMessages = {
    firstName: "Le prénom est un champ obligatoire. Veuillez le renseigner (ex: Obi-Wan).",
    lastName: "Le nom est un champ obligatoire. Veuillez le renseigner (ex: Kenobi).",
    address: "L'adresse est champ obligatoire. Veuillez le renseigner (ex: 3bis, Mer de Sable).",
    city: "La ville est un champ obligatoire. Veuillez le renseigner (ex: 1977 Mos Espa, Tatooine).",
    email: "L'email est un champ obligatoire. Veuillez le renseigner (ex: obi-wan.kenobi@conseil-jedi.org)."
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
                document.querySelector(`#${input}`).style.border = 'none'
                document.querySelector(`#${input}ErrorMsg`).innerHTML = ''
            }
        })
    })
}

const postOrder = (orderBody) => {
    postOrderToAPI(orderBody)
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
    document.querySelector(`#${input}`).style.border = "3px solid #fbbcbc"
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
    if(cartInputsNames.every(input => isCorrectlyFillIn(input))
      ){
          return true
      }
      return false
}

const order = (cartProductArray) => {
    if(checkInputsCorrectlyFillIn()){
        const orderBody = buildOrderBody(cartProductArray)
        postOrder(orderBody)
    }
}

const listenOrderButton = (cartProductArray) => {
    document
        .querySelector("#order")
        .addEventListener('click', (e) => {
            order(cartProductArray)
            e.preventDefault()
        })
    listenCartInputsForErrorMsg()
}

export {listenOrderButton}