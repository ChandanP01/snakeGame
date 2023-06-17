// Game Constants & variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOver = new Audio('/music/gameover.mp3')
const moveSound = new Audio('/music/move.mp3')
const musicSound = new Audio('/music/music.mp3')
let speed = 5
let lastPaintTime = 0
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 5, y: 6 }
let score = 0
const scoreOnPage = document.querySelector('#score')
const hiscoreBox = document.querySelector('#hiscore')

// Game Function
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true
    }
}

function gameEngine() {
    // Part 1 : Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOver.play()
        musicSound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game over, Press any key to play again")
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        score += 1
        foodSound.play()
        if(score > hiscoreval){
            hiscoreval = score
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = `High Score : ${hiscoreval}`
        }
        if(score >= 0 && score <= 5){
            speed = 5
        } else if(score > 5 && score <= 10){
            speed = 6
        } else if(score > 10 && score <= 15){
            speed = 8
        } else{
            speed = 10
        }
        scoreOnPage.innerHTML = `Score : ${score}`
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y


    // part 2 : Display the snake and food
    // Display the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    // Display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// Main logic starts from here
let hiscore = localStorage.getItem('hiscore')
if (hiscore == null) {
    hiscoreval = 0
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
} else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = `High Score : ${hiscore}`
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 }    // start the game
    musicSound.play()
    moveSound.play()
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0
            inputDir.y = -1
            break;
        case 'ArrowDown':
            inputDir.x = 0
            inputDir.y = 1
            break;
        case 'ArrowLeft':
            inputDir.x = -1
            inputDir.y = 0
            break;
        case 'ArrowRight':
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            break;
    }
})