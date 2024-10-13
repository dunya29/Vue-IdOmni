//enable scroll
export function enableScroll() {
    if (document.querySelectorAll(".fixed-block")) {
        document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
    }
    document.body.style.paddingRight = '0px'
    document.body.classList.remove("noscroll")
  }
//disable scroll
export function disableScroll() {
    let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
    if (document.querySelectorAll(".fixed-block")) {
        document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
    }
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("noscroll");
}