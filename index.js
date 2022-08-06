// Button that when clicked, gets a new deck of cards from the deck of cards API

let deckId

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      deckId = data.deck_id
      console.log(deckId)
    })
}

document.getElementById('deck-btn').addEventListener('click', handleClick)
