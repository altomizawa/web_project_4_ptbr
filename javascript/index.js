//------------------------CREATE INITIAL CARDS IN JS---------------------

//CREATE INITIAL CARDS OBJECT
let initialCards = [
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


//CREATE ALL CARDS
initialCards.forEach((item, index)=>{
  newCard = cardTemplate.cloneNode(true)
  newCard.querySelector(".card__title").textContent = item.name
  newCard.querySelector(".card__image").src = item.link
  newCard.querySelector(".card__popup-wrapper>p").textContent = item.name
  newCard.querySelector(".card__popup-wrapper>.card__image-big").src = item.link
  cardsParent.append(newCard)
})


// ---------------POPUP PROFILE - OPEN/CLOSE FUNCTION------------------
//NAME OBJECTS
let closePopupEl = document.querySelectorAll(".popup__close-button")
let popupEl = document.querySelectorAll(".popup")
let profileEditEl = document.querySelector(".profile__edit")
let imageEditEl = document.querySelector(".adicionar-button")


//POPUP OUT FUNCTION - PROFILE
closePopupEl[0].addEventListener("click", function(){
  popupEl[0].style.top="-140%"
})

//POPUP IN FUNCTION - PROFILE
profileEditEl.addEventListener("click", function() {
  popupEl[0].style.top="-20%"
})

//POPUP OUT FUNCTION - CARD
closePopupEl[1].addEventListener("click", function(){
  popupEl[1].style.top="-140%"
})

//POPUP IN FUNCTION - CARD
imageEditEl.addEventListener("click", function(){
  popupEl[1].style.top = "-20%"
})


// ---------------POPUP SAVE BUTTTON FUNCTION------------------
//NAME OBJECTS
let popupSaveButtonEl = document.querySelector(".popup__save-button");
let popupNameInput = document.querySelectorAll(".popup__input_profile")
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
    popupEl[0].style.top="-140%";
}

// ---------------POPUP CRIAR BUTTTON FUNCTION------------------
//NAME OBJECTS
let popupCriarButtonEl = document.querySelector(".popup__criar-button")
let popupCriarInput = document.querySelectorAll(".popup__input_card")

//CREATE NEW PHOTO CARD IF NOT INPUT NOT EMPTY
popupCriarButtonEl.addEventListener("click", () =>{
  if(!(popupCriarInput[0].value=="" || popupCriarInput[1].value=="")){
  const cardAddedObj = {
    name: `${popupCriarInput[0].value}`,
    link: `${popupCriarInput[1].value}`
  }
  popupEl[1].style.top="-140%";
  addNewCard(cardAddedObj)
  popupCriarInput[0].value=""
  popupCriarInput[1].value=""
}
})

//CREATE NEW CARD FUNCTION
function addNewCard(cardAddedObj) {
initialCards.unshift(cardAddedObj)
cardAdded = cardTemplate.cloneNode(true)
cardAdded.querySelector(".card__title").textContent = cardAddedObj.name
cardAdded.querySelector(".card__image").src = cardAddedObj.link
cardsParent.prepend(cardAdded)
}

// ---------------LIKE BUTTON FUNCTION------------------
//NAME OBJECTS (HEARTS)
let like = Array.from(document.querySelectorAll(".like-button_inactive"));
let dislike = Array.from(document.querySelectorAll(".like-button_active"));

//LIKE FUNCTION
like.forEach(item => item.addEventListener("click", function() {
       item.style.display="none";
       item.nextElementSibling.style.display="block"
   }
))

dislike.forEach(item => item.addEventListener("click", function() {
  item.style.display="block";
       item.previousElementSibling.style.display="none"

}
))
// for (let i = 0; i < like.length; i++)
// like[i].addEventListener("click", function(){
//     like[i].style.display="none";
//     dislike[i].style.display="block"
// })

//DISLIKE FUNCTION
for (let i = 0; i < like.length; i++)
dislike[i].addEventListener("click", function(){
    dislike[i].style.display="none";
    like[i].style.display="block"
})


//-----------------DELETE CARD BUTTON---------------------------
//NAME OBJECTS
const cardDeleteButtonEl = document.querySelectorAll(".card__delete-button")
const cardEl = document.querySelectorAll(".card")

// cardDeleteButtonEl.forEach((item)=> item.addEventListener("click", console.log("teste")))

// for (let i = 0 ; i<initialCards.length; i++){
//   cardDeleteButtonEl[i].addEventListener("click", () => {
//     cardDeleteButtonEl[i].parentElement.remove()
//     //cardEl[i].remove()
//     console.log(initialCards.splice(i,1))
//     console.log(initialCards.length)
//     console.log(i)
//   })
// }
cardDeleteButtonEl.forEach(function (item,index){
  item.addEventListener("click", ()=> {
    item.parentElement.remove()
    initialCards.splice(index, 1)
  })
})

//-----------------IMAGE POPUP---------------------------
//NAME OBJECTS
const cardImageEl = document.querySelectorAll(".card__image")
const cardPopupEl = document.querySelectorAll(".card__image-popup")
const cardPopupCloseBtnEl = document.querySelectorAll(".card__close-button")


cardImageEl.forEach(function(item, index){
  item.addEventListener("click", () =>{
    cardPopupEl[index].classList.add("card__image-popup_active")
  })
})

cardPopupCloseBtnEl.forEach(function(item, index) {
  item.addEventListener("click", function() {
    cardPopupEl[index].classList.remove("card__image-popup_active")
  })

})


