import Popup from "./popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super (popupSelector)
        this._closeButton = this._popup.querySelector(".card__close-button")
        this._image = this._popup.querySelector(".card__image-big")
        this.imageSelector = this._popup.src;
        this.altSelector = this._popup.alt; 
        console.log(this._image)
    }
    open(){
        this._popup.classList.add("card__image-popup_active");
        console.log(this._popup)
        //reset form
        //const form = this._popup.querySelector("form")
        //this.setEventListeners();
        //form.reset();
      
        //clickoutside to close eventlistener
        //clickOutsideToClose(popup);                    
}
}

