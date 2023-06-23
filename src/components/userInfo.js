import {profileName, profileProfession, profilePicture} from "./constants.js";

export default class UserInfo{
    constructor (user){
        this._user = user;
        this._name = user.name;
        this._profession = user.about;
        this._avatar = user.avatar;
        this._id = user._id;
    }

    getUserInfo(){
       return this._user
    }

    setUserInfo(){
        profileName.textContent = this._name;
        profileProfession.textContent = this._profession;
        profilePicture.src = this._avatar;
    }
}