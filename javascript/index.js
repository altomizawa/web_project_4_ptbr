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

//CREATE NEWCARD CLASS
class NewCard {
  constructor (name, link, alt, template, isNew){
    this.name = name;
    this.link = link;
    this.alt = alt;
    this.template = template;
    this.isNew = isNew;
  }

  createCard(){
    const newCard = this.template.cloneNode(true)
    newCard.querySelector(".card__title").textContent = this.name;
    newCard.querySelector(".card__image").src = this.link;
    newCard.querySelector(".card__image").alt = this.alt
    newCard.querySelector(".card__popup-wrapper>p").textContent = this.name;
    newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
      this.link;

    //Add EventListener to trash can icon  
    const trashCanIcon = newCard.querySelector(".card__delete-button")
    trashCanIcon.addEventListener("click", deleteCard(newCard))

    //Add Like Button Functionality
     addLikeButton(newCard)

    //Add Image Popup
    imagePopup(newCard)

   //return and create card 
   if (this.isNew) {return cardsParent.prepend(newCard)} else {return cardsParent.append(newCard)};
  }

}

//CREATE ALL CARDS
(function createAllCards() {
  initialCards.forEach((item) => {
    const newCard = new NewCard(item.name, item.link, item.alt, cardTemplate, false)
    newCard.createCard()  
  })
})()


//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_profile");
const popupAddCard = document.querySelector(".popup_add-card");

const popupIn = (popup) => {
  popup.classList.add("popup_active");
  //reset form
  const form = popup.querySelector("form")
  form.reset();

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
    const newCard = new NewCard(inputTitle.value, inputLink.value, inputLink.alt, cardTemplate, true)
    newCard.createCard()
    createCardButton.removeEventListener("click", updateCardAndClose);
    closePopup(popup);
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
  deleteCard(cardAdded)
  addImagePopupFunctionToCard(cardAdded)
  cardsParent.prepend(cardAdded);
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
function deleteCard(cardAdded){
  const deleteButton = cardAdded.querySelector(".card__delete-button");
  const cardToDelete = deleteButton.parentElement
  deleteButton.addEventListener("click", () => {
    cardToDelete.remove()
  })
}

//-----------------IMAGE POPUP---------------------------

function imagePopup(card){
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



// const newCard1 = new NewCard("Vale de Yosemite", "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg", "Foto do Vale de Yosemite", cardTemplate)

// newCard1.createCard()


