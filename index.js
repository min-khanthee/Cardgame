// Button that when clicked, gets a new deck of cards from the deck of cards API

let deckId
const deckBtn = document.getElementById('deck-btn')
const newCardBtn = document.getElementById('new-cards')
const cardsContainer = document.getElementById('cards')

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      deckId = data.deck_id
      console.log(deckId)
    })
}

deckBtn.addEventListener('click', handleClick)

newCardBtn.addEventListener('click', () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards[0].image)
      cardsContainer.children[0].innerHTML = `
      <img src=${data.cards[0].image} />
  `
      cardsContainer.children[1].innerHTML = `
      <img src=${data.cards[1].image} />
  `
    })
})
