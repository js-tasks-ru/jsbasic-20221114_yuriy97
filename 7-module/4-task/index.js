import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {  
  #steps = 0;
  #value = 0;
  #elem = null;
  
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#elem = createElement(this.#template());
    this.#thumb.addEventListener('pointerdown', this.#onPointerDown);
    this.#elem.addEventListener('click', this.#onSliderClick);
    this.#thumb.ondragstart = (event) => event.preventDefault();
    this.#setCoords(value,value / (steps - 1) * 100);
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
      str += `<span data-counter = ${i}></span>` ; 
    }
    str +=`</div>
          </div>`
    return str;
  }

  get elem(){
    return this.#elem;
  }

  get #thumb(){
    return this.elem.querySelector('.slider__thumb');

  }

  get value(){
    return this.#value;
  }

  #onPointerDown = (event) =>{

    document.addEventListener('pointermove',this.#onPointerMove);
    document.addEventListener('pointerup',this.#onPointerUp,{once:true});
  }

  #onPointerMove = (event) =>{

    this.elem.classList.add('slider_dragging');
    let leftPoint = event.clientX - this.elem.getBoundingClientRect().left;
    let leftPointRelative = leftPoint / this.elem.offsetWidth;

    if (leftPointRelative < 0) {
      leftPointRelative = 0;
    }
    
    if (leftPointRelative > 1) {
      leftPointRelative = 1;
    }
    
    let sliderValue = Math.round(leftPointRelative *(this.#steps - 1));
    let sliderValuePercents = leftPointRelative*100; 

    this.#setCoords(sliderValue, sliderValuePercents);
  }

  #onPointerUp = () =>{
    
    const pointerUpEvent = new CustomEvent('slider-change', {
      detail: Number(this.elem.querySelector('.slider__step-active').dataset.counter),
      bubbles: true
    });
    this.elem.dispatchEvent(pointerUpEvent);
    
    let sliderValue = this.elem.querySelector('.slider__step-active').dataset.counter;
    let sliderValuePercents = sliderValue / (this.#steps - 1) * 100;
    this.#setCoords(sliderValue, sliderValuePercents);
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove',this.#onPointerMove);
    
  }
  #onSliderClick = (event) =>{
  
    let leftPoint = event.clientX - this.elem.getBoundingClientRect().left;

    let sliderValue = Math.round(leftPoint / this.elem.offsetWidth *(this.#steps - 1));
    let sliderValuePercents = sliderValue / (this.#steps - 1) * 100;

    this.#setCoords(sliderValue,sliderValuePercents);

    const sliderClickEvent = new CustomEvent('slider-change', {
      detail: sliderValue,
      bubbles: true
    });
    
    this.elem.dispatchEvent(sliderClickEvent);
  }

  #setCoords(sliderValue, sliderValuePercents){

    let sliderProgressElement = this.elem.querySelector('.slider__progress');
    let sliderValueElement = this.elem.querySelector('.slider__value');

    this.#thumb.style.left = `${sliderValuePercents}%`;
    sliderProgressElement.style.width = `${sliderValuePercents}%`;
    sliderValueElement.innerHTML = sliderValue;

    if (this.elem.querySelector('.slider__step-active'))
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelector(`[data-counter = "${sliderValue}"]`).classList.add('slider__step-active');

  }
}
