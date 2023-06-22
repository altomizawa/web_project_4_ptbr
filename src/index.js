import "./styles/index.css";

import {initialCardsArray, cardsParent, cardTemplate, forms, profileName, profileProfession, profilePopup, profilePictureEditButton, cardImagePopup, deleteCardConfirmationPopup, thisUserInfo} from "../javascript/constants.js";

import {Card} from "../javascript/card.js";
import { profileEditButton, newCardButton, _addLikeButton} from "../javascript/utils.js";
import { FormValidator } from "../javascript/FormValidator.js";
import Popup from "../javascript/popup.js"
import Section from "../javascript/section.js"
import PopupWithImage from "../javascript/popupWithImage.js";
import PopupWithForm from "../javascript/popupWithForm.js";
import UserInfo from "../javascript/userInfo.js";
import {Api} from "../javascript/api.js"

//GET INITIAL CARD ARRAY FROM SERVER AND RENDER ON PAGE
function updateCardArray(){
const cardArray = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
return cardArray.fetchData().then((result)=>{
  const initialCardGrid = new Section({items: result.data, renderer: (item) => {
    const newCard = new Card(item, cardTemplate, false, (card) => {
      const cardImage = card.querySelector(".card__image")
      cardImage.addEventListener("click", () => {
          const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
          popup.open(newCard)
      })
    })
    newCard.likeCard()
  
    const cardElement = newCard.createCard()
  
    initialCardGrid.addItem(cardElement)
  
  }}, cardsParent)
  initialCardGrid.renderer()
})
}
updateCardArray()


// //-------------------------ADD ONE CARD TEST-------------------------
// // const fictionalCard = {
// //   name: "Rio de Janeiro",
// //   link: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
// //   likes: [],
// //   owner: thisUserInfo,
// //   _id: "10859d303ec3f62cc793e37b"
// // }

// class OneCard {
//   constructor({name, link, likes, owner, _id}, isCardNew, gridToAppend){
//     this.name = name;
//     this.link = link;
//     this.likes = likes; 
//     this.owner = owner; 
//     this._id = _id;
//     this.gridToAppend = gridToAppend;
//     this.isCardNew = isCardNew;

//     this.cardElement = this.createCard();
//   }
  
//   createCard() {
//     const newCard = cardTemplate.cloneNode(true)
//     const trashCanIcon = newCard.querySelector(".card__delete-button")
//     newCard.querySelector(".card__image").src = this.link;
//     newCard.querySelector(".card__image").alt = this.name;
//     newCard.querySelector(".card__title").textContent = this.name;
//     newCard.querySelector(".card").id = this._id;
//     newCard.querySelector(".card__likes").textContent = this.likes.length
    
//     //Check if the CARD is NEW or PULLED from server
//     if (!this.isCardNew) {
//       //If CARD is from Server, check if card belongs to user and Add EventListener to trash can icon
//       if (this.owner._id == thisUserInfo._id){
//       trashCanIcon.addEventListener("click", deleteCard(newCard))
//     } else {
//       trashCanIcon.style.opacity = "0"
//       trashCanIcon.style.pointerEvents = "none"}
//     } 
//     else {
//       trashCanIcon.addEventListener("click", deleteCard(newCard))
//     }

//     _addLikeButton(newCard,this)

//     //execute function to add card Click
//     handleCardClick(newCard)

//     return newCard
//   }

//   handleCardClick(card){
//     const cardImage = card.querySelector(".card__image")
//     cardImage.addEventListener("click", () => {
//       const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
//       popup.open(newCard)
//     })
    
//   }

//   render() {
//     this.gridToAppend.prepend(this.cardElement)
//   }

//   }

  
//   initialCardsArray.forEach((card) =>{
//     const newFictionalCard = new OneCard(card, false, cardsParent)
//     newFictionalCard.render()
//   })



//----------------------HANDLE CARD CLICK FUNCTION--------------------
// function handleCardClick(card) {
//   const cardImage = card.querySelector(".card__image")
//   cardImage.addEventListener("click", () => {
//       const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
//       popup.open(newCard)
//   })
// }



//---------------------------ADD ONE CARD TEST END------------------------



//UPDATE USER INFO FUNCTION


function updateUserInfo(){
  const thisUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
  const thisUserInfo = thisUser.fetchData().then((response)=>{
    const user = new UserInfo(response.data)
    user.getUserInfo()
    user.setUserInfo()})
}
updateUserInfo()

//EDIT PROFILE PICTURE BUTTON
profilePictureEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile-picture")
  profilePopup.openProfilePictureForm();

  //Add Event Listener for submit button
  profilePopup._submitButton.addEventListener("click", updateProfile)

  //UPDATE PROFILE INFO
  function updateProfile() {    
    const newUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me/avatar", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
    newUser.updateUser(profilePopup._getInputValues(), profilePopup).then(()=>{updateUserInfo()})
    profilePopup._submitButton.removeEventListener("click", updateProfile)
  }
})



//EDIT PROFILE INFO BUTTON
profileEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile")
  profilePopup.openProfileForm();

  //Add Event Listener for submit button
  profilePopup._submitButton.addEventListener("click", updateProfile)

  //UPDATE PROFILE INFO
  function updateProfile(evt) {
    const newUserInfo = new UserInfo(profilePopup._getInputValues())
    const newUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
    newUser.updateUser(newUserInfo, profilePopup)

    profilePopup._submitButton.removeEventListener("click", updateProfile)
  }
})


//NEW CARD FORM 
newCardButton.addEventListener("click", () => {
  const newCardPopup = new PopupWithForm(".popup_add-card")
  newCardPopup.openCardForm()
  newCardPopup._form.addEventListener("submit", (evt) =>{
    evt.preventDefault()

    //Send card to server
    const cardInputValues = newCardPopup._getInputValues()
    const updateCardApi = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "POST", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
    updateCardApi.addNewCard(cardInputValues.name, cardInputValues.link, newCardPopup)
    
    .then (()=>{
      console.log(cardInputValues)
      //close popup
      newCardPopup.close()
      
      //refresh card Grid
      location.reload()
    })
  })

});


//-----------------DELETE CARD FUNCTION---------------------------
export function deleteCard(cardAdded){
  const deleteButton = cardAdded.querySelector(".card__delete-button");
  const cardToDelete = deleteButton.parentElement
  const cardToDeleteId = cardToDelete.id

  deleteButton.addEventListener("click", () => {
    const cardDeleteConfirmationPopup = new Popup('.popup_delete-card-confirmation')
    const confirmationButton = cardDeleteConfirmationPopup._submitButton

    cardDeleteConfirmationPopup.open()

    confirmationButton.addEventListener("click", deleteCard)

    function deleteCard(){
      cardToDelete.remove()

      //Delete from server
      const cardToBeDeleted = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "DELETE", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
      cardToBeDeleted.removeCard(cardToDeleteId)
      cardDeleteConfirmationPopup.close()
    }
    
  })
}


//CREATE FORM VALIDATION FOR ALL FORMS

forms.forEach((form) => {
    const newForm = new FormValidator({
        formSelector: ".popup__card",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit-button",
        inactiveButtonClass: "popup__submit-button_inactive",
        inputErrorClass: "popup__input-error",
        errorClass: "popup__input-error"
    }, form)
    newForm.enableValidation()
})


