import "./styles/index.css";

import {initialCardsArray, cardsParent, cardTemplate, forms, profileName, profileProfession, profilePopup, profilePictureEditButton, cardImagePopup, deleteCardConfirmationPopup} from "../javascript/constants.js";

import {Card} from "../javascript/card.js";
import { profileEditButton, newCardButton} from "../javascript/utils.js";
import { FormValidator } from "../javascript/FormValidator.js";
import Popup from "../javascript/popup.js"
import Section from "../javascript/section.js"
import PopupWithImage from "../javascript/popupWithImage.js";
import PopupWithForm from "../javascript/popupWithForm.js";
import UserInfo from "../javascript/userInfo.js";
import {Api} from "../javascript/api.js"
import { Api2 } from "../javascript/api2.js";


function updateCardArray(){
const cardArray = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
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

//==================TESTE INÍCIO=========================

// const userTest = {
//   _name: "João",
//   _profession: "plumber",
//   _avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
// }



// const updateUserTestePatch = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
// updateUserTestePatch.updateUser(userTest)


// const updateUserTeste = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
// updateUserTeste.fetchData().then((response)=>{console.log(response.data)})


//==================TESTE FIM=========================


//UPDATE USER INFO FUNCTION
function updateUserInfo(){
  const thisUser = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
  const thisUserInfo = thisUser.fetchData().then((response)=>{
    //console.log(response.data) //show how object should come
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
    const newUser = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/users/me/avatar", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
    newUser.updateUser(profilePopup._getInputValues()).then(()=>{updateUserInfo()})
    profilePopup._submitButton.removeEventListener("click", updateProfile)
    profilePopup.close()
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


    
    const newUser = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
   
    newUser.updateUser(newUserInfo)

    profilePopup._submitButton.removeEventListener("click", updateProfile)
    profilePopup.close()
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
    const updateCardApi = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "POST", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
    updateCardApi.addNewCard(cardInputValues.name, cardInputValues.link)
    .then (()=>{
      //close popup
      newCardPopup.close()
      //refresh card Grid
      location.reload()
    })
  })

});

// class CreateCard{
//   constructor(cardPopup){
//     this.cardPopup = cardPopup
//     this.popupForm = cardPopup._form
//     this.popupButton = cardPopup._submitButton
//     this.popupTitleInput = this.popupForm.querySelector(".popup__input_card-title")
//     this.popupLinkInput = this.popupForm.querySelector(".popup__input_card-link")

//     this.popupButton.addEventListener("click", () =>{this.submitForm()})
//   }
//   submitForm(){
//     console.log('hello')
//     this.popupForm.classList.remove("popup_active")
    
//   }
// }

//CREATE CARD BUTTON FUNCTION
// const createCard = (popup) => {
//   const createCardButton = popup._submitButton;
//   const cardTitleInput = popup._form.querySelector(".popup__input_card-title")
//   const cardLinkInput = popup._form.querySelector(".popup__input_card-link")

//   //Update Profile
//   createCardButton.addEventListener("click", updateCardAndClose);



//   //Update Card Grid and Close Popup
//   function updateCardAndClose() {
//     const newCardApi = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "POST", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")

//     newCardApi.addNewCard(cardTitleInput.value, cardLinkInput.value)
//       .then(() =>{
//         return newCardApi.fetchData();
//       })
//       .then((result) =>{console.log(result)})

//     popup.close()
//     createCardButton.removeEventListener("click", updateCardAndClose)
    
//   }
// };



//-----------------DELETE CARD FUNCTION---------------------------
export function deleteCard(cardAdded){
  const deleteButton = cardAdded.querySelector(".card__delete-button");
  const cardToDelete = deleteButton.parentElement
  const cardToDeleteId = cardToDelete.id
  const confirmationButton = deleteCardConfirmationPopup.querySelector("button")

  deleteButton.addEventListener("click", () => {
    const cardDeleteConfirmationPopup = new Popup('.popup_delete-card-confirmation')
    cardDeleteConfirmationPopup.open()
    confirmationButton.addEventListener("click", deleteCard)
    function deleteCard(){
      // cardToDelete.remove()

      // //Delete from server
      // const cardToBeDeleted = new Api2("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "DELETE", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
      // cardToBeDeleted.removeCard(cardToDeleteId)
      // cardDeleteConfirmationPopup.close()
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


