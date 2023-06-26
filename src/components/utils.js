import { Api } from "./api";

//POPUP IN FUNCTION
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");

// ---------------LIKE BUTTON FUNCTION------------------
function _addLikeButton(card, cardInfo){
    const cardLikeButtonInactive = card.querySelector(".like-button_inactive");
    const cardLikeButtonActive = card.querySelector(".like-button_active")
    const cardLikeButtonCounter = card.querySelector(".card__likes")
    

    // Check if you have liked the card
    const likedByYou = cardInfo.likes.some((like) => like._id === thisUserInfo._id);
    if(likedByYou){
      cardLikeButtonInactive.classList.add("like-button_hidden")
      cardLikeButtonActive.classList.remove("like-button_hidden")
      cardLikeButtonActive.addEventListener("click", buttonClickDislike)
    } else {
      cardLikeButtonInactive.classList.remove("like-button_hidden")
      cardLikeButtonActive.classList.add("like-button_hidden")
      cardLikeButtonInactive.addEventListener("click", buttonClickLike)
    }

    function buttonClickLike() {
      cardLikeButtonInactive.classList.add("like-button_hidden")
      cardLikeButtonActive.classList.remove("like-button_hidden")
      cardLikeButtonActive.addEventListener("click", buttonClickDislike)

      //Send like to server
      const likeApi = new Api (`https://around.nomoreparties.co/v1/web_ptbr_04/cards/likes/${cardInfo._id}`, "PUT", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
      likeApi.fetchData().then((response)=>{cardLikeButtonCounter.textContent=response.data.likes.length})
      
    }
    
    function buttonClickDislike(){
      cardLikeButtonInactive.classList.remove("like-button_hidden")
      cardLikeButtonActive.classList.add("like-button_hidden")
      cardLikeButtonInactive.addEventListener("click", buttonClickLike)

      //Send dislike to server
      const likeApi = new Api (`https://around.nomoreparties.co/v1/web_ptbr_04/cards/likes/${cardInfo._id}`, "DELETE", "f3091314-56bf-4879-8be9-facfbce522a8", "application/json")
      likeApi.fetchData().then((response)=>{cardLikeButtonCounter.textContent=response.data.likes.length})
    }
  }



export { profileEditButton, newCardButton, popups, _addLikeButton}