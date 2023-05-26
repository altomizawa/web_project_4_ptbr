export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
    }

    open(){
            this._popup.classList.add("popup_active");
            //reset form
            const form = this._popup.querySelector("form")
            this.setEventListeners();
            form.reset();
          
            //clickoutside to close eventlistener
            //clickOutsideToClose(popup);                    
    }
    //Method to Close Popup
    close(){
            this._popup.classList.remove("popup_active");
            

    }
    //Method to call Close Popup by pressing Esc
    _handleEscClose(evt){
            if (evt.key === "Escape") {
                this.close()
            }
    }
    //Method to Set all Event Listeners for Popup 
    setEventListeners(){
        //create closeButton for card and Add Event Listener
        const closeButtonEl = this._popup.querySelector(".popup__close-button");
        closeButtonEl.addEventListener("click", () => {
            this.close();
        })

        //add Esc To Close Event Listener
        window.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});

        this._popup.addEventListener("click", (evt) => {
            if (evt.target !== this._popup.querySelector("form")) {
                this.close();
            }
        })
    };
}

