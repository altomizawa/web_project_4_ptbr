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

//ENABLE / DISABLE BUTTON FUNCTION
const disableButton = (formElement) => {
  const button = formElement.querySelector("button");
  button.classList.add("popup__save-button_inactive");
  button.disabled = true;
};

const enableButton = (formElement) => {
  const button = formElement.querySelector("button");
  button.classList.remove("popup__save-button_inactive");
  button.disabled = false;
};

//CREATE showInputError()
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error");
  disableButton(formElement);
};

//CREATE hideInputError()
const hideInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  enableButton(formElement);
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

//RESET FORM FUNCTION
const resetForm = (formToReset) => {
  console.log(formToReset);
};
