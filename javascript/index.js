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

const cardsParent = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card-template").content;

//CREATE ALL CARDS
// initialCards.forEach((item, index)=>{

function createCardElement(cardData) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(".card__title").textContent = cardData.name;
  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__image").alt = cardData.alt
  newCard.querySelector(".card__popup-wrapper>p").textContent = cardData.name;
  newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
    cardData.link;
    addLikeButton(newCard)
  return newCard;
}

initialCards.forEach((item) => {
  const newCard = createCardElement(item);
  cardsParent.append(newCard);
  deleteCard()
});

//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup__profile");
const popupAddCard = document.querySelector(".popup__add-card");

const popupIn = (popup) => {
  popup.classList.add("popup_active");
  //reset form
  const form = popup.querySelector("form")
  form.reset();

  
  //disable button
  const button = popup.querySelector("button")
  disableButton(popup)

  //clickoutside to close eventlistener
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
  window.removeEventListener("keydown", escToClose);
};

//CLICK OUTSIDE TO CLOSE FUNCTION
const clickOutsideToClose = (popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup)
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
  popupIn(popupProfile);
  //create saveButton for card
  saveProfile(popupProfile);
});

//ADD EVENT LISTENER TO ADD NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  popupIn(popupAddCard);
  createCard(popupAddCard);
});

//SAVE PROFILE BUTTON FUNCTION
const saveProfile = (popup) => {
  const saveProfileButton = popup.querySelector("button");
  const inputs = popup.querySelectorAll("input");
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

//CREATE CARD BUTTON FUNCTION
const createCard = (popup) => {
  const createCardButton = popup.querySelector("button");
  const inputs = popup.querySelectorAll("input");
  const inputTitle = popup.querySelector(".popup__input_card-title")
  const inputLink = popup.querySelector(".popup__input_card-link")
  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);
  //
  function updateCardAndClose() {
    const cardAddedObj = {
      name: `${inputTitle.value}`,
      link: `${inputLink.value}`,
    };
    addNewCard(cardAddedObj);
    createCardButton.removeEventListener("click", updateCardAndClose);
    closePopup(popup);
    imagePopup2()
  }
};

//

//CREATE NEW CARD FUNCTION
function addNewCard(cardAddedObj) {
  initialCards.unshift(cardAddedObj);
  const cardAdded = cardTemplate.cloneNode(true);
  cardAdded.querySelector(".card__title").textContent = cardAddedObj.name;
  cardAdded.querySelector(".card__image").src = cardAddedObj.link;
  cardAdded.querySelector(".card__popup-wrapper>p").textContent = cardAddedObj.name;
  cardAdded.querySelector(".card__popup-wrapper>.card__image-big").src =
  cardAddedObj.link;
  addLikeButton(cardAdded)
  cardsParent.prepend(cardAdded);
  deleteCard()
}

// ---------------LIKE BUTTON FUNCTION------------------
function addLikeButton(card){
const cardLikeButtonInactive = card.querySelector(".like-button_inactive");
const cardLikeButtonActive = card.querySelector(".like-button_active")
cardLikeButtonInactive.addEventListener("click", buttonClickLike)

function buttonClickLike() {
  cardLikeButtonInactive.classList.add("like-button_hidden")
  cardLikeButtonActive.classList.remove("like-button_hidden")
  cardLikeButtonActive.addEventListener("click", buttonClickDislike)
}

function buttonClickDislike(){
  cardLikeButtonInactive.classList.remove("like-button_hidden")
  cardLikeButtonActive.classList.add("like-button_hidden")
}
}

//-----------------DELETE CARD FUNCTION---------------------------
function deleteCard(){
let allCards = document.querySelectorAll(".card")
allCards.forEach((card) => {
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {card.remove()}
  )
})
}

//-----------------IMAGE POPUP---------------------------

imagePopup2()
function imagePopup2(){
  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    imagePopup(card)
  })
}


function imagePopup(card){
  const cardImage = card.querySelector(".card__image");
  const cardImagePopup = card.querySelector(".card__image-popup")
  const cardImageCloseBtn = card.querySelector(".card__close-button")
  
  //ADD EVENT LISTENER TO IMAGES FOR POPUP IN FUNCTION
  cardImage.addEventListener("click", imagePopupIn)
  
  //CREATE imagePopupIn FUNCTION
  function imagePopupIn() {
    cardImagePopup.classList.add("card__image-popup_active");
  }


  //CREATE imagePopupOut FUNCTION
  function imagePopupOut() {
    cardImagePopup.classList.remove("card__image-popup_active");
  }

  //ADD eventListener TO BUTTON
  cardImageCloseBtn.addEventListener("click", imagePopupOut)

}