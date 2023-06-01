//CREATE NEWCARD CLASS
import { cardsParent } from "./constants.js";
import {deleteCard} from "./index.js";
import PopupWithImage from "./popupWithImage.js";
import { _addLikeButton } from "./utils.js";
 

export class Card {
    constructor ({name, link, alt}, template, isNew, handleCardClick){
      this.name = name;
      this.link = link;
      this.alt = name;
      this.template = template;
      this.isNew = isNew;
      this._handleCardClick = handleCardClick;
    }
    
   
    createCard(){
      const newCard = this.template.cloneNode(true)
      const cardPopup = new PopupWithImage(".card__image-popup")
      cardPopup.open(newCard, this)
      


  
    //   //Add EventListener to trash can icon  
      const trashCanIcon = newCard.querySelector(".card__delete-button")
      trashCanIcon.addEventListener("click", deleteCard(newCard))
    
  
    //   //Add Like Button Functionality
      _addLikeButton(newCard)
  
    //   //Add Image Popup
      this._handleCardClick(newCard)
      

  
     //return and create card 
     return newCard
    }

    //add new cards to DOM function
    setItem(element){
      cardsParent.prepend(element)
    }
  
  }

