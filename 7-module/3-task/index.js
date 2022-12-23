import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {  
  #steps = 0;
  #value = 0;
  #elem = null

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#elem = createElement(this.#template());
    this.#elem.addEventListener('click', this.#onSliderClick);
  }

  #template (){
    let str = `
            <div class="slider">    
              <div class="slider__thumb">
                <span class="slider__value">${this.#value}</span>
              </div>
              <div class="slider__progress"></div>
              <div class="slider__steps">`
       
    for(let i = 0; i < this.#steps; i++){ 
     if (i == this.#value){
       str += `<span class="slider__step-active" data-counter = ${i}></span>` ;
     } 
     else str += `<span data-counter = ${i}></span>` ; 
    }
    str +=`</div>
          </div>`
    return str;
  }

  get elem(){
    return this.#elem;
  }

  #onSliderClick = (event) =>{

    let sliderThumbElement = this.elem.querySelector('.slider__thumb');
    let sliderProgressElement = this.elem.querySelector('.slider__progress');
    let sliderValueElement = this.elem.querySelector('.slider__value');
    
     
    let leftPoint = event.clientX - this.elem.getBoundingClientRect().left;
    let sliderValue = Math.round(leftPoint / this.elem.offsetWidth *(this.#steps - 1));
    let sliderValuePercents = sliderValue / (this.#steps - 1) * 100;
    
    sliderThumbElement.style.left = `${sliderValuePercents}%`;
    sliderProgressElement.style.width = `${sliderValuePercents}%`;
    sliderValueElement.innerHTML = sliderValue;

    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelector(`[data-counter = "${sliderValue}"]`).classList.add('slider__step-active');

    const sliderClickEvent = new CustomEvent('slider-change', {
      detail: sliderValue,
      bubbles: true
    });
    
    this.elem.dispatchEvent(sliderClickEvent);
  }
}
