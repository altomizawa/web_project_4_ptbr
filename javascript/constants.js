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
  const forms = document.querySelectorAll(".popup__card")
  const profileName = document.querySelector(".profile__name");
  const profileProfession = document.querySelector(".profile__title");
  

  export {initialCards, cardsParent, cardTemplate, forms, profileName, profileProfession}