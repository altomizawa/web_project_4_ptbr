import Popup from "./popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super (popupSelector)
     
    }
    open(){
        console.log(this._card)
    //    this._card.classList.add("popup_active")
    }
}

