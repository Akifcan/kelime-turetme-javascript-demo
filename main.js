const startScreen = document.querySelector('[start]')
const gameScreen = document.querySelector('[game]')
const words = gameScreen.querySelector('.words')
const input = gameScreen.querySelector('input')



let wordList = []
let lastLetter = ''

window.addEventListener('DOMContentLoaded', _ => {
    startGame()
    wordFromUser()
})

function startGame(){
    startScreen.querySelector('button').addEventListener('click', _ => {
        startScreen.style.display = 'none'
        loadWords()
        .then(words => {
            wordList = words.words
            hideLetters()
            generateWord(true)
            gameScreen.style.display = 'block'
        })
    })
}

function wordFromUser(){
    input.addEventListener('keyup', e => {
        if(e.key == 'Enter'){
            if(input.value.slice(0, 1) != lastLetter){
                addWord(`Girdiğiniz kelimenin başlangıcı <b>${lastLetter}</b> olmalı`, 'alert')
                input.value = ''
            }
            else if(input.value.length <= 2){
                addWord('En az 3 karakter girin', 'alert')
            }else if(wordList.find(word => word == input.value)){
                addWord(input.value, 'user')
                generateWord(false, input.value.slice(-1))
                input.value = ''
            }else{
                addWord('Böyle bir kelime yok', 'alert')
            }
        }
    })
}

function generateWord(start, letter){
    let wordLength 
    if(letter){
        wordLength = wordList.filter(word => word.startsWith(letter)).length
    }
    const randomWord = letter ? wordList.filter(word => word.startsWith(letter))[Math.floor(Math.random() * wordLength - 1)]  : wordList[Math.floor(Math.random() * wordList.length - 1)]
    lastLetter = randomWord.slice(-1)

    addWord(randomWord, 'computer')
    if(start){
        addWord(`Başlangıç kelimesi: <b>${lastLetter}</b> `, 'alert')
    }
}

function addWord(text, className){
    const div = document.createElement('div')
    div.classList = `word ${className}`
    div.innerHTML = text
    words.appendChild(div)
    words.scrollTop = words.clientHeight;
}   


async function loadWords(){
    const response = await fetch('./words.json')
    return await response.json()
}

function hideLetters(){
    document.querySelectorAll('.letter').forEach(letter => {
        letter.style.display = 'none'
    })
}

        