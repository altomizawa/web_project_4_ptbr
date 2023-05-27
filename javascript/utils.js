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

export {profileEditButton, newCardButton, popupIn, closePopup, clickOutsideToClose, escToClose, _addLikeButton}