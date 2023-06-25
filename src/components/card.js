//CREATE NEWCARD CLASS
import { thisUserInfo, cardsParent} from "./constants.js";
import {deleteCard} from "../index.js";
import { _addLikeButton} from "./utils.js";

export class Card {
    constructor ({name, link, likes, owner, _id}, template, isNew, handleCardClick){
      this.name = name;
      this.link = link;
      this.alt = name;
      this.template = template;
      this.isNew = isNew;
      this._handleCardClick = handleCardClick;
      this.likes = likes;
      this.owner = owner
      this._id = _id
    }
    
  
   
    createCard(isCardNew){
      const newCard = this.template.cloneNode(true);
      const trashCanIcon = newCard.querySelector(".card__delete-button")
      const likeButtonActive = newCard.querySelector(".like-button_active")
      const likeButtonInactive = newCard.querySelector(".like-button_inactive")


      //Add content to Card
      newCard.querySelector(".card__image").src = this.link;
      newCard.querySelector(".card__image").alt = this.alt;
      newCard.querySelector(".card__title").textContent = this.name;
      //newCard.likes = this.likes;
      newCard.querySelector(".card").id = this._id
      newCard.querySelector(".card__likes").textContent = this.likes.length

      //Check if the CARD is NEW or PULLED from server
      if (!isCardNew) {
        //If CARD is from Server, check if card belongs to user and Add EventListener to trash can icon
        if (this.owner._id === thisUserInfo._id){
        trashCanIcon.addEventListener("click", deleteCard(newCard))
      } else {
        trashCanIcon.style.opacity = "0"
        trashCanIcon.style.pointerEvents = "none"}
      } 
      else {
        trashCanIcon.addEventListener("click", deleteCard(newCard))
      }

      _addLikeButton(newCard, this)
      
      //const cardImage = newCard.querySelector(".card__image")
      this._handleCardClick(newCard)
      
      
      //return and create card 
      return newCard
    }

    handleLikeButton(isLiked){
        if(!isLiked){
          likeButtonInactive.addEventListener("click", this.likeCard)
        }
      }

     //Add handle Like Button Functionality
    likeCard(){
      // likeButtonActive.classList.remove('like-button_hidden')
      // likeButtonInactive.classList.add('like-button_hidden')
    }
    //add new cards to DOM function
    setItem(element){
      cardsParent.prepend(element)

    }
  
  }


