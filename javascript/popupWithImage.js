import Popup from "./popup.js"

export default class PopupWithImage extends Popup{
    constructor(imageSelector, altSelector){
        this.imageSelector = this._popup.querySelector(imageSelector).src;
        this.altSelector = this._popup.querySelector(altSelector).alt; 
    }
}

