/*
GAME FUNCTION
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// Ui elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again')
   {
     window.location.reload();
   }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  // validation of whether the entered value is a number
  if(isNaN(guess) || guess < min || guess > max)
  {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum)
  {
    gameOver(true, `${winningNum} is correct. YOU WIN!`);
  }
  else {
       guessesLeft-=1;
       if(guessesLeft === 0)
       {
        gameOver(false,`Game Over! You lost. correct No. was ${winningNum}`)
      }
       else{
        //  game continues answer wring

        // // Change border color
        guessInput.style.borderColor = 'red';

        // Clear input
        guessInput.value = '';

        // Tell user its the wrong answer
        setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');

       }
  }
});

// Set message function
function setMessage(msg, color)
{
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg)
{
  let color;
  won === true ? color = 'green': color = 'red';

  // Disable input 
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;

  // Set message for winning
   setMessage(msg, color);

  //  Play Again

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}
// In other languages function must be defined before being used but thats not the case with js. Wherever we write the function definition, it will be hoisted to the top while executing.
function getRandomNum(min, max){
    console.log(Math.floor(Math.random()*(max-min+1)+min));
    return Math.floor(Math.random()*(max-min+1)+min);
}