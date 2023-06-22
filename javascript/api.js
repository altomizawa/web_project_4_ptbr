import { updateUserInfo} from "../src/index.js";
import UserInfo from "./userInfo.js";
import { profileName, profilePicture, profileProfession } from "./constants.js";

export class Api {
    constructor(url, method, authorization, contentType){
        this.url = url;
        this.method = method;
        this.authorization = authorization;
        this.contentType = contentType;
    }

    async fetchData(){
        try{
            const response = await fetch(this.url, {
                method: this.method,
                headers: {
                    authorization: this.authorization,
                    "Content-Type": this.contentType
                }
            })

            if (!response.ok){
                console.log("custom error message")
            }

            const data = await response.json();

            return {  // Returning an object with the values
                data: data
            };
        }
        catch (err) {
            console.log(err)
        }
    }

    async addNewCard(cardTitle, cardLink, popup) {
        popup._submitButton.textContent = "Aguarde..."

        try{
            await fetch(this.url, {
                method: this.method,
                headers: {
                  authorization: this.authorization,
                  "Content-Type": this.contentType,
                },
                body: JSON.stringify({
                  name: cardTitle,
                  link: cardLink,
                }),
              });
        } catch (err) {
            console.log("Error while posting user info:", err)
        }
        popup._form.parentElement.classList.remove("popup_active")
        popup._submitButton.textContent = "Criar"
      }


    async removeCard(cardId) {
        try{
            await fetch(`${this.url}/${cardId}`, {
                method: this.method,
                headers: {
                  authorization: this.authorization,
                  "Content-Type": this.contentType,
                },
              });
        } catch (err) {
            console.log("Error while posting user info:", err)
        }
      }

    async updateUser(user, popup) {
        popup._submitButton.textContent = "Aguarde..."
    try {
        await fetch(this.url, {
        method: this.method,
        headers: {
            authorization: this.authorization,
            "Content-Type": this.contentType,
        },
        body: JSON.stringify({
            name: user._name,
            about: user._profession,
            avatar: user.avatar
        }),
        });

        profileName.textContent = user._name;
        profileProfession.textContent = user._profession;
        
        popup._form.parentElement.classList.remove("popup_active")
        popup._submitButton.textContent = "Salvar"

    } catch (err) {
        console.log("Error while updating user:", err);
    }
    }
}

