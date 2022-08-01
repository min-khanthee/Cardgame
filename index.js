// Button that when clicked, gets a new deck of cards from the deck of cards API

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => console.log(data))
}

document.getElementById('deck-btn').addEventListener('click', handleClick)
