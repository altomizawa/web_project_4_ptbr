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

// ---------------POPUP PROFILE - OPEN/CLOSE FUNCTION------------------
//NAME OBJECTS
let closePopupEl = document.querySelectorAll(".popup__close-button");
let popupEl = document.querySelectorAll(".popup");
let profileEditEl = document.querySelector(".profile__edit");
let imageEditEl = document.querySelector(".adicionar-button");

//POPUP FUNCTION - PROFILE
const profilePopupIndex = 0;
const profilePopupCloseButonIndex = 0;

//POPUP IN
profileEditEl.addEventListener("click", () => {
  popupEl[profilePopupIndex].classList.add("popup_active");
});

//POPUP OUT
closePopupEl[profilePopupCloseButonIndex].addEventListener("click", () => {
  popupEl[profilePopupIndex].classList.remove("popup_active");
});

//POPOUT OUT CLICKING ANYWHERE OUTSIDE CARD

popupEl.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      popup.classList.remove("popup_active");
    }
  });
});
// popupEl[0].addEventListener("click", (evt) => {
//   if (evt.target === popupEl[0]) {
//     popupEl[0].classList.remove("popup_active");
//   }
// });

// popupEl[1].addEventListener("click", (evt) => {
//   if (evt.target === popupEl[1]) {
//     popupEl[1].classList.remove("popup_active");
//   }
// });

//POPUP FUNCTION - CARD
const cardPopupCloseButtonIndex = 1;
const cardPopupIndex = 1;
const cardPopupTitleIndex = 0;
const cardPopupLinkIndex = 1;

//POPUP OUT - CARD
closePopupEl[cardPopupCloseButtonIndex].addEventListener("click", function () {
  popupEl[cardPopupIndex].classList.remove("popup_active");
  popupCreateInput[cardPopupTitleIndex].value = "";
  popupCreateInput[cardPopupLinkIndex].value = "";
});

//POPUP IN - CARD
imageEditEl.addEventListener("click", function () {
  popupEl[cardPopupIndex].classList.add("popup_active");
});

// ---------------POPUP SAVE BUTTTON FUNCTION------------------
//NAME OBJECTS
let popupSaveButtonEl = document.querySelector(".popup__save-button");
let popupNameInput = document.querySelectorAll(".popup__input_profile");
let updatedName = document.querySelector(".profile__name");
let updatedProfession = document.querySelector(".profile__title");

//SAVE BUTTON FUNCTION
popupSaveButtonEl.addEventListener("click", popupSave);

//FUNCTION SHOULD ONLY WORK IF FIELD IS NOT EMPTY
function popupSave() {
  if (!(popupNameInput[0].value == "")) {
    updateNameWhenNotEmpty();
  }
  function updateNameWhenNotEmpty() {
    updatedName.textContent = popupNameInput[0].value;
  }
  if (!(popupNameInput[1].value == "")) {
    updateProfessionWhenNotEmpty();
  }
  function updateProfessionWhenNotEmpty() {
    updatedProfession.textContent = popupNameInput[1].value;
  }
  popupEl[profilePopupIndex].classList.remove("popup_active");
}

// ---------------POPUP CRIAR BUTTTON FUNCTION------------------
//NAME OBJECTS
const popupCreateButtonEl = document.querySelector(".popup__criar-button");
const popupCreateInput = document.querySelectorAll(".popup__input_card");
const popupCreateInputNameIndex = 0;
const popupCreateInputLinkIndex = 1;

//CREATE NEW PHOTO CARD IF NOT INPUT NOT EMPTY
popupCreateButtonEl.addEventListener("click", createCardIfInputNotEmpty);

function createCardIfInputNotEmpty() {
  if (
    !(
      popupCreateInput[popupCreateInputNameIndex].value == "" ||
      popupCreateInput[popupCreateInputLinkIndex].value == ""
    )
  ) {
    const cardAddedObj = {
      name: `${popupCreateInput[popupCreateInputNameIndex].value}`,
      link: `${popupCreateInput[popupCreateInputLinkIndex].value}`,
    };
    popupEl[cardPopupIndex].classList.remove("popup_active");
    addNewCard(cardAddedObj);
    popupCreateInput[popupCreateInputNameIndex].value = "";
    popupCreateInput[popupCreateInputLinkIndex].value = "";
  }
}

//CREATE NEW CARD FUNCTION
function addNewCard(cardAddedObj) {
  initialCards.unshift(cardAddedObj);
  cardAdded = cardTemplate.cloneNode(true);
  cardAdded.querySelector(".card__title").textContent = cardAddedObj.name;
  cardAdded.querySelector(".card__image").src = cardAddedObj.link;
  cardsParent.prepend(cardAdded);
}

// ---------------LIKE BUTTON FUNCTION------------------
//NAME OBJECTS (HEARTS)
let like = Array.from(document.querySelectorAll(".like-button_inactive"));
let dislike = Array.from(document.querySelectorAll(".like-button_active"));

//LIKE FUNCTION
like.forEach(function (item, index) {
  item.addEventListener("click", () => {
    item.classList.add("like-button_hidden");
    dislike[index].classList.remove("like-button_hidden");
  });
  dislike[index].addEventListener("click", () => {
    dislike[index].classList.add("like-button_hidden");
    item.classList.remove("like-button_hidden");
  });
});

//-----------------DELETE CARD BUTTON---------------------------
//NAME OBJECTS
const cardDeleteButtonEl = document.querySelectorAll(".card__delete-button");
const cardEl = document.querySelectorAll(".card");
//DELETE CARD
cardDeleteButtonEl.forEach(function (item, index) {
  item.addEventListener("click", () => {
    item.parentElement.remove();
    initialCards.splice(index, 1);
  });
});

//-----------------IMAGE POPUP---------------------------
//NAME OBJECTS
const cardImageEl = document.querySelectorAll(".card__image");
const cardPopupEl = document.querySelectorAll(".card__image-popup");
const cardPopupCloseBtnEl = document.querySelectorAll(".card__close-button");

cardImageEl.forEach(function (item, index) {
  item.addEventListener("click", () => {
    cardPopupEl[index].classList.add("card__image-popup_active");
  });
});

cardPopupCloseBtnEl.forEach(function (item, index) {
  item.addEventListener("click", function () {
    cardPopupEl[index].classList.remove("card__image-popup_active");
  });
});

cardPopupEl.forEach((card) => {
  card.addEventListener("click", (evt) => {
    if (evt.target === card) {
      card.classList.remove("card__image-popup_active");
    }
  });
});
