//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE INITIAL CARDS OBJECT
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
]; 

const cardsParent = document.querySelector(".cards")
const cardTemplate = document.querySelector(".card-template").content

//FOR EACH
initialCards.forEach((item)=>{
  newCard = cardTemplate.cloneNode(true)
  newCard.querySelector(".card__title").textContent = item.name
  newCard.querySelector(".card__image").src = item.link
  cardsParent.append(newCard)
})


// ---------------LIKE BUTTON FUNCTION------------------
//NAME OBJECTS (HEARTS)
let like = Array.from(document.querySelectorAll(".like-button_inactive"));
let dislike = Array.from(document.querySelectorAll(".like-button_active"));

//LIKE FUNCTION
for (let i = 0; i < like.length; i++)
like[i].addEventListener("click", function(){
    like[i].style.display="none";
    dislike[i].style.display="block"
})

//DISLIKE FUNCTION
for (let i = 0; i < like.length; i++)
dislike[i].addEventListener("click", function(){
    dislike[i].style.display="none";
    like[i].style.display="block"
})

// ---------------POPUP PROFILE - OPEN/CLOSE FUNCTION------------------
//NAME OBJECTS
let closePopupEl = document.querySelector(".popup__close-button")
let popupEl = document.querySelector(".popup")
let profileEditEl = document.querySelector(".profile__edit")


//POPUP OUT FUNCTION
closePopupEl.addEventListener("click", popupOut)
function popupOut() {
    popupEl.style.top="-140%"
}

//POPUP IN FUNCTION
profileEditEl.addEventListener("click", popupIn)
function popupIn() {
    popupEl.style.top="-20%"
    // popupNameInput[0].value = ""
    // popupNameInput[1].value = ""
}


// ---------------POPUP SAVE BUTTTON FUNCTION------------------
//NAME OBJECTS
let popupSaveButtonEl = document.querySelector(".popup__save-button");
let popupNameInput = Array.from(document.querySelectorAll(".popup__input"))
let updatedName = document.querySelector(".profile__name")
let updatedProfession = document.querySelector(".profile__title")

//SAVE BUTTON FUNCTION
popupSaveButtonEl.addEventListener("click", popupSave)

//FUNCTION SHOULD ONLY WORK IF FIELD IS NOT EMPTY
function popupSave(){
    if (!(popupNameInput[0].value=="")) {updateNameWhenNotEmpty()}
    function updateNameWhenNotEmpty(){
        updatedName.textContent = popupNameInput[0].value
    }
    if (!(popupNameInput[1].value=="")) {updateProfessionWhenNotEmpty()}
    function updateProfessionWhenNotEmpty(){
        updatedProfession.textContent = popupNameInput[1].value
    }
    popupOut();
}

