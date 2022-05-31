import { readInput } from "./productPage-addToCart.js"

const cartInputsNames = ["firstName","lastName","address","city","email"]

const cartErrorMessages = {
    firstName: "Le prénom ne doit pas contenir de chiffres ni de caractères spéciaux excepté ',-. ",
    lastName: "Le nom ne doit pas contenir de chiffres ni de caractères spéciaux excepté ',-. ",
    address: "L'adresse ne doit pas contenir de caractères spéciaux excepté ',-. ",
    city: "La ville ne doit pas contenir de caractères spéciaux excepté ',-. ",
    email: "L'email doit être dans le format suivant exemple@domaine.fr"
}
const formRegExp = {
    firstName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    lastName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    address: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    city: /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
    email: /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/,
}

const listenCartInputsForHideErrorMsg = () =>{
    cartInputsNames.forEach(input => {
        document.querySelector(`#${input}`).addEventListener('input', ()=>{
            if(isCorrectlyFillIn(input)){
                document.querySelector(`#${input}ErrorMsg`).innerHTML = ''
            }
        })
    })
}

const postOrder = (orderBody) => {
    console.log(orderBody)
}

const buildOrderBody = (cartProductArray) => {
    return cartProductArray
}
const displayErrorMessage = (input) => {
    document.querySelector(`#${input}ErrorMsg`).innerHTML = cartErrorMessages[input]
}

const isCorrectlyFillIn = (input) => {
    const value = readInput(`#${input}`)
    const regExp = formRegExp[input]
    if(!regExp.test(value)){
        displayErrorMessage(input)
        return false
    }
    return true
}

const checkInputsCorrectlyFillIn = () => {
    if(cartInputsNames.every(input => isCorrectlyFillIn[input])
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
    listenCartInputsForHideErrorMsg()
}

export {listenOrderButton}