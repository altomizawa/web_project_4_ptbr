//SELECT ALL FORMS
const formElement = document.querySelectorAll(".popup__card");

//CREATE isValid()
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

//CREATE showInputError()
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}--error`);
  errorElement.textContent = errorMessage;
  // inputElement.classList.add("form__input_type_error");
  errorElement.classList.add("popup__input--error");
};

//CREATE hideInputError()
const hideInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}--error`);
  // inputElement.classList.add("form__input_type_error");
  // errorElement.classList.add("popup__input--error")
  errorElement.textContent = "";
};

//Adding Event Handlers to all form fields
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
    });
  });
};

//ADD EVENT HANDLERS TO ALL FORMS
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__card"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

// console.log(forms.input);
// //SELECT FIRST FORM = PROFILE FORM
// const formProfile = forms[0];
// //SELECT ALL INPUTS INSIDE FIRST FORM
// const profileInput = formProfile.querySelectorAll("input");
// //NAME EACH INPUT FOR VALIDATION
// const nameProfileInput = profileInput[0];
// const titleProfileInput = profileInput[1];
//ADD EVENTLISTENER FOR REAL-TIME VALIDATION
// nameProfileInput.addEventListener("input", isValid);

// //VALIDATE FUNCTION
// function isValid(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     console.log("hello")
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement, inputElement.validationMessage);
//   }
// }

// //SHOW INPUT ERROR FUNCTION
// function showInputError(formElement, inputElement) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}--error`)
//   console.log(formElement, inputElement);
//   console.log(formElement, inputElement.validationMessage);
// }

// //HIDE INPUT ERROR FUNCTION
// function hideInputError()

// //SELECT SECOND FORM = PHOTO CARD FORM
// const formCard = forms[1];
// //SELECT ALL INPUTS INSIDE SECOND FORM
// const photoCardInput = formCard.querySelectorAll("input");
// //NAME EACH INPUT FOR VALIDATION
// const photoTitleInput = photoCardInput[0];
// const photoLinkInput = photoCardInput[1];
