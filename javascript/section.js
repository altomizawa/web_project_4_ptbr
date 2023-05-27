import {deleteCard, _imagePopup, cardsParent, cardTemplate} from "./index.js";
import { _addLikeButton } from "./utils.js";
import {Card} from "./card.js"

export default class Section {
constructor({items, renderer}, containerSelector){
        this._items = items;
        this._container = containerSelector;
        this._renderer = renderer;
    }
    
    //render every card
    renderer(){
      this._items.forEach((item) => {  
        this._renderer(item)
      })
    }

    //Add all Initial cards to DOM
    addItem(element){
      this._container.append(element)
    }    
}