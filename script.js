const categories = {
    fruits: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍍", "🥭", "🍒"],
    emojis: ["😀", "😎", "🤩", "😍", "🥳", "🤠", "😜", "😇"],
    animals: ["🐶", "🐱", "🐼", "🦁", "🐧", "🐘", "🦄", "🐠"],
    planets: ["🌍", "🌕", "🌞", "🪐", "🌌", "🌠", "🌑", "🌙"],
    flags: ["🇺🇸", "🇬🇧", "🇨🇦", "🇯🇵", "🇫🇷", "🇩🇪", "🇦🇺", "🇧🇷"]
  };
  
  let selectedCategory = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  const landingPage = document.querySelector(".landing-page");
  const gameContainer = document.querySelector(".game-container");
  const cardsGrid = document.querySelector(".cards-grid");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const gameOverMessage = document.querySelector(".game-over-message");
  const finalScoreDisplay = document.getElementById("final-score");
  const playAgainButton = document.getElementById("play-again");
  
  document.querySelectorAll(".category-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      selectedCategory = categories[button.dataset.category];
      startGame();
    });
  });
  
  function startGame() {
    landingPage.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    initializeCards();
    startTimer();
  }
  
  function initializeCards() {
    const cards = [...selectedCategory, ...selectedCategory];
    cards.sort(() => Math.random() - 0.5);
    cardsGrid.innerHTML = "";
    cards.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = item;
      card.addEventListener("click", handleCardClick);
      cardsGrid.appendChild(card);
    });
  }
  
  function handleCardClick(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
      card.classList.add("flipped");
      card.textContent = card.dataset.value;
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }
  
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      score += 10;
      scoreDisplay.textContent = score;
      if (matchedPairs === selectedCategory.length) {
        endGame(true);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
      }, 1000);
    }
    flippedCards = [];
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        endGame(false);
      }
    }, 1000);
  }
  
  function endGame(isWin) {
    clearInterval(timer);
    gameOverMessage.classList.remove("hidden");
    finalScoreDisplay.textContent = score;
    if (isWin) {
      gameOverMessage.querySelector("h2").textContent = "You Win!";
    }
  }
  
  playAgainButton.addEventListener("click", () => {
    location.reload();
  });