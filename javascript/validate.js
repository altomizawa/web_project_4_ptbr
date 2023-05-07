class FormValidator{
    constructor(config, formToValidate){
        this.config = config;
        this.formToValidate = formToValidate;
        this.submitButton = this.formToValidate.querySelector(this.config.submitButtonSelector);
        this.inputs = Array.from(this.formToValidate.querySelectorAll(this.config.inputSelector));
        this.enableValidation();
    }

    //Enable Submit Button
    _enableButton(){
        if(this.submitButton.disabled){
            this.submitButton.classList.remove(this.config.inactiveButtonClass);
            this.submitButton.disabled = false;
        }
    }
    
    //Disable Submit Button
    _disableButton(){
        if(!this.submitButton.disabled){
            this.submitButton.classList.add(this.config.inactiveButtonClass);
            this.submitButton.disabled = true;
        }
    }

    //Check Valid Fields
    isValid = (input) => {
        const checkValidity = this.inputs.every(input => input.validity.valid)
        if (!checkValidity) {
            this._disableButton()
            this._showErrorClass(input)
        } else {
            this._enableButton();
            this._hideErrorClass(input)
        }
    }
    //Show and Hide Error Class
    _showErrorClass(input) {
        const errorElement = this.formToValidate.querySelector(`#${input.id}--error`)
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }

    _hideErrorClass(input) {
        const errorElement = this.formToValidate.querySelector(`#${input.id}--error`)
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass)

    }

    //Handle Input Event
    _handleInputEvent = (event) => {
        if (event.target.matches(this.config.inputSelector)) {
            this.isValid(event.target);            
        }
    }

    //Enable All validation and Prevent Default
    enableValidation() {
        this.formToValidate.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        this.formToValidate.addEventListener("input", this._handleInputEvent);
        this._disableButton()
    }
}

//CREATE FORM VALIDATION FOR ALL FORMS
forms = document.querySelectorAll(".popup__card")

forms.forEach((form) => {
    const newForm = new FormValidator({
        formSelector: ".popup__card",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit-button",
        inactiveButtonClass: "popup__submit-button_inactive",
        inputErrorClass: "popup__input-error",
        errorClass: "popup__input-error"
    }, form)
    newForm.enableValidation()
})

