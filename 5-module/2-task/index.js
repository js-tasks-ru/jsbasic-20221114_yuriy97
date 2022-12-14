function toggleText() {
  let elem = document.querySelector('.toggle-text-button');
  elem.onclick = function(){
    text.hidden = !text.hidden
  }  
}
