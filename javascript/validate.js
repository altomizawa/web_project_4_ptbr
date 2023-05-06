class FormValidator{
    constructor(config, formToValidate){
        this.config = config;
        this.formToValidate = formToValidate;
    }

    //Enable Submit Button
    _enableButton(){
        const button = this.formToValidate.querySelector(this.config.submitButtonSelector)
        button.classList.remove(this.config.inactiveButtonClass)
        button.disabled = false
    }
    
    //Disable Submit Button
    _disableButton(){
        const button = this.formToValidate.querySelector(this.config.submitButtonSelector)
        button.classList.add(this.config.inactiveButtonClass)
        button.disabled = true
    }

    //Check Valid Fields
    _checkIfValid(){
        //create Array for all Inputs within the form
        const inputs = Array.from(this.formToValidate.querySelectorAll(this.config.inputSelector))

        //Check form validity function and enable/disable form
        function isValid(){
            const checkValidity = inputs.every(input => input.validity.valid);
            if (!checkValidity){
                newForm._disableButton()
                this._showErrorClass(input)
            } else {
                newForm._enableButton()
                this._hideErrorClass(input)  
            }
        }

        //Add Event Listeners for every typed letter calling validation function
        inputs.forEach ((input) =>{
            input.addEventListener("input", isValid)          
        })    
    }

    
    
    //Show Error Class
    _showErrorClass(input){
        const errorElement = this.formToValidate.querySelector(`#${input.id}--error`)
        errorElement.textContent = input.validationMessage
        errorElement.classList.add(this.formToValidate.querySelector(this.config.errorClass))           
    }

     //Hide Error Class
     _hideErrorClass(input){
        const errorElement = this.formToValidate.querySelector(`#${input.id}--error`)
        errorElement.textContent = ""
        errorElement.classList.remove(this.formToValidate.querySelector(this.config.errorClass))           
    }



    // PREVENT DEFAULT EVENT FOR SUBMIT BUTTON
   
    //Check Validity of Each Field

    //Enable All Validation (and prevent default)
    _enableValidation(){
        this.formToValidate.addEventListener("submit", (evt)=>{
            evt.preventDefault()
        });         
    }


}

forms = document.querySelectorAll(".popup__card")

const newForm = new FormValidator({
    formSelector: ".popup__card",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error"
    }, forms[1])
newForm._checkIfValid()
newForm._enableValidation()



// function enableValidation({
//     formSelector,
//     inputSelector,
//     submitButtonSelector,
//     inactiveButtonClass,
//     errorClass
// }){
//     const forms = document.querySelectorAll(formSelector)

//     // PREVENT DEFAULT EVENT FOR SUBMIT BUTTON
//     forms.forEach((form) =>{
//         form.addEventListener("submit", (evt) => {
//             evt.preventDefault()
//         })
//     })
    
    // // ADD EVENT LISTENERS TO ALL FIELDS
    // forms.forEach((form) => {
    //     const inputs = Array.from(form.querySelectorAll(inputSelector))
    //     inputs.forEach((input) => {
    //         input.addEventListener("input", () =>{
    //             isValid(input)
    //         })
    //     })
    //     //CHECK IF INPUT IS VALID
    //     function isValid (input) {
    //         const checkInput = inputs.every(input => input.validity.valid)
    //         if (!checkInput) {
    //             showInputError(form, input, input.validationMessage)
    //         } else {
    //             hideInputError(form, input)
    //         }
    //     }
    // })

//     //ENABLE SUBMIT BUTTON
//     function enableButton(form){
//         const button = form.querySelector(submitButtonSelector)
//         button.classList.remove(inactiveButtonClass)
//         button.disabled = false
//     }

//     //DISABLE SUBMIT BUTTON
//     function disableButton(form){
//         const button = form.querySelector(submitButtonSelector)
//         button.classList.add(inactiveButtonClass)
//     }

//     //SHOW ERROR MESSAGE
//     function showInputError (form, input, errorMessage){
//         errorElement = form.querySelector(`#${input.id}--error`)
//         errorElement.textContent = errorMessage
//         errorElement.classList.add(errorClass)
//         disableButton(form)
//     }

//     //HIDE ERROR MESSAGE
//     function hideInputError (form, input){
//         errorElement = form.querySelector(`#${input.id}--error`)
//         errorElement.textContent = ""
//         errorElement.classList.remove(errorClass)
//         enableButton(form)
//     }


// }

// enableValidation({
//     formSelector: ".popup__card",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__submit-button",
//     inactiveButtonClass: "popup__submit-button_inactive",
//     inputErrorClass: "popup__input-error",
//     errorClass: "popup__input-error"
//   });