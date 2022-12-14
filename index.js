// Button that when clicked, gets a new deck of cards from the deck of cards API

let deckId
let cardsRemaining

let compScore = 0
let youScore = 0

const compScoreText = document.getElementById('comp-score')
const youScoreText = document.getElementById('you-score')

const deckBtn = document.getElementById('deck-btn')
const newCardBtn = document.getElementById('new-cards')
const cardsContainer = document.getElementById('cards')
const declareWinner = document.getElementById('declare-winner')
const remainingText = document.getElementById('remaining')

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      deckId = data.deck_id
      console.log(deckId)
      cardsRemaining = data.remaining
      remainingText.innerHTML = `${cardsRemaining} Cards Remaining`
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

      cardsRemaining = data.remaining
      remainingText.innerHTML = `${cardsRemaining} Cards Remaining`

      if (data.remaining === 0) {
        newCardBtn.disabled = true
        if (compScore > youScore) {
          declareWinner.textContent = 'Bot wins the game!'
        } else if (compScore < youScore) {
          declareWinner.textContent = 'You win the game!'
        } else {
          declareWinner.textContent = `It's a tie!`
        }
      }
    })
})

function calcWinner(card1, card2) {
  const cardsIndex = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']

  const card1IndexValue = cardsIndex.indexOf(card1)
  const card2IndexValue = cardsIndex.indexOf(card2)

  if (card1IndexValue > card2IndexValue) {
    compScore++
    compScoreText.innerHTML = `Bot score: ${compScore}`
    return 'Bot wins!'
  } else if (card1IndexValue < card2IndexValue) {
    youScore++
    youScoreText.innerHTML = `Your score: ${youScore}`
    return 'You win!'
  } else {
    return "It's a tie!"
  }
}
