import Popup from './popup.js'

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitCallback){
        super(popupSelector)
        this._formSubmitCallback = formSubmitCallback;
        this._submitButton = this._popup.querySelector("button")
        this._form = this._popup.querySelector('form');
        
    }

    //Methos do Open Popup
    open(){
        this._popup.classList.add("popup_active");
        this.setEventListeners();
    }

     //Method to Close Popup
    close(){
        this._popup.classList.remove("popup_active");
        this._form.reset();
    }

    _getInputValues(){
        this._inputValues = {};
        const inputs = this._form.querySelectorAll("input")
        inputs.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues
    }

    //Method to Set all Event Listeners for Popup 
    setEventListeners(){ 
        //create closeButton for card and Add Event Listener
        const closeButtonEl = this._popup.querySelector(".popup__close-button");
        closeButtonEl.addEventListener("click", () => {
            this.close();
        })

        //add Esc To Close Event Listener
        document.addEventListener("keydown", (evt) =>{
            this._handleEscClose(evt)
        });

        //close popup if clicked outside popup area
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        })

        //Prevent default submit button and return Input values into an Object
        this._submitButton.addEventListener("click", (evt) => {
            //evt.preventDefault();
            //this.close()
        })
    };
}