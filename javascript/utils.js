//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");

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

export { profileEditButton, newCardButton, popups, _addLikeButton}