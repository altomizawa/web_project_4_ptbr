import Popup from "./popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super (popupSelector)
    }
    open(newCard, item){
      newCard.querySelector(".card__title").textContent = item.name;
      newCard.querySelector(".card__image").src = item.link;
      newCard.querySelector(".card__image").alt = item.alt
      newCard.querySelector(".card__popup-wrapper>p").textContent = item.name;
      newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
        item.link;
    }
}

