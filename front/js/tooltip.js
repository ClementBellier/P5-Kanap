
const displayTooltip = (textToDisplay) => {
    const tooltip = document.querySelector("#tooltip")
    tooltip.innerHTML = textToDisplay
    tooltip.classList.add("active")
    window.setTimeout(() => {tooltip.classList.remove("active")}, 5000)
}

export {displayTooltip}