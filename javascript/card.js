//CREATE NEWCARD CLASS
import { cardsParent, cardImagePopup} from "./constants.js";
import {deleteCard} from "../src/index.js";
import PopupWithForm from "./popupWithForm.js";
import { _addLikeButton } from "./utils.js";
import {Api} from "./api.js";

//Get my Id
const user = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
const myUser = await user.getUserId().then((data) =>{return data})


export class Card {
    constructor ({name, link, alt, likes, owner}, template, isNew, handleCardClick){
      this.name = name;
      this.link = link;
      this.alt = name;
      this.template = template;
      this.isNew = isNew;
      this._handleCardClick = handleCardClick;
      this.likes = likes;
      this._id = owner._id
    }
    
   
    createCard(){
      let newCard = this.template.cloneNode(true);
      const trashCanIcon = newCard.querySelector(".card__delete-button")

      //Add content to Card
      newCard.querySelector(".card__image").src = this.link;
      newCard.querySelector(".card__image").alt = this.alt;
      newCard.querySelector(".card__title").textContent = this.name;

  
      //Check if card belongs to user and Add EventListener to trash can icon
      if (this._id === myUser._id){
        trashCanIcon.addEventListener("click", deleteCard(newCard))
      } else {
        trashCanIcon.style.opacity = "0"
        trashCanIcon.style.pointerEvents = "none"}
      
    
  
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


