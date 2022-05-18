const errorManangement = (error) => {
    const syntaxError = new RegExp('Syntax')
    const serverError = new RegExp('Database')
    const wrongProductId = new RegExp('Product')
    const insufficientData = new RegExp('Bad Request')

    console.error(error)

    if(syntaxError.test(error)){
        alert("Oups, une erreur sauvage est apparue !\nMerci de recharger la page.")
    }
    if(serverError.test(error)){
        alert("Oula, il y a une erreur sur notre serveur...\nMerci de retenter votre chance plus tard.")
    }
    if(wrongProductId.test(error)){
        alert("Oh oh, il y a une erreur sur la marchandise\nCe Kanap n'existe plus. Essayez nos nouveaux produits !")
    }
    if(insufficientData.test(error)){
        alert("Hé, il manque une donnée ou il y a une donnée erronée\nMerci de remplir correctement le formulaire.")
    }
    else{
        alert("Aïe, quelque chose s'est mal passé...\nMerci de revenir sur le site plus tard.")
    }
}

export {errorManangement}