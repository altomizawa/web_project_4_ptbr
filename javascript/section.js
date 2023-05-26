import {deleteCard, _imagePopup, cardsParent, cardTemplate} from "./index.js";
import { _addLikeButton } from "./utils.js";
import {Card} from "./card.js"

export default class Section {
constructor({items, renderer}, containerSelector){
        this._items = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer
    }
    
    renderer(){
        this._items.forEach((item) =>{
        const newCard = new Card (item, cardTemplate, false)
        newCard.createCard()
        })
    }

    addItem(element){
        this._container.append(element)
    }    
}