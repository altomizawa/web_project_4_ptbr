import "./styles/index.css";

import {apiUrl, authorization, cardsParent, cardTemplate, forms, profilePopup, profilePictureEditButton, thisUserInfo} from "./components/constants.js";

import {Card} from "../src/components/card.js";
import { profileEditButton, newCardButton} from "../src/components/utils.js";
import { FormValidator } from "../src/components/FormValidator.js";
import Popup from "../src/components/popup.js"
import Section from "../src/components/section.js"
import PopupWithImage from "../src/components/popupWithImage";
import PopupWithForm from "../src/components/popupWithForm.js";
import UserInfo from "../src/components/userInfo.js";
import {Api} from "../src/components/api.js"

//console.log(apiUrl, authorization)
// console.log(authorization)

// fetch("https://around.nomoreparties.co/v1/web_ptbr_04/user/me")

// const newClient = new Api(apiUrl)
// newClient.getUser(authorization).then(res => {console.log(res.json())})

fetch(`${apiUrl}/users/me`, {
  method: "GET",
  headers: {
    authorization: authorization,
    "Content-Type": "application/json"
  }
}).then(res => res.json())


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
})


