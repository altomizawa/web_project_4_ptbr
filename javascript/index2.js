//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE INITIAL CARDS OBJECT
let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsParent = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card-template").content;

//CREATE ALL CARDS
// initialCards.forEach((item, index)=>{

function createCardElement(cardData) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(".card__title").textContent = cardData.name;
  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__popup-wrapper>p").textContent = cardData.name;
  newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
    cardData.link;
  return newCard;
}

initialCards.forEach((item) => {
  const newCard = createCardElement(item);
  cardsParent.append(newCard);
});

//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");
const profileIndex = 0;
const newCardIndex = 1;

const popupIn = (popup) => {
  popup.classList.add("popup_active");
  disableButton(popup);
  clickOutsideToClose(popup);
  window.addEventListener("keydown", escToClose);
  //create closeButton for card
  const closeButtonEl = popup.querySelector(".popup__close-button");
  closeButtonEl.addEventListener("click", () => {
    closePopup(popup);
  });
};

//CLOSE POPUP FUNCTION
const closePopup = (popup) => {
  popup.classList.remove("popup_active");
};

//CLICK OUTSIDE TO CLOSE FUNCTION
const clickOutsideToClose = (popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
};

//ESC TO CLOSE FUNCTION
const escToClose = (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
};

//ADD EVENT LISTENER TO PROFILE BUTTON
profileEditButton.addEventListener("click", () => {
  popupIn(popups[profileIndex]);
});

//ADD EVENT LISTENER TO ADD NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  popupIn(popups[newCardIndex]);
});
