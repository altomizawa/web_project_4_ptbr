import { initialCards, cardsParent, cardTemplate, forms, profileName, profileProfession } from "./constants.js";

import {Card} from "./card.js";
import { profileEditButton, newCardButton, popupIn, closePopup, clickOutsideToClose, escToClose} from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./popup.js"
import Section from "./section.js"
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js"

//------------------------CREATE INITIAL CARDS IN JS---------------------


//CREATE ALL INITIAL CARDS
const initialCardGrid = new Section({items: initialCards, renderer: (item) => {
  const newCard = new Card(item, cardTemplate, false)
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
  //const form = popup._form

  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);

  //Update Card Grid and Close Popup
  function updateCardAndClose() {
    const newCard = new Card(popup._getInputValues(), cardTemplate, true);
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

//-----------------IMAGE POPUP---------------------------

export function _imagePopup(card){
  const cardImage = card.querySelector(".card__image");
  const cardImagePopup = card.querySelector(".card__image-popup")
  const cardImageCloseBtn = card.querySelector(".card__close-button")
  const cardImageBig = card.querySelector(".card__image-big")


  //ADD EVENT LISTENER TO IMAGES FOR POPUP IN FUNCTION
  cardImage.addEventListener("click", imagePopupIn)

  //CREATE imagePopupIn FUNCTION
  function imagePopupIn(evt) {
    cardImagePopup.classList.add("card__image-popup_active");
    window.addEventListener("keydown", escToCloseImage)
    cardImagePopup.addEventListener("click", clickOutsideToCloseImage)
  }


  //CREATE imagePopupOut FUNCTION
  function imagePopupOut() {
    cardImagePopup.classList.remove("card__image-popup_active");
  }

  //ADD eventListener TO BUTTON
  cardImageCloseBtn.addEventListener("click", imagePopupOut)


  //CREATE escToCloseImage FUNCTION
  function escToCloseImage (evt) {
    if (evt.key === "Escape"){
    imagePopupOut()
    window.removeEventListener("keydown", escToCloseImage)
    cardImagePopup.removeEventListener("click", clickOutsideToCloseImage)
  }
  }

  //CREATE clickOutsideToCloseImage FUNCTION
  function clickOutsideToCloseImage (evt) {
    if (evt.target !== cardImageBig) {
      imagePopupOut()
      window.removeEventListener("keydown", escToCloseImage)
      cardImagePopup.removeEventListener("click", clickOutsideToCloseImage)
    }
  }

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
const operator = {
  name: "Alysson",
  profession: "Lavrador"
}