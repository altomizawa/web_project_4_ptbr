import Popup from './popup.js'

export default class PopupWithForm extends Popup{
    constructor(popupSelector){
        super(popupSelector)
    }

    open(){
        this._popup.classList.add("popup_active");
        const form = this._popup.querySelector("form")
        this.setEventListeners();
        console.log(this)      
}

}