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
const tooltipStyleProperties = (tooltipElement) => {
    tooltipElement.style.position = "absolute"
    tooltipElement.style.boxSizing = "border-box"
    tooltipElement.style.top = "120px"
    tooltipElement.style.left = "0"
    tooltipElement.style.width = "clamp(230px, 100%, 700px)"
    tooltipElement.style.padding = "28px 28px"
    tooltipElement.style.borderRadius = "40px"
    tooltipElement.style.textAlign = "center"
    tooltipElement.style.zIndex = "10"
    tooltipElement.style.pointerEvents = "none"
    tooltipElement.style.transform = "translateY(-60px) scale(0)"
    tooltipElement.style.transition = "all 500ms ease-in-out"
}
class Tooltip {
    constructor(id, message, backgroundColor){
        this.id = id
        this.parent = ".item__content__addButton"
        this.message = message
        this.backgroundColor = backgroundColor
    }
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
    }
    tooltipAppears(){
        document.getElementById(this.id).style.transform = "translateY(0) scale(1)"
    }
    tooltipDisappears(){
        document.getElementById(this.id).style.transform = "translateY(-60px) scale(0)"
    }
    removeTooltip(){
        document.querySelector(this.parent).removeChild(document.getElementById(this.id))
    }
}

const tooltipLife = (tooltip) => {
    tooltip.createTooltip()
    window.setTimeout(()=>{tooltip.tooltipAppears()}, 500)
    window.setTimeout(()=>{tooltip.tooltipDisappears()}, 4500)
    window.setTimeout(()=>{tooltip.removeTooltip()}, 5000)
}

const displayTooltip = (idOfTooltip, textToDisplay) => {
    const success = new RegExp("success")
    const quantity = new RegExp("quantity")
    if(success.test(idOfTooltip)){
        const successTooltip = new Tooltip(idOfTooltip, textToDisplay, "var(--secondary-color)")
        tooltipLife(successTooltip)
    }
    if(quantity.test(idOfTooltip)){
        const quantityErrorTooltip = new Tooltip(idOfTooltip, textToDisplay, "#ff5f5f")
        tooltipLife(quantityErrorTooltip)
    }
}

export {displayTooltip}