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

// renderer: (item) => {
//   const newCard = new Card(item, cardTemplate, false, (card) => {
//     const cardImage = card.querySelector(".card__image")
//     cardImage.addEventListener("click", () => {
//         const popup = new PopupWithImage(".popupwithimage", ".popupwithimage__image-big", ".card__title")
//         popup.open(newCard)
//     })
//   })

//   const cardElement = newCard.createCard()

//   initialCardGrid.addItem(cardElement)

// }