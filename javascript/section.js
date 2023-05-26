import {deleteCard, _imagePopup, cardsParent} from "./index.js";
import { _addLikeButton } from "./utils.js";
import {Card} from "./card.js"

export default class Section {
constructor({items, renderer}, containerSelector){
        this._items = items;
        this._container = document.querySelector(containerSelector).content;
        this._renderer = renderer
    }
 
    renderer(){
        this._items.forEach((item) =>{
        const newCard = new Card (item, this._container, false)
        this.addItem(newCard)
        })
    }

    addItem(element){
      const newCard = this._container.cloneNode(true)
      newCard.querySelector(".card__title").textContent = element.name;
      newCard.querySelector(".card__image").src = element.link;
      newCard.querySelector(".card__image").alt = element.alt
      newCard.querySelector(".card__popup-wrapper>p").textContent = element.name;
      newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
        element.link;
  
      //Add EventListener to trash can icon  
      const trashCanIcon = newCard.querySelector(".card__delete-button")
      trashCanIcon.addEventListener("click", deleteCard(newCard))
  
      //Add Like Button Functionality
      _addLikeButton(newCard)
  
      //Add Image Popup
      _imagePopup(newCard)
  
     //return and create card 
     //Separate initial cards from new cards to that they appear first, instead of last (assignment requirement)

    if (this.isNew) {return cardsParent.prepend(newCard)} else {return cardsParent.append(newCard)};
    }    
}