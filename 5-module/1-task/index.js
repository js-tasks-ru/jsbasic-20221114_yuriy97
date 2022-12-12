function hideSelf() {
  let elem = document.querySelector('.hide-self-button');
  elem.onclick = function(){
    elem.setAttribute("hidden", "true");
  }
}
