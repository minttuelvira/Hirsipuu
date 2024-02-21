const input = document.querySelector('input')
const output = document.querySelector('output')
const guessCountDisplay = document.getElementById('guessCount')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''
let guessCount = 0

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    output.innerHTML = maskedWord
    guessCount = 0
    updateGuessCountDisplay()
}

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. You made ${guessCount} guesses.`)
    newGame()
}

const replaceFoundChars = (guess) => {
    guessCount++
    updateGuessCountDisplay()
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.substring(i, i + 1)
        if (char === guess) {
            let newString = maskedWord.split('')
            newString.splice(i, 1, guess)
            newString = newString.join('')
            maskedWord = newString
        }
    }
    output.innerHTML = maskedWord
    if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
        win()
    }
}

const updateGuessCountDisplay = () => {
    guessCountDisplay.textContent = guessCount
}

newGame()

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()

        const guess = input.value.toLowerCase()
        if (guess === randomizedWord.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            replaceFoundChars(guess)
        } else {
            alert("You guessed wrong!")
        }
        input.value = ''
    }
})
