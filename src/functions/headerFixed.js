import { scrollPos } from "./scroll"

const header = document.querySelector(".header")
//fixed header
export const fixedHeader = () => {
    let lastScroll = scrollPos()
    window.addEventListener("scroll", () => {
      if (scrollPos() > 1) {
          header.classList.add("scroll")
          if ((scrollPos() > lastScroll && scrollPos() > 150 && !header.classList.contains("unshow"))) {
              header.classList.add("unshow")
          } else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
              header.classList.remove("unshow")
          }
      } else {
          header.classList.remove("scroll")
          header.classList.remove("unshow")
      }
      lastScroll = scrollPos()
    })
}