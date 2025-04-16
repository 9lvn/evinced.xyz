const box = document.getElementById("box")
const scoreText = document.getElementById("score")
const timerText = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")

let score = 0
let timeLeft = 15
let gameRunning = false
let timerInterval

function moveBox() {
  const x = Math.random() * (window.innerWidth - 100)
  const y = Math.random() * (window.innerHeight - 100)
  box.style.left = x + "px"
  box.style.top = y + "px"
}

box.addEventListener("click", () => {
  if (!gameRunning) return
  score++
  scoreText.textContent = "score: " + score
  moveBox()
})

function startGame() {
  score = 0
  timeLeft = 15
  gameRunning = true
  scoreText.textContent = "score: 0"
  timerText.textContent = "time: 15"
  box.style.display = "block"
  moveBox()

  timerInterval = setInterval(() => {
    timeLeft--
    timerText.textContent = "time: " + timeLeft
    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      gameRunning = false
      box.style.display = "none"
      alert("ggez twin 😮‍💨 score: " + score)
    }
  }, 1000)
}

startBtn.addEventListener("click", startGame)
