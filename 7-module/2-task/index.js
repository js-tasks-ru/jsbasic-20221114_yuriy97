import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem = null;

  constructor() {
    this.#elem = createElement(this.#template);
    this.#elem.addEventListener('click', this.#onButtonClick);
    document.addEventListener('keydown', this.#onEscClick,{once:true});
  }

  #template () {
    return  `<div class="modal">
                   <div class="modal__overlay"></div>  
                    <div class="modal__inner">
                      <div class="modal__header">
                        <button type="button" class="modal__close">
                           <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                        </button>  
                        <h3 class="modal__title"></h3>
                      </div>
                      <div class="modal__body"></div>
                    </div>
              </div>
               `
    }
    #onButtonClick = (event) => {
      if(!event.target.closest('button')) return;
      this.close();
    }

    #onEscClick = (event) =>{
      if(event.code == 'Escape') this.close();
    }
    open(){
      document.body.append(this.#elem);
      document.body.classList.add("is-modal-open");
    }

    setTitle(modalTitle){
        this.#elem.querySelector('.modal__title').innerHTML = modalTitle;
    }
    get #modalBody(){
      return this.#elem.querySelector('.modal__body');
    }
    setBody(node){
      this.#modalBody.innerHTML = '';
      this.#modalBody.append(node);
    }

    close(){
        document.body.classList.remove("is-modal-open");
        this.#elem.remove();
        this.#elem.removeEventListener('click', this.#onButtonClick);
    }

}
