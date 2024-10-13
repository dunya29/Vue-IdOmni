export function toggleDropdown(item){
  !item.classList.contains("open") ? openDropdown(item) : closeDropdown(item)
}
//open dropdown
export function openDropdown(item) {
    item.classList.add("open");
    item.setAttribute("aria-expanded", true);
    document.addEventListener("click", function clickOutside(e) {
      if (!item.contains(e.target)) {
        closeDropdown(item)
        document.removeEventListener('click', clickOutside);
      }
    });
}
  //close dropdonw
export function closeDropdown(item) {
    item.classList.remove("open");
    item.setAttribute("aria-expanded", false);
}
  