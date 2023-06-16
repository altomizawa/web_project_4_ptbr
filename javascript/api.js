// import {makeInitialCards, updateUserInfo, getUserId} from "../src/index.js";
// import UserInfo from "../javascript/userInfo.js"
// import { profileName, profilePicture, profileProfession } from "./constants.js";

// export class Api{
//     constructor(url, method, authorization, contentType){
//         this.url = url;
//         this.method = method;
//         this.authorization = authorization;
//         this.contentType = contentType;          
//     }

//     getInitialCards(){
//     fetch(this.url, {
//     method: this.method,
//     headers: {
//     authorization: this.authorization,
//     "Content-Type": this.contentType,
//     }
//     })
//     .then (res => {if (res.ok) {
//         return res.json()
//     } else {console.log("error")}})
//     .then ((data =>{return makeInitialCards(data)}))
//     .catch((err) => {console.log(err)})    
//     }


//     getUser(){
//         fetch(this.url, {
//             method: this.method,
//             headers: {
//                 authorization: this.authorization,
//                 "Content-Type": this.contentType,
//             }
//         })
//         .then (res => {if (res.ok) {
//             return res.json()
//         } else {console.log("error")}})
//         .then((data) => {
//             updateUserInfo(data)
//         })
//         .catch((err) => {console.log("Unable to get properties. Sorry")})
//     }

//     getUserId(){
//         fetch(this.url, {
//             method: this.method,
//             headers: {
//                 authorization: this.authorization,
//                 "Content-Type": this.contentType,
//             }
//         })
//         .then (res => {if (res.ok) {
//             return res.json()
//         } else {console.log("error")}})
//         .then((data) => {
//             getUserId(data)
//         })
//         .catch((err) => {console.log("Unable to get properties. Sorry")})
//     }

//     updateUser(user){
//         fetch(this.url, {
//             method: this.method,
//             headers: {
//                 authorization: this.authorization,
//                 "Content-Type": this.contentType,
//             },
//             body: JSON.stringify({
//                 name: `${user._name}`,
//                 about: `${user._profession}`,
//             })
//             });
//         profileName.textContent = user._name;
//         profileProfession.textContent = user._profession;
//     }

//     changeProfilePic(){

//     }

//     addNewCard(){
//         console.log("new Card Added")
//     }

//     removeCard(){

//     }

//     addLike(){

//     }

//     removeLike(){

//     }
//   }



// import { updateUserInfo} from "../src/index.js";
// import UserInfo from "../javascript/userInfo.js";
// import { profileName, profilePicture, profileProfession } from "./constants.js";

export class Api {
  constructor(url, method, authorization, contentType) {
    this.url = url;
    this.method = method;
    this.authorization = authorization;
    this.contentType = contentType;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url, {
        method: this.method,
        headers: {
          authorization: this.authorization,
          "Content-Type": this.contentType,
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      return response.json();
    } catch (err) {
      console.log("Unable to fetch data. Error:", err);
      throw err;
    }
  }

  async getInitialCards() {
    try {
      const data = await this.fetchData();
      return makeInitialCards(data);
    } catch (err) {
      console.log("Error while getting initial cards:", err);
    }
  }

  async addNewCard(newCardInfo) {
    try{
        await fetch(this.url, {
            method: this.method,
            headers: {
              authorization: this.authorization,
              "Content-Type": this.contentType,
            },
            body: JSON.stringify({
              name: "Al Tomizawa",
              link: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80",
            }),
          });
    } catch (err) {
        console.log("Error while posting user info:", err)
    }
  }

  async removeNewCard(cardId) {
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



  async getUser() {
    try {
      const data = await this.fetchData();
      updateUserInfo(data);
    } catch (err) {
      console.log("Error while getting user info:", err);
    }
  }

  async getUserId() {
    try {
      const data = await this.fetchData();
      return data
    } catch (err) {
      console.log("Error while getting user ID:", err);
    }
  }

  async updateUser(user) {
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
        }),
      });

      profileName.textContent = user._name;
      profileProfession.textContent = user._profession;
    } catch (err) {
      console.log("Error while updating user:", err);
    }
  }

  // Other methods...

}
