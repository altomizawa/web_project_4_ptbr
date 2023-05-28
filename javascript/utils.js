//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");
//const popupProfile = document.querySelector(".popup_profile");
//const popupAddCard = document.querySelector(".popup_add-card");

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

//CLICK OUTSIDE TO CLOSE POPUP FUNCTION
const clickOutsideToClose = (popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup)
    }
  });
};

//ESC TO CLOSE POPUP FUNCTION
const escToClose = (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
};

//-----------------IMAGE POPUP ---------------------------

function _imagePopup(card){
  const cardImage = card.querySelector(".card__image");
  const cardImagePopup = card.querySelector(".card__image-popup")
  const cardImageCloseBtn = card.querySelector(".card__close-button")
  const cardImageBig = card.querySelector(".card__image-big")


  //ADD EVENT LISTENER TO IMAGES FOR POPUP IN FUNCTION
  cardImage.addEventListener("click", handleCardClick)

  function handleCardClick() {
    imagePopupIn(cardImagePopup)
    window.addEventListener("keydown", escToCloseImage)
    cardImagePopup.addEventListener("click", clickOutsideToCloseImage)

  }
}

// ---------------CARD IMAGE POPUP IN FUNCTION-------------------
const imagePopupIn = (popup) => {
  popup.classList.add("popup_active")
}

//--------------- CARD IMAGE POPUP OUT FUNCTION -------------
const imagePopupOut = (popup) => {
  popup.classList.remove("popup_active")
  window.removeEventListener("keydown", escToCloseImage)
}

// ------------ ESC TO CLOSE CARD IMAGE POPUP -------------------
const escToCloseImage = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_active")
    imagePopupOut(activePopup)    
  } 
}

//----------------CARD IMAGE CLICK OUTSIDE TO POPUP OUT FUNCTION ---------------
const clickOutsideToCloseImage = (evt) => {
  const cardImageBig = document.querySelector(".popup_active").querySelector(".card__image-big");
  const activePopup = cardImageBig.parentElement.parentElement

  if (evt.target !== cardImageBig) {
    imagePopupOut(activePopup)
  }
}


// ---------------LIKE BUTTON FUNCTION------------------
function _addLikeButton(card){
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

export {profileEditButton, newCardButton, popupIn, closePopup, clickOutsideToClose, escToClose, _imagePopup, _addLikeButton}