import { Api } from "./api";

const apiUrl = "https://around.nomoreparties.co/v1/web_ptbr_04"
const authorization = "f3091314-56bf-4879-8be9-facfbce522a8"
//const thisUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
//const thisUserInfo = await(await thisUser.fetchData()).data

// const initialCards = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
// const initialCardsArray = await(await initialCards.fetchData()).data


const cardsParent = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card-template").content;
const forms = document.querySelectorAll(".popup__card")
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__title");
const profilePicture = document.querySelector(".profile__picture")
const cardImagePopup = document.querySelector(".popupwithimage")
const profilePictureEditButton = document.querySelector(".profile__picture-wrapper")
const profilePopup = document.querySelector(".popup_profile-picture")
const deleteCardConfirmationPopup = document.querySelector(".popup_delete-card-confirmation")


export {apiUrl, authorization, cardsParent, cardTemplate, forms, profileName, profileProfession, profilePicture, profilePictureEditButton, profilePopup, cardImagePopup, deleteCardConfirmationPopup}