import {Card} from "./card.js";
import { profileEditButton, newCardButton, popupProfile, popupAddCard, popupIn, closePopup, clickOutsideToClose, escToClose} from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./popup.js"
import Section from "./section.js"
import PopupWithImage from "./popupWithImage.js";

const teste  = new Popup (".popup")
teste.open()


//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE INITIAL CARDS OBJECT
let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    alt: "Foto da Vale de Yosemite"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    alt: "Foto do Lago Louise"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    alt: "Foto das Montanhas Carecas"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    alt: "Foto de Latemar"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    alt: "Foto do Parque Nacional de Vanoise"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    alt: "Foto do Lago di Braies"
  },
];

export const cardsParent = document.querySelector(".cards");
export const cardTemplate = document.querySelector(".card-template").content;



//CREATE ALL CARDS
(function createAllCards() {
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link, item.alt, cardTemplate, false)
    newCard.createCard()
  })
})();



//SAVE PROFILE BUTTON FUNCTION
const saveProfile = (popup) => {
  const saveProfileButton = popup.querySelector("button");
  const inputName = popup.querySelector(".popup__input_name");
  const inputProfession = popup.querySelector(".popup__input_profession")
  const profileName = document.querySelector(".profile__name");
  const profileProfession = document.querySelector(".profile__title");
  //Update Profile
  saveProfileButton.addEventListener("click", () => {
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup(popup);
  });
};

//ADD EVENT LISTENER TO PROFILE BUTTON
profileEditButton.addEventListener("click", () => {
  popupIn(popupProfile);
  //create saveButton for card
  saveProfile(popupProfile);
  const saveProfileButton = popupProfile.querySelector("button")
  saveProfileButton.disabled = true
  saveProfileButton.classList.add("popup__submit-button_inactive")
});


//ADD EVENT LISTENER TO ADD NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  popupIn(popupAddCard);
  createCard(popupAddCard);
  const addNewCardbutton = popupAddCard.querySelector("button")
  addNewCardbutton.disabled = true
  addNewCardbutton.classList.add("popup__submit-button_inactive")
});

//ADD IMAGE POPUP FUNCTION TO CARD
function addImagePopupFunctionToCard(card){
  imagePopup(card)
}

//CREATE CARD BUTTON FUNCTION
const createCard = (popup) => {
  const createCardButton = popup.querySelector("button");
  const inputTitle = popup.querySelector(".popup__input_card-title")
  const inputLink = popup.querySelector(".popup__input_card-link")
  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);
  //
  function updateCardAndClose() {
    const newCard = new Card(inputTitle.value, inputLink.value, inputLink.alt, cardTemplate, true)
    newCard.createCard()
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
const forms = document.querySelectorAll(".popup__card")

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
