import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._submitButton = this._popup.querySelector("button");
    this._submitButtonOriginalText =
      this._popup.querySelector("button").textContent;
    this._form = this._popup.querySelector("form");
  }

  //Method to Open PROFILE Popup
  openProfileForm() {
    this._popup.classList.add("popup_active");
    this.setEventListeners();

    this._form.querySelector(".popup__input_name").value =
      document.querySelector(".profile__name").textContent;
    this._form.querySelector(".popup__input_profession").value =
      document.querySelector(".profile__title").textContent;
  }

  //Method to Open PROFILE PICTURE Popup
  openProfilePictureForm() {
    this._popup.classList.add("popup_active");
    this.setEventListeners();
  }

  //Method to Open CARD Popup
  openCardForm() {
    this._popup.classList.add("popup_active");
    this.setEventListeners();

    // this.setSubmitButtonListener()
  }

  //Method to Close Popup
  close() {
    this._popup.classList.remove("popup_active");
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    const inputs = this._form.querySelectorAll("input");
    inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "AGUARDE...";
    } else {
      this._submitButton.textContent = this._submitButtonOriginalText;
    }
  }
}
