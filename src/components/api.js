import { authorization, profileName, profileProfession } from "./constants.js";
import { enableValidation } from "../index.js";

// export class Api {
//   constructor(url, method, authorization, contentType) {
//     this.url = url;
//     this.method = method;
//     this.authorization = authorization;
//     this.contentType = contentType;
//   }

//   async fetchData() {
//     try {
//       const response = await fetch(this.url, {
//         method: this.method,
//         headers: {
//           authorization: this.authorization,
//           "Content-Type": this.contentType,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('somenthing went wrong')
//       }

//       const data = await response.json();

//       return {
//         // Returning an object with the values
//         data: data,
//       };
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async addNewCard(cardTitle, cardLink, popup) {
//     popup._submitButton.textContent = "Aguarde...";

//     try {
//       await fetch(this.url, {
//         method: this.method,
//         headers: {
//           authorization: this.authorization,
//           "Content-Type": this.contentType,
//         },
//         body: JSON.stringify({
//           name: cardTitle,
//           link: cardLink,
//         }),
//       });
//     } catch (err) {
//       console.log("Error while posting user info:", err);
//     }
//     popup._form.parentElement.classList.remove("popup_active");
//     popup._submitButton.textContent = "Criar";
//   }

//   async removeCard(cardId) {
//     try {
//       await fetch(`${this.url}/${cardId}`, {
//         method: this.method,
//         headers: {
//           authorization: this.authorization,
//           "Content-Type": this.contentType,
//         },
//       });
//     } catch (err) {
//       console.log("Error while posting user info:", err);
//     }
//   }

//   async updateUser(user, popup) {
//     popup._submitButton.textContent = "Aguarde...";
//     try {
//       await fetch(this.url, {
//         method: this.method,
//         headers: {
//           authorization: this.authorization,
//           "Content-Type": this.contentType,
//         },
//         body: JSON.stringify({
//           name: user._name,
//           about: user._profession,
//           avatar: user.avatar,
//         }),
//       });

//       profileName.textContent = user._name;
//       profileProfession.textContent = user._profession;

//       popup._form.parentElement.classList.remove("popup_active");
//       popup._submitButton.textContent = "Salvar";
//     } catch (err) {
//       console.log("Error while updating user:", err);
//     }
//   }
// }

export class Api {
  constructor(url, authorization) {
    this._url = url;
    this._authorization = authorization;
  }

  getUser(){
    return fetch (`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.ok) {return res.json()}

      //if server returns error, then:
      return Promise.reject(`Error: ${res.status}`)
    })
    .catch(err => {console.log(err)})
  }

  updateProfile(userInfo, button){
    return fetch (`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${userInfo._name}`,
        about: `${userInfo._profession}`

      })
    })
    .finally(()=>{
      button.textContent = "Salvar"
    })

  }

  updateProfilePicture(userInfo, button){
    return fetch (`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: `${userInfo._avatar}`,

      })
    })
    .finally (()=>{
      button.textContent = "Salvar"
    })
  }

  getCardArray(){
    return fetch (`${this._url}/cards`, {
      method: "GET",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.ok) {return res.json()}

      //if server returns error, then:
      return Promise.reject(`Error: ${res.status}`)
    })
    .catch(err => {console.log(err)})
  }

  async addCard(cardTitle, cardLink, popup){
    return await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: cardTitle,
        link: cardLink,
      }),
    })
  }

  async removeCard(cardId, button){
    return await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json"
      }
    })
    .finally (() =>{button.textContent = "SIM"})

  }

  sendLike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application.json"
      },
    })
    .then(res => res.json())
  }

  sendDislike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application.json"
      },
    })
    .then(res => res.json())
  }

}
