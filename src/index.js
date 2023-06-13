import "./styles/index.css";

import { initialCards, cardsParent, cardTemplate, forms, profileName, profileProfession, cardImagePopup } from "../javascript/constants.js";

import {Card} from "../javascript/card.js";
import { profileEditButton, newCardButton} from "../javascript/utils.js";
import { FormValidator } from "../javascript/FormValidator.js";
import Popup from "../javascript/popup.js"
import Section from "../javascript/section.js"
import PopupWithImage from "../javascript/popupWithImage.js";
import PopupWithForm from "../javascript/popupWithForm.js";
import UserInfo from "../javascript/userInfo.js";
import {Api} from "../javascript/api.js"


//------------------------CREATE INITIAL CARDS IN JS---------------------
//CREATE INITIAL ARRAY
const arr = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
arr.getInitialCards()


//CREATE ALL INITIAL CARDS
export function makeInitialCards(array){
const initialCardGrid = new Section({items: array, renderer: (item) => {
  const newCard = new Card(item, cardTemplate, false, (card) => {
    const cardImage = card.querySelector(".card__image")
    cardImage.addEventListener("click", () => {
        const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
        popup.open(newCard)
    })
  })

  const cardElement = newCard.createCard()

  initialCardGrid.addItem(cardElement)

}}, cardsParent)
initialCardGrid.renderer()
}


//GET USER INFO
const newUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
newUser.getUser()



//EDIT PROFILE BUTTON
profileEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile")
  profilePopup.open();

  //Add Event Listener for submit button
  profilePopup._submitButton.addEventListener("click", updateProfile)

  //UPDATE PROFILE INFO
  function updateProfile() {
    const updatedUser = new UserInfo(profilePopup._getInputValues())
    console.log(updatedUser._profession)
    //updatedUser.setUserInfo()
    profilePopup._submitButton.removeEventListener("click", updateProfile)
    profilePopup.close()
  }
})


//NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  const newCardPopup = new PopupWithForm(".popup_add-card")
  newCardPopup.open()
  createCard(newCardPopup);
});



//CREATE CARD BUTTON FUNCTION
const createCard = (popup) => {
  const createCardButton = popup._submitButton;

  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);

  //Update Card Grid and Close Popup
  function updateCardAndClose() {
    const newCard = new Card(popup._getInputValues(), cardTemplate, true, (card) => {
      const cardImage = card.querySelector(".card__image")
      cardImage.addEventListener("click", () => {
          const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
          popup.open(newCard)
      })
    
    });
    newCard.setItem(newCard.createCard())
    
    popup.close()
    createCardButton.removeEventListener("click", updateCardAndClose);
  }
};




//-----------------DELETE CARD FUNCTION---------------------------
export function deleteCard(cardAdded){
  const deleteButton = cardAdded.querySelector(".card__delete-button");
  const cardToDelete = deleteButton.parentElement
  deleteButton.addEventListener("click", () => {
    cardToDelete.remove()
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
