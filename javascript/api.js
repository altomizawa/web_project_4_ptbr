import {makeInitialCards} from "../src/index.js";
import UserInfo from "../javascript/userInfo.js"

export default class Api{
    constructor(url, authorization, contentType){
        this.url = url;
        this.authorization = authorization;
        this.contentType = contentType;
        this.arr = this.arr
    }

    getInitialCards(){
    fetch(this.url, {
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
            headers: {
                authorization: this.authorization,
                "Content-Type": this.contentType,
            }
        })
        .then (res => res.json())
        .then((data) => {
            console.log(data.avatar)
            const user = new UserInfo(data)
            user.getUserInfo()
            user.setUserInfo()
        })
    }
  }

