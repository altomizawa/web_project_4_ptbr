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

// ---------------POPUP OPEN/CLOSE FUNCTION------------------
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
}

// ---------------POPUP SAVE BUTTTON FUNCTION------------------
//NAME OBJECTS
let popupSaveButtonEl = document.querySelector(".popup__save-button");
let popupNameInput = Array.from(document.querySelectorAll(".popup__input"))
let updatedName = document.querySelector(".profile__name")
let updatedProfession = document.querySelector(".profile__title")

//SAVE BUTTON FUNCTION
popupSaveButtonEl.addEventListener("click", popupSave)
function popupSave(){
    updatedName.textContent=popupNameInput[0].value
    updatedProfession.textContent = popupNameInput[1].value
    popupOut();

}
