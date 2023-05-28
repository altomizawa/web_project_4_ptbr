import {profileName, profileProfession} from "./constants.js";

export default class UserInfo{
    constructor (user){
        this._user = user;
        this._name = user.name;
        this._profession = user.profession;
    }

    getUserInfo(){
       return this._user
    }

    setUserInfo(){
        profileName.textContent = this._name;
        profileProfession.textContent = this._profession;
    }
}