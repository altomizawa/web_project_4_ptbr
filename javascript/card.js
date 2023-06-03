//CREATE NEWCARD CLASS
import { cardsParent, cardImagePopup} from "./constants.js";
import {deleteCard} from "../src/index.js";
import PopupWithForm from "./popupWithForm.js";
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
      let newCard = this.template.cloneNode(true);

      //Add content to Card
      newCard.querySelector(".card__image").src = this.link;
      newCard.querySelector(".card__image").alt = this.alt;
      newCard.querySelector(".card__title").textContent = this.name;

  
      //Add EventListener to trash can icon  
      const trashCanIcon = newCard.querySelector(".card__delete-button")
      trashCanIcon.addEventListener("click", deleteCard(newCard))
    
  
      //Add Like Button Functionality
      _addLikeButton(newCard)
  
      //Add Image Popup
      
      //const cardImage = newCard.querySelector(".card__image")
      this._handleCardClick(newCard)
      
      //return and create card 
      return newCard
    }

    //add new cards to DOM function
    setItem(element){
      cardsParent.prepend(element)
    }
  
  }

