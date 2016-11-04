// list of secret words to guess
var secretWords = ["zobrist", "soler", "bryant", "coghlan", "fowler", "almora", "heyward", "baez", "russell", "rizzo", "lester", "hendricks", "arrieta", "lackey", "hammel", "contreras", "montero", "ross", "schwarber", "chapman", "rondon", "wood", "strop", "edwards", "grimm", "montgomery"];
var images = ["http://mlb.mlb.com/mlb/images/players/head_shot/450314.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/624585.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/592178.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/458085.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/451594.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/546991.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/518792.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/595879.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/608365.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/519203.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/452657.jpg",
"http://mlb.mlb.com/mlb/images/players/head_shot/543294.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/453562.jpg","http://mlb.mlb.com/mlb/images/players/head_shot/407793.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/434628.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/575929.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/471083.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/424325.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/656941.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/547973.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/444468.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/475243.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/467008.jpg", 
"http://mlb.mlb.com/mlb/images/players/head_shot/605218.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/518748.jpg", "http://mlb.mlb.com/mlb/images/players/head_shot/543557.jpg"]
var wordToGuess;

//arrays to hold incorrect and correct guesses
var incorrectGuesses = [];
var correctGuesses = [];
var lettersArray = [];
var addLine;

//variable to check if game is over
var gameOver = false;
var guessesLeft = 10;



//======FUNCTIONS========

//pick a word from secretWords list, save it as wordToGuess array and display it as _ _ _ _ _ for the game.
function startup(){
	var randIndex = Math.floor(Math.random()*(secretWords.length-1))
	wordToGuess = secretWords[randIndex].split("");
	document.getElementById("playerPhoto").innerHTML = '<img src="'+images[randIndex]+'" class="hidden">'
	console.log(wordToGuess);
	//use an array to hold the spaces for guessed letters (can replace with letters from wordToGuess)
	for (var i = 0; i < wordToGuess.length; i++){	
		lettersArray.push("_ ");

	};
	addLine = document.createElement("p");
	addLine.innerHTML = lettersArray.join("");
	document.getElementById("wordToGuess").appendChild(addLine);
	document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
}

//kick off the game on page load
window.onload = function(){
	startup();
	//getting user input, checking for matches, update the display

}

document.onkeyup = function(event){
		if(gameOver === true){
			return;
		}
		//get user input and save it to a variable
		var userInput = String.fromCharCode(event.keyCode).toLowerCase();
		//use a boolean to check for matches (so we can loop through the whole word for duplicates)
		var matchFound = false;
		var alreadyGuessed = false;
		//loop through every letter in the word to guess to check for matches.
		for (var i = 0; i < wordToGuess.length; i++){
			if (userInput === wordToGuess[i]){
				//update the lettersarray w/ correct letter(s)
				lettersArray[i] = wordToGuess[i].toUpperCase();
				//update the display of the letters
				addLine.innerHTML = lettersArray.join("");
				//set the boolean to true 
				matchFound = true;
				document.querySelector("#alreadyGuessed").innerHTML = "";
			}
			//check if the current guess has already been made, don't penalize player if so.
			else if (userInput === incorrectGuesses[i]){
				alreadyGuessed = true;
				document.querySelector("#alreadyGuessed").innerHTML = "Already guessed that!";
			}
		}
		//if match was found, check whether user has won
		if (matchFound === true || alreadyGuessed === true){
			console.log("correct guess");
			if (lettersArray.includes("_ ") === false){
				console.log("Game over - WIN");
				gameOver = true;
				document.querySelector(".hidden").className = "show";
				document.querySelector("#message").innerHTML = "Congratulations! You win.<br> Press the spacebar"
				+ " to start a new game.";
				document.onkeyup = function(event){
					if(event.keyCode === 32){
						location.reload();
					}
				}
			}
		} else{
			//clear out alreadyGuessed
			document.querySelector("#alreadyGuessed").innerHTML = "";
			//checking if user is out of guesses (and updating guesses tag)
			incorrectGuesses.push(userInput);
			document.querySelector("#lettersGuessed").innerHTML = "Incorrect Guesses: " +incorrectGuesses.join(" ").toUpperCase();
			guessesLeft--;
			console.log("incorrect guess");
			document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
			if (guessesLeft === 0){
				console.log("Game over - LOSS");
				gameOver = true;
				document.querySelector(".hidden").className = "show .img-responsive";
				document.querySelector("#message").innerHTML = "Sorry, there's always next year.  The answer was " + wordToGuess.join("").toUpperCase() + ".<br> Press the spacebar"
				+ " to start a new game.";
				//start a new game with spacebar:
				document.onkeyup = function(event){
					if(event.keyCode === 32){
						location.reload();
					}
				}
			}
		}
	}

