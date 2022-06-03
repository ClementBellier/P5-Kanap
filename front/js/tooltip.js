/**
 * Create and add styles to the arrow of the tooltip Element
 * @returns HTML Element
 */
const tooltipArrow = () => {
    const span = document.createElement('span')
    span.style.position= "absolute"
    span.style.width = "30px"
    span.style.height = "30px"
    span.style.left = "calc(50% - (30px / 2))"
    span.style.top = "-14px"
    span.style.transform = "rotate(45deg)"
    span.style.backgroundColor = "inherit"
    return span
}

/**
 * Add style properties to tooltip element
 * @param {object} tooltipElement HTML Element
 */
const tooltipStyleProperties = (tooltipElement) => {
    tooltipElement.style.position = "absolute"
    tooltipElement.style.boxSizing = "border-box"
    tooltipElement.style.top = "85px"
    tooltipElement.style.left = "50%"
    tooltipElement.style.width = "clamp(230px, 50vw, 700px)"
    tooltipElement.style.padding = "28px 28px"
    tooltipElement.style.borderRadius = "40px"
    tooltipElement.style.fontSize = "1.1rem"
    tooltipElement.style.textAlign = "center"
    tooltipElement.style.zIndex = "10"
    tooltipElement.style.pointerEvents = "none"
    tooltipElement.style.transform = "translateX(-50%) translateY(-80px) scale(0)"
    tooltipElement.style.transition = "all 500ms ease-in-out"
}

/**
 * Tooltip Class
 */
class Tooltip {
    constructor(id, parent, message, backgroundColor){
        this.id = id
        this.parent = parent
        this.message = message
        this.backgroundColor = backgroundColor
    }
    /**
     * Create and display HTML Element for tooltip
     */
    createTooltip(){
        const div = document.createElement("div")
        const parent = document.querySelector(this.parent)
        div.id = this.id
        tooltipStyleProperties(div)
        div.style.backgroundColor = this.backgroundColor
        div.innerHTML = this.message
        div.appendChild(tooltipArrow())
        parent.style.position = "relative"
        parent.appendChild(div)
        document.querySelector('#addToCart').style.pointerEvents = "none"
    }
    /**
     * Animate the tooltip Element. Make it appears and disappears
     */
    tooltipAppears(){
        document.getElementById(this.id).style.transform = "translateX(-50%) translateY(0) scale(1)"
    }
    tooltipDisappears(){
        document.getElementById(this.id).style.transform = "translateX(-50%) translateY(-80px) scale(0)"
    }
    /**
     * Remove tooltip Element of the DOM
     */
    removeTooltip(){
        document.querySelector(this.parent).removeChild(document.getElementById(this.id))
        document.querySelector('#addToCart').style.pointerEvents = "all"
    }
}

/**
 * Create, animate and remove tooltip
 * @param { instance of tooltip class } tooltip 
 */
const tooltipLife = (tooltip) => {
    tooltip.createTooltip()
    window.setTimeout(()=>{tooltip.tooltipAppears()}, 500)
    window.setTimeout(()=>{tooltip.tooltipDisappears()}, 4500)
    window.setTimeout(()=>{tooltip.removeTooltip()}, 5000)
}

/**
 * Test if it's SuccessMessage or ErrorMessage, create and display corresponding tooltip class
 * @param {string} idOfTooltip 
 * @param {string} parentOfTooltip 
 * @param {string} textToDisplay
 */
const displayTooltip = (idOfTooltip, parentOfTooltip, textToDisplay) => {
    const success = new RegExp("success")
    const error = new RegExp("error")
    if(success.test(idOfTooltip)){
        const successTooltip = new Tooltip(idOfTooltip, parentOfTooltip, textToDisplay, "var(--secondary-color)")
        tooltipLife(successTooltip)
    }
    if(error.test(idOfTooltip)){
        const quantityErrorTooltip = new Tooltip(idOfTooltip, parentOfTooltip, textToDisplay, "#ff5f5f")
        tooltipLife(quantityErrorTooltip)
    }
}

export {displayTooltip}