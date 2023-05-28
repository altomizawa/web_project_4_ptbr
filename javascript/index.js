import { initialCards, cardsParent, cardTemplate, forms, profileName, profileProfession } from "./constants.js";

import {Card} from "./card.js";
import { profileEditButton, newCardButton, popupIn, closePopup, clickOutsideToClose, escToClose, _imagePopup} from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./popup.js"
import Section from "./section.js"
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js"

//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE ALL INITIAL CARDS
const initialCardGrid = new Section({items: initialCards, renderer: (item) => {
  const newCard = new Card(item, cardTemplate, false, (card) => {
   _imagePopup(card)
  })
  const cardElement = newCard.createCard()
  initialCardGrid.addItem(cardElement)

}}, cardsParent)

initialCardGrid.renderer()

//EDIT PROFILE BUTTON
profileEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile")
  profilePopup.open();

  //Add Event Listener for submit button
  profilePopup._submitButton.addEventListener("click", updateProfile)

  //UPDATE PROFILE INFO
  function updateProfile() {
    const updatedUser = new UserInfo(profilePopup._getInputValues())
    updatedUser.setUserInfo()
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
    const newCard = new Card(popup._getInputValues(), cardTemplate, true, (card) => {_imagePopup(card)});
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