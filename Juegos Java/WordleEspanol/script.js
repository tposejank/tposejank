var content = ''
var request = new XMLHttpRequest()
var signal = document.getElementById('status')

var words = []
var wordsForLetters = []
var wordLength = 0

var word = ""
var wordLetterArray = []

var gameProcessor = document.getElementById('game')

request.open('GET', "https://raw.githubusercontent.com/javierarce/palabras/master/listado-general.txt", true)
request.send();
request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
        content = request.responseText

        words = content.split("\n");
        console.log(words)
    }
}

function confirm() {
    var dropdown = document.getElementById('dropdown-num-letras')
    var lengthWords = dropdown.value;
    console.log(lengthWords)

    signalStatus("Calculando palabras de " + lengthWords + " letras")
    for (var i = 0; i < words.length; i++) {
        if (words[i].length == parseInt(lengthWords)) {
            wordsForLetters.push(words[i]); continue
        }
    }
    signalStatus("" + wordsForLetters.length + " palabras encontradas.")
    console.log(wordsForLetters)
    document.getElementById('start').style.display = "block"

    wordLength = parseInt(lengthWords)
}

function startGame() {
    word = wordsForLetters[getRandomInt(0, wordsForLetters.length)]
    wordLetterArray = word.split('')

    document.getElementById('wordGuess').style.display = "block"
    document.getElementById('guess').style.display = "block"
}

function guess() {
    // [["has", "a"], ["is", "b"], ["not", "c"]]
    var addFormat = []

    var wordGuessed = document.getElementById('wordGuess').value
    if (wordGuessed.length == wordLength) {
        var wordGuessedLetterArray = wordGuessed.split("")
        
        for (var i = 0; i < wordGuessedLetterArray.length; i++) {
            var letter = wordGuessedLetterArray[i]

            if (letter == wordLetterArray[i]) {
                addFormat.push(["is", letter])
            } else {
                if (logicFind(letter, wordLetterArray, addFormat)) {
                    addFormat.push(["has", letter])
                } else {
                    addFormat.push(["not", letter])
                }
            }
        }
    }

    console.log(addFormat)
}

function logicFind(letter, letterArray, addFormat) {
    var repeated = 0
    var letterRepeatedInWord = 0

    for (var i = 0; i < letterArray.length; i++) {
        if (letterArray[i] == letter) {
            letterRepeatedInWord++
        }
    }

    for (var i = 0; i < addFormat.length; i++) {
        if (addFormat[i] == ["has", letter]) {
            repeated++;
            return true
        }
        if (letterRepeatedInWord > repeated) break
    }
    return false
}

function addBoxes() {

}

function signalStatus(status) {
    signal.innerHTML = status
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}