import { Api } from "./api";

const apiUrl = "https://around.nomoreparties.co/v1/web_ptbr_04"
const authorization = "f3091314-56bf-4879-8be9-facfbce522a8"
//const thisUser = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")

// const initialCards = new Api("https://around.nomoreparties.co/v1/web_ptbr_04/cards", "GET", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
// const initialCardsArray = await(await initialCards.fetchData()).data
const thisUserInfo = {
    name: "Al Tomizawa",
    about: "Front-End Developer",
    avatar: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9uZyUytMGtvbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    cohort: "web_ptbr_04",
    _id: "10859d303ec3f62cc793e37b"
}



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


export {apiUrl, authorization, cardsParent, cardTemplate, forms, profileName, profileProfession, profilePicture, profilePictureEditButton, profilePopup, cardImagePopup, deleteCardConfirmationPopup, thisUserInfo}