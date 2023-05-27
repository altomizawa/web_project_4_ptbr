import { initialCards, cardsParent, cardTemplate, forms, profileName, profileProfession } from "./constants.js";

import {Card} from "./card.js";
import { profileEditButton, newCardButton, popupIn, closePopup, clickOutsideToClose, escToClose} from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./popup.js"
import Section from "./section.js"
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";

//------------------------CREATE INITIAL CARDS IN JS---------------------


//CREATE ALL INITIAL CARDS
const initialCardGrid = new Section({items: initialCards, renderer: (item) => {
  const newCard = new Card(item, cardTemplate, false)
  const cardElement = newCard.createCard()
  initialCardGrid.addItem(cardElement)
}}, cardsParent)

initialCardGrid.renderer()

//ADD EVENT LISTENER TO PROFILE BUTTON
profileEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile")
  profilePopup.open();

  const inputName = profilePopup._form.querySelector(".popup__input_name")
  const inputProfession = profilePopup._form.querySelector(".popup__input_profession")
  const saveProfileButton = profilePopup._form.querySelector("button");


  saveProfileButton.addEventListener("click", () =>{
    profileName.textContent = profilePopup._formSubmitCallback.name;
    profileProfession.textContent = profilePopup._formSubmitCallback.profession;
    console.log(profilePopup._getInputValues())
  })


  //console.log(inputs.querySelector(".popup__title"))
  //saveProfile(profilePopup._popup);
})

// //SAVE PROFILE BUTTON FUNCTION
// const saveProfile = (popup) => {
//   const saveProfileButton = popup.querySelector("button");
//   const inputName = popup.querySelector(".popup__input_name");
//   const inputProfession = popup.querySelector(".popup__input_profession")
  
//   //Update Profile
//   saveProfileButton.addEventListener("click", () => {
//     profileName.textContent = inputName.value;
//     profileProfession.textContent = inputProfession.value;
//     closePopup(popup);
//   });
// };



//ADD EVENT LISTENER TO ADD NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  //popupIn(popupAddCard);
  const newCardPopup = new PopupWithForm(".popup_add-card")
  newCardPopup.open()
  createCard(newCardPopup);
});



//ADD IMAGE POPUP FUNCTION TO CARD
function addImagePopupFunctionToCard(card){
  imagePopup(card)
}

//CREATE CARD BUTTON FUNCTION
const createCard = (popup) => {
  const createCardButton = popup._submitButton;
  console.log(createCardButton)
  const form = popup._form
  
  const inputs = {
    name: form.querySelector(".popup__input_card-title"),
    link: form.querySelector(".popup__input_card-link"),
    alt: form.querySelector(".popup__input_card-title")
  }

  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);
  //
  function updateCardAndClose() {
    const newCard = new Card({name:inputs.name.value, link: inputs.link.value, alt:inputs.alt.value}, cardTemplate, true);
    newCard.setItem(newCard.createCard())
    createCardButton.removeEventListener("click", updateCardAndClose);
    closePopup(popup);
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


