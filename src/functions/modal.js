import { disableScroll, enableScroll } from "./scroll"

//open modal
export function openModal(modal) {
    let activeModal = document.querySelector(".modal.open")
    if (activeModal) {
      activeModal.classList.remove("open")
    } else {
        disableScroll()
    }
    modal.classList.add("open")
}
//close modal
export function closeModal(modal,func = false) {
    modal.classList.remove("open")
    setTimeout(() => {
        enableScroll()
        if (func) {
            func()
        }
    }, 400);
}
export function modalOnClick(event,modal,func = false) {
    if (!modal.querySelector(".modal__content").contains(event.target) || modal.querySelector(".btn-close").contains(event.target)){
        closeModal(modal,func)
    }
}