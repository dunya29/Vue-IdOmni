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
// custom scroll FF
export const setScrollbarColor = () => {
    let isFirefox = typeof InstallTrigger !== 'undefined';
    const customScroll = document.querySelectorAll(".custom-scroll")
    if (isFirefox) {
      document.documentElement.style.scrollbarColor = "#000000 #ffffff"
      if (customScroll) {
        customScroll.forEach(item => { item.style.scrollbarColor = "#000000 #ffffff" })
      }
    }
}
//return scroll Position
export const scrollPos = () => {
    return window.pageYOffset || document.documentElement.scrollTop
}