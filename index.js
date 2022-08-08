// Button that when clicked, gets a new deck of cards from the deck of cards API

let deckId
const deckBtn = document.getElementById('deck-btn')
const newCardBtn = document.getElementById('new-cards')
const cardsContainer = document.getElementById('cards')
let declareWinner = document.getElementById('declare-winner')

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

      declareWinner.innerHTML = `${calcWinner(data.cards[0].value, data.cards[1].value)}`
    })
})

function calcWinner(card1, card2) {
  const cardsIndex = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']

  const card1IndexValue = cardsIndex.indexOf(card1)
  const card2IndexValue = cardsIndex.indexOf(card2)

  if (card1IndexValue > card2IndexValue) {
    return 'Bot wins!'
  } else if (card1IndexValue < card2IndexValue) {
    return 'You win!'
  } else {
    return "It's a tie!"
  }
}
