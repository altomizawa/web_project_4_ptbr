
function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
  
    const form = document.querySelector(formSelector);
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);
    submitButton.disabled = true;

    function toggleButtonState(){
        const isFormValid = inputs.every(input => input.validity.valid);
        submitButtonSelector.disabled = !isFormValid;
        submitButton.classList.toggle(inactiveButtonClass, !isFormValid)
    }

    function showInputError(input) {
        const error = form.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        console.log(input.validationMessage)
        error.textContent = input.validationMessage;
        error.classList.add(errorClass);
    }

    function hideInputError(input) {
        const error = form.querySelector(`#${input.id}-error`);
        input.classList.remove(inputErrorClass);
        error.textContent = "";
        error.classList.remove(errorClass);
    }

    function handleInput(event) {
        const input = event.target;
        if (input.validity.valid) {
            hideInputError(input);
        } else {
            showInputError(input);
        }
        toggleButtonState()
    }
    
    function handleSubmit(event) {
        event.preventDefault();
    }
    
    inputs.forEach(input => {
        input.addEventListener("input", handleInput);
    });

    form.addEventListener("submit", handleSubmit);

    toggleButtonState();

}


enableValidation({
    formSelector: ".popup__card",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error"
  });


// //pegar todos os forms
// const forms = document.querySelectorAll("form")

// //CLICK SUBMIT FUNCTION
// forms.forEach((form) => {
//     const buttons = form.querySelectorAll("button")
//     buttons.forEach((button) => {
//         button.addEventListener("click", (evt) => {
//             evt.preventDefault()
//         })
//     })
// })

// //check if fields are valid
// function isValid(form, input) {
//     if(!input.validity.valid) {
//         console.log("not valid")
//         showInputError(form, input)
//     } else {
//         console.log("valid")
//     }
// }


// //SHOW INPUT ERROR FUNCTION
// const showInputError = (form, input) => {
//     const errorElement = form.querySelector(`.${input.id}-error`)
//     errorElement.textContent = errorMessage
// }


// //DISABLE BUTTON FUNCTION
// function disableButton(button) {
// button.classList.add("popup__save-button_inactive");
// button.disabled = true;
// }

// //ENABLE BUTTON FUNCTION
// function enableButton(button) {
//     button.classList.remove("popup__save-button_inactive");
//     button.disabled = false;
//     }


// //SELECT ALL INPUTS
// forms.forEach((form) => {
//     const inputs = form.querySelectorAll("input")
//     inputs.forEach((input) => {
//         input.addEventListener("keypress", (evt)=>{
//             isValid(form, input)
//         })
//     })
// })



// Habilitando a validação chamando enableValidation()
// Valide todas as configurações

// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible"
//   });