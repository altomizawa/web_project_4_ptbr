import {makeInitialCards} from "../src/index.js";
import UserInfo from "../javascript/userInfo.js"
import { profileName, profilePicture, profileProfession } from "./constants.js";

export class Api{
    constructor(url, method, authorization, contentType){
        this.url = url;
        this.method = method;
        this.authorization = authorization;
        this.contentType = contentType;          
    }

    getInitialCards(){
    fetch(this.url, {
    method: this.method,
    headers: {
    authorization: this.authorization,
    "Content-Type": this.contentType,
    }
    })
    .then (res => {if (res.ok) {
        return res.json()
    } else {console.log("error")}})
    .then ((data =>{return makeInitialCards(data)}))    
        }


    async getUser(){
        fetch(this.url, {
            method: this.method,
            headers: {
                authorization: this.authorization,
                "Content-Type": this.contentType,
            }
        })
        .then (res => res.json())
        .then((data) => {
            const user = new UserInfo(data)
            user.getUserInfo()
            user.setUserInfo()
        })
    }

    updateUser(user){
        fetch(this.url, {
            method: this.method,
            headers: {
                authorization: this.authorization,
                "Content-Type": this.contentType,
            },
            body: JSON.stringify({
                name: `${user._name}`,
                about: `${user._profession}`,
            })
            });
        profileName.textContent = user._name;
        profileProfession.textContent = user._profession;
    }

    addNewCard(){
        console.log("new Card Added")
    }
  }

  