function toggleText() {
  let elem = document.querySelector('.toggle-text-button');
  elem.onclick = function(){
    text.hasAttribute("hidden") ? text.removeAttribute("hidden") : text.setAttribute("hidden", "true");
  }  
}
