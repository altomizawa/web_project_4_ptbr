import "./styles/index.css";

import { thisUserInfo, initialCardsArray, cardsParent, cardTemplate, forms, profileName, profileProfession, cardImagePopup } from "../javascript/constants.js";

import {Card} from "../javascript/card.js";
import { profileEditButton, newCardButton} from "../javascript/utils.js";
import { FormValidator } from "../javascript/FormValidator.js";
import Popup from "../javascript/popup.js"
import Section from "../javascript/section.js"
import PopupWithImage from "../javascript/popupWithImage.js";
import PopupWithForm from "../javascript/popupWithForm.js";
import UserInfo from "../javascript/userInfo.js";
import {Api} from "../javascript/api.js"
import { Api2 } from "../javascript/api2";


//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE ALL INITIAL CARDS
const initialCardGrid = new Section({items: initialCardsArray, renderer: (item) => {
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


//CREATE NEW CARD
function uploadCard(cardInfo) {
  const newCard = new Card(cardInfo, cardTemplate, false, (card) => {
    const cardImage = card.querySelector(".card__image")
    cardImage.addEventListener("click", () => {
        const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
        popup.open(newCard)
    })
  })
  
  const cardElement = newCard.createCard()
  cardsParent.append(cardElement)
}

//CALL POST TO ADD CARD API
const cartaoNovo = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "POST", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")



//CALL DELETE CARD API
const cardToBeDeleted = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "DELETE", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")


//GET USER INFO

// const user = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
// user.getUser();


//UPDATE USER INFO FUNCTION
function updateUserInfo(data){
  const user = new UserInfo(data)
  user.getUserInfo()
  user.setUserInfo()
}
updateUserInfo(thisUserInfo)


//EDIT PROFILE BUTTON
profileEditButton.addEventListener("click", () =>{
  const profilePopup = new PopupWithForm (".popup_profile")
  profilePopup.open();

  //Add Event Listener for submit button
  profilePopup._submitButton.addEventListener("click", updateProfile)

  //UPDATE PROFILE INFO
  function updateProfile() {
    const newUserInfo = new UserInfo(profilePopup._getInputValues())

    const newUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "PATCH", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
   
    newUser.updateUser(newUserInfo)

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
    console.log(cardToDelete.id)
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

