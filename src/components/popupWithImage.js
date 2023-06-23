import { cardImagePopup } from "./constants.js";
import Popup from "./popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector, image, title){
        super (popupSelector)
        this.image = this._popup.querySelector(image)
        this.title = this._popup.querySelector(title);
    }
    open(item, image, title){
        
      cardImagePopup.querySelector(".popupwithimage__image-big").src = item.link
      cardImagePopup.querySelector("p").textContent = item.name
      this._popup.classList.add("popupwithimage_active")
      this.setEventListeners()
    }

    //Method to Close Popup
    close(){
        this._popup.classList.remove("popupwithimage_active");
}


    setEventListeners(){
      //create closeButton for card and Add Event Listener
      const closeButtonEl = this._popup.querySelector(".popupwithimage__close-button");
      closeButtonEl.addEventListener("click", () => {
          this.close();
      })

      //add Esc To Close Event Listener
      window.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});

      //close popup if clicked outside popup area
      this._popup.addEventListener("click", (evt) => {
          if (evt.target === this._popup) {
              this.close();
          }
      })
  };
}

