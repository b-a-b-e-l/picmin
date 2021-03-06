const width = 28
const grid = document.querySelector('.grid')
let squares = []
const scoreDisplay = document.getElementById('score')
let score = 0

//Define the layout / map
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

// Create the game board with the layout array and squares
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        }
    }
}

createBoard()

// Define starting point for pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// Control pacman
function control(event) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(event.key) {
        case "ArrowDown":
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex + width < width * width
                ) 
            pacmanCurrentIndex +=width
        break
        case "Down": // IE
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex + width < width * width
                ) 
            pacmanCurrentIndex +=width
        break
        case "ArrowUp":
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width > 0
                )
            pacmanCurrentIndex -=width
        break
        case "Up": // IE
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width > 0
                )
            pacmanCurrentIndex -=width
        break
        case "ArrowLeft":
            if (
                !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) 
                pacmanCurrentIndex -=1
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
        break
        case "Left": // IE
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) 
            pacmanCurrentIndex -=1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
        break
        case "ArrowRight":
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 28 - 1
                ) 
            pacmanCurrentIndex +=1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
        break
        case "Right": // IE
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 28 - 1
                ) 
            pacmanCurrentIndex +=1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
        break
}
squares[pacmanCurrentIndex].classList.add('pacman')
pacDotEaten()
powerPelletEaten()
checkGameOver()
checkWin()
}

document.addEventListener('keyup', control)

// Eat the pac-dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot'))
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score ++ 
    scoreDisplay.innerHTML = score
}

// Eat power-pellet
function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhost, 10000)
    }
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Create ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false 
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
]

// Make ghosts appear
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
    })

// Move ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval( function() {
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost')
        squares[ghost.currentIndex].classList.remove('scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
            } else direction = directions[Math.floor(Math.random() * directions.length)]

        if (ghost.isScared === true) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        if (
            ghost.isScared && 
            squares[ghost.currentIndex].classList.contains('pacman')
            ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }

    }, ghost.speed )
}

// Check game over
function checkGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
        ) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', control)
            scoreDisplay.innerHTML = 'Game O V E R'
        }

}

// Check win game
function checkWin() {
    if (score === 300) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = 'Winnerrrrr !!'
    }
}