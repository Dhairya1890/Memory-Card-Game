
const card1 = document.querySelectorAll(".memory-card");
function flipcard(){
    this.classList.toggle("flip");
}
card1.forEach(card => card.addEventListener("click", flipcard))





  const images = [
    'assests/cyclone.png',
    'assests/heart.png',
    'assests/large_blue_circle.png',
    'assests/large_blue_diamond.png',
    'assests/small_red_triangle.png',
    'assests/star.png',
    'assests/star2.png',
    'assests/white_large_square.png'
  ];

  const board = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  let firstCard, secondCard;
  let hasFlippedCard = false;
  let lockBoard = false;
  let score = 0;

  function createCards() {
    const cardImages = [...images, ...images]; // Duplicate for pairs
    shuffle(cardImages);

    board.innerHTML = ''; // Clear previous cards

    cardImages.forEach(src => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.setAttribute('data-image', src);

      card.innerHTML = `
        <div class="front-face"><img src="assests/Neuron Games.png" alt="back"></div>
        <div class="back-face"><img src="${src}" alt="front"></div>`;

      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flip')) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
      score += 1;
      updateScore();
      disableCards();
    } else {
      unflipCards();
      if(score>=1){
        score -= 1;
      }
      updateScore();
    }
  }

  function updateScore() {
    scoreDisplay.textContent = score;
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function startGame() {
    score = 0;
    updateScore();
    createCards();
  }

  window.onload = startGame;


