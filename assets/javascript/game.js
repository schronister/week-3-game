// list of secret words to guess
var secretWords = ["test", "words","hahaha", "lololololol"];

var wordToGuess;

//arrays to hold incorrect and correct guesses
var incorrectGuesses = [];
var correctGuesses = [];

//variable to check if game is over
var gameOver == false;




//======FUNCTIONS========

//pick a word from secretWords list, save it as wordToGuess array and display it as _ _ _ _ _ for the game.
function showWord(){
	wordToGuess = secretWords[Math.floor(Math.random()*(secretWords.length-1))].split("");
	console.log(wordToGuess);
	//use an array to hold the spaces for guessed letters (can replace with letters from wordToGuess)
	var lettersArray = []
	for (var i = 0; i < wordToGuess.length; i++){	
		lettersArray.push("_ ");

	};
	var addLine = document.createElement("p");
		addLine.innerHTML = lettersArray.join("");
		document.getElementById("wordToGuess").appendChild(addLine);
}

//kick off the game on page load
window.onload = function(){
	showWord();
}


//getting user input, checking for matches, update the display
document.onkeyup = function(event){
	if(gameOver === true){
		return;
	}
	
	var entry = String.fromCharCode(event.keyCode).toLowerCase();

}



//get user input and check if it's a match

//update letters display

//win or lose