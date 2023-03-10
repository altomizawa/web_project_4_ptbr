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