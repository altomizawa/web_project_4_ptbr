import { updateUserInfo} from "../src/index.js";
import UserInfo from "../javascript/userInfo.js";
import { profileName, profilePicture, profileProfession } from "./constants.js";

export class Api2 {
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

}

