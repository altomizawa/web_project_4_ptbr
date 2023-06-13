import {makeInitialCards} from "../src/index.js";
import UserInfo from "../javascript/userInfo.js"

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
    .then (res => res.json())
    .then ((data =>{return makeInitialCards(data)}))    
        }


    getUser(){
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

    updateUser(){

    }
  }

