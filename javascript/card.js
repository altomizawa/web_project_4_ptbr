//CREATE NEWCARD CLASS
import { cardsParent } from "./constants.js";
import {deleteCard, _imagePopup} from "./index.js";
import { _addLikeButton } from "./utils.js";
 

export class Card {
    constructor ({name, link, alt}, template, isNew){
      this.name = name;
      this.link = link;
      this.alt = alt;
      this.template = template;
      this.isNew = isNew;
    }
    
   
    createCard(){
      const newCard = this.template.cloneNode(true)

      newCard.querySelector(".card__title").textContent = this.name;
      newCard.querySelector(".card__image").src = this.link;
      newCard.querySelector(".card__image").alt = this.alt
      newCard.querySelector(".card__popup-wrapper>p").textContent = this.name;
      newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
        this.link;


  
    //   //Add EventListener to trash can icon  
      const trashCanIcon = newCard.querySelector(".card__delete-button")
      trashCanIcon.addEventListener("click", deleteCard(newCard))
  
    //   //Add Like Button Functionality
      _addLikeButton(newCard)
  
    //   //Add Image Popup
      _imagePopup(newCard)
      

  
     //return and create card 
     return newCard
    }

    //add new cards to DOM function
    setItem(element){
      cardsParent.prepend(element)
    }
  
  }

