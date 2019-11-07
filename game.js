let ballX = 150
let ballY = 150
let ballDX = 2
let ballDY = 4

let boardW = 300
let boardH = 300
let paddleX = 150
let paddleH = 10
let paddleD = boardH - paddleH
let paddleW = 150

let canvas
let ctx
let gameLoop

function drawGameCanvas() {
  canvas = document.getElementById('gameBoard')

  if (canvas.getContext) {
    ctx = canvas.getContext('2d')

    gameLoop = setInterval(drawBall, 16)

    window.addEventListener('keydown', whatKey, true)
  }
}

function drawBall() {
  ctx.clearRect(0, 0, boardW, boardH)
  //pintamos el canvas
  ctx.fillStyle = 'thistle'
  ctx.beginPath()
  ctx.rect(0, 0, boardW, boardH)
  ctx.closePath()
  ctx.fill()
  //Dibujamos la bola
  ctx.fillStyle = 'tomato'
  ctx.beginPath()
  ctx.arc(ballX, ballY, 15, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = 'navy'
  ctx.beginPath()
  ctx.rect(paddleX, paddleD, paddleW, paddleH)
  ctx.closePath()
  ctx.fill()

  ballX += ballDX
  ballY += ballDY

  if (ballX + ballDX > boardW - 15 || ballX + ballDX < 15) {
    ballDX = -ballDX
  }

  if (ballY + ballDY < 15) {
    ballDY = -ballDY
  } else if (ballY + ballDY > boardH - 15) {
    if (ballX > paddleX && ballX < paddleX + paddleW) {
      ballDY = -ballDY
    } else {
      clearInterval(gameLoop)
      alert('game over 😅')
    }
  }
}

function whatKey(e) {
  switch (e.keyCode) {
    case 37:
      paddleX = paddleX - 20
      if (paddleX < 0) {
        paddleX = 0
      }
      break
    case 39:
      paddleX = paddleX + 20
      if (paddleX > boardW - paddleW) {
        paddleX = boardW - paddleW
      }
      break
  }
}
