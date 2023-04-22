enableValidation({
    formSelector: ".popup__card",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error"
  });

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}){
    const forms = document.querySelectorAll(formSelector)

    // ADD EVENT HANDLERS TO ALL FORMS (PREVENT DEFAULTS AND INPUT LISTENERS)
    
    // ADD EVENT LISTENERS TO ALL FIELDS
    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(inputSelector))
        inputs.forEach((input) => {
            input.addEventListener("input", (evt) =>{
                isValid(input)
            })
        })
        //CHECK IF INPUT IS VALID
        function isValid (input) {
            const checkInput = inputs.every(input => input.validity.valid)
            if (!checkInput) {
                showInputError(form, input, input.validationMessage)
            } else {
                hideInputError(form, input)
            }
        }
    })

    //ENABLE SUBMIT BUTTON
    function enableButton(form){
        const button = form.querySelector(submitButtonSelector)
        button.classList.remove(inactiveButtonClass)
    }

    //DISABLE SUBMIT BUTTON
    function disableButton(form){
        const button = form.querySelector(submitButtonSelector)
        button.classList.add(inactiveButtonClass)
    }

    //SHOW ERROR MESSAGE
    function showInputError (form, input, errorMessage){
        errorElement = form.querySelector(`#${input.id}--error`)
        errorElement.textContent = errorMessage
        disableButton(form)
    }

    //HIDE ERROR MESSAGE
    function hideInputError (form, input, errorMessage){
        errorElement = form.querySelector(`#${input.id}--error`)
        errorElement.textContent = ""
        console.log(errorElement.textContent)
        enableButton(form)
    }


}
