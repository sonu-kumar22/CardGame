var cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];
var deckOne = [];
var deckTwo = [];
var deckThree = [];
var iteration = 0;
window.onload = function () {
  onStart();
};

function onStart() {
  var cardContainer = document.querySelector(".game-start-card-container");
  var concatenedtGrid = "";
  for (let i in cards) {
    if (i == 0) {
      concatenedtGrid += `<div class="row">
                                        <div class="col-2">
                                            <div class="card">
                                              <div class="card-body">
                                                  <h1>${cards[i]}</h1>
                                              </div>
                                            </div>       
                                        </div>`;
    } else if (i == 5) {
      concatenedtGrid += `<div class="col-2">
                                <div class="card">
                                  <div class="card-body">
                                      <h1>${cards[i]}</h1>
                                  </div>
                                </div>       
                            </div>
                        </div>
                        <div class="row">`;
    } else if (i == 11) {
      concatenedtGrid += `<div class="col-2">
                                <div class="card">
                                  <div class="card-body">
                                      <h1>${cards[i]}</h1>
                                  </div>
                                </div>       
                            </div>
                        </div>
                        <div class="row except">`;
    } else if (i == 14) {
      concatenedtGrid += `<div class="col-2">
                                <div class="card">
                                  <div class="card-body">
                                      <h1>${cards[i]}</h1>
                                  </div>
                                </div>       
                            </div>
                        </div>`;
    } else {
      concatenedtGrid += `<div class="col-2">
                                            <div class="card">
                                              <div class="card-body">
                                                  <h1>${cards[i]}</h1>
                                              </div>
                                            </div>       
                                        </div>`;
    }
  }
  cardContainer.innerHTML = concatenedtGrid;
}

function startGame() {
  let actionContainer = document.querySelector(".action-container");
  actionContainer.classList.add("hide-c");

  let cards = document.getElementsByClassName("card");
  for (let index = 0; index < cards.length; index++) {
    cards[index].classList.add("slide-h");
  }

  let rows = document.querySelectorAll(".game-start-card-container .row");

  console.log(rows);
  for (let index = 0; index < rows.length; index++) {
    rows[index].classList.add("slide-v");
  }

  let sectionGameLanding = document.querySelector(".game-landing");
  sectionGameLanding.classList.add("hide-s");

  setTimeout(() => loadGame(), 1000);
}

function loadGame() {
  shuffle(cards);

  shuffleCards();

  var sectionInProgress = document.querySelector(".game-in-progress");
  sectionInProgress.classList.add("show-s");
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

function choose(deck) {
  iteration++;
  if (deck == 1) {
    cards = deckTwo.concat(deckOne).concat(deckThree);
  } else if (deck == 2) {
    cards = deckOne.concat(deckTwo).concat(deckThree);
  } else {
    cards = deckOne.concat(deckThree).concat(deckTwo);
  }

  if (iteration <= 2) shuffleCards();

  if (iteration == 3) showCard(cards[7]);
}

function shuffleCards() {
  deckOne = [];
  deckTwo = [];
  deckThree = [];
  for (let i = 0; i < cards.length; i += 3) {
    deckOne.push(cards[i]);
    deckTwo.push(cards[i + 1]);
    deckThree.push(cards[i + 2]);
  }
  setInProgressContent();
}

function showCard(card) {
  let inProgressSection = document.querySelector(".game-in-progress");
  inProgressSection.classList.add("hide-s");

  let guessedSection = document.querySelector(".guessed-card");
  guessedSection.classList.add("show-s");

  let cardContainer = document.querySelector(".guessed-card-container");
  cardContainer.innerHTML = `<span class="message">Hopefully this is your card!</span>
                              <div class="result">
                                <div class="card">
                                  <div class="card-body">
                                      <h1>${card}</h1>
                                  </div>
                                </div>
                              </div>
                              <div class="new-game">
                                <button class="btn btn-new-game" onclick="neWGame()">New Game</button>
                              </div>`;
}

function setInProgressContent() {
  let concatenedtGrid = `<div class="row deck-container">
                          <div class="col-4">
                          ${setContentDeckOne()}
                            <div class="row">
                              <div class="col-12">
                                <button class="btn btn-choose" onclick="choose(1)">My Card is Here</button>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                          ${setContentDeckTwo()}
                            <div class="row">
                              <div class="col-12">
                                <button class="btn btn-choose" onclick="choose(2)">My Card is Here</button>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                          ${setContentDeckThree()}
                            <div class="row">
                              <div class="col-12">
                                <button class="btn btn-choose" onclick="choose(3)">My Card is Here</button>
                              </div>
                            </div>
                          </div>
                        </div>`;
  let cardContainer = document.querySelector(
    ".game-in-progress-card-container"
  );
  cardContainer.innerHTML = concatenedtGrid;
}

function setContentDeckOne() {
  let deckOneContent = "";

  for (let i = 0; i < deckOne.length - 1; i += 2) {
    deckOneContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckOne[i]}</h1>
                              </div>
                            </div> 
                          </div>
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckOne[i + 1]}</h1>
                              </div>
                            </div> 
                          </div>
                        </div>`;
  }
  deckOneContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckOne[4]}</h1>
                              </div>
                            </div> 
                          </div>                         
                        </div>`;
  return deckOneContent;
}

function setContentDeckTwo() {
  let deckTwoContent = "";
  for (let i = 0; i < deckTwo.length - 1; i += 2) {
    deckTwoContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckTwo[i]}</h1>
                              </div>
                            </div> 
                          </div>
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckTwo[i + 1]}</h1>
                              </div>
                            </div> 
                          </div>
                        </div>`;
  }
  deckTwoContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckTwo[4]}</h1>
                              </div>
                            </div> 
                          </div>                         
                        </div>`;
  return deckTwoContent;
}

function setContentDeckThree() {
  let deckThreeContent = "";
  for (let i = 0; i < deckThree.length - 1; i += 2) {
    deckThreeContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckThree[i]}</h1>
                              </div>
                            </div> 
                          </div>
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckThree[i + 1]}</h1>
                              </div>
                            </div> 
                          </div>
                        </div>`;
  }
  deckThreeContent += `<div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-body">
                                  <h1>${deckThree[4]}</h1>
                              </div>
                            </div> 
                          </div>                         
                        </div>`;
  return deckThreeContent;
}

function neWGame() {
  window.location.reload();
}
