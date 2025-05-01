// --- Get HTML Elements ---
const lowerBoundSpan = document.getElementById('lower-bound');
const upperBoundSpan = document.getElementById('upper-bound');
const maxGuessesSpan = document.getElementById('max-guesses');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const feedbackPara = document.getElementById('feedback');
const attemptsInfoPara = document.getElementById('attempts-info');
const restartButton = document.getElementById('restartButton');

// --- Game Variables ---
let lower_bound;
let upper_bound;
let secret_number;
let max_guesses;
let guesses_taken;

// --- Initialize the Game ---
function initializeGame() {
    lower_bound = 1;
    upper_bound = 50;
    max_guesses = 7;
    guesses_taken = 0;

    // Generate secret number (inclusive range)
    secret_number = Math.floor(Math.random() * (upper_bound - lower_bound + 1)) + lower_bound;
    console.log("Secret Number (for testing):", secret_number); // Optional: for debugging

    // Update the UI
    lowerBoundSpan.textContent = lower_bound;
    upperBoundSpan.textContent = upper_bound;
    maxGuessesSpan.textContent = max_guesses;
    guessInput.min = lower_bound;
    guessInput.max = upper_bound;
    guessInput.value = ''; // Clear previous input
    feedbackPara.textContent = ''; // Clear previous feedback
    feedbackPara.className = 'feedback'; // Reset feedback styling
    attemptsInfoPara.textContent = `Attempts remaining: ${max_guesses}`;
    guessInput.disabled = false;
    guessButton.disabled = false;
    restartButton.style.display = 'none'; // Hide restart button initially
    guessInput.focus(); // Put cursor in input box
}

// --- Handle Guess ---
function handleGuess() {
    const guessStr = guessInput.value;

    // --- Input Validation ---
    if (guessStr === '') {
        setFeedback("Please enter a number.", "error");
        return; // Stop processing if input is empty
    }

    const guess = parseInt(guessStr);

    if (isNaN(guess)) {
        setFeedback("That's not a valid number.", "error");
        guessInput.value = ''; // Clear invalid input
        return;
    }

    if (guess < lower_bound || guess > upper_bound) {
        setFeedback(`Please enter a number between ${lower_bound} and ${upper_bound}.`, "error");
        return;
    }

    // --- Process Valid Guess ---
    guesses_taken++;
    const attempts_remaining = max_guesses - guesses_taken;
    attemptsInfoPara.textContent = `Attempts remaining: ${attempts_remaining}`;

    // --- Compare guess to secret number ---
    if (guess < secret_number) {
        setFeedback("Too low!", "info");
    } else if (guess > secret_number) {
        setFeedback("Too high!", "info");
    } else {
        // Correct guess!
        setFeedback(`CONGRATULATIONS! You guessed the number ${secret_number}!`, "win");
        endGame();
        return; // Exit function, game over
    }

    // --- Check for Loss Condition ---
    if (guesses_taken >= max_guesses) {
        setFeedback(`Sorry, you've run out of guesses. The number was ${secret_number}.`, "loss");
        endGame();
    }

    guessInput.value = ''; // Clear input for next guess
    guessInput.focus(); // Focus back on input
}

// --- Set Feedback Message and Style ---
function setFeedback(message, type) {
    feedbackPara.textContent = message;
    feedbackPara.className = `feedback ${type}`; // Add class for styling (win, loss, info, error)
}

// --- End the Game (Win or Loss) ---
function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.style.display = 'inline-block'; // Show restart button
}

// --- Event Listeners ---
guessButton.addEventListener('click', handleGuess);

// Allow pressing Enter key in the input field to submit guess
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior (if any)
        handleGuess();
    }
});

restartButton.addEventListener('click', initializeGame);

// --- Start the game when the page loads ---
initializeGame();
