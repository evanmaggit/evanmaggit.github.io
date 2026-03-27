// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark

let rowA = [ "-", "-", "-" ];

let rowB = [ "-", "-", "-" ];

let rowC = [ "-", "-", "-" ];

// track the turn
let currentTurn = "x";

// track number of turns
let remainingTurns = 9;

// track if the game is over
let gameOver = false;

// set up blank variable for current player
let currentPlayer;

// return boolean true if all 3 submitted values match, then it's false
function spaceMatch(spaceA, spaceB, spaceC) {
  
    return ((spaceA == spaceB) && (spaceA == spaceC));
  
}

// get a handle on the DOM element to be updated with the outcome
let gameOutputMsg = document.querySelector("#gameResult span");

// call your function checkGameboard() with the 3 rows
function checkGameboard(a, b, c) {

    // set outcome to a draw
    let outcome = "d";

    // check column 0
    if (spaceMatch(a[0], b[0], c[0])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check column 1
    if (spaceMatch(a[1], b[1], c[1])) {
        if (a[1] != "-") outcome = a[1]; // set outcome to winner if not "-"
    }

    // check column 2
    if (spaceMatch(a[2], b[2], c[2])) {
        if (a[2] != "-") outcome = a[2]; // set outcome to winner if not "-"
    }

    // check row A
    if (spaceMatch(a[0], a[1], a[2])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check row B
    if (spaceMatch(b[0], b[1], b[2])) {
        if (b[0] != "-") outcome = b[0]; // set outcome to winner if not "-"
    }

    // check row C
    if (spaceMatch(c[0], c[1], c[2])) {
        if (c[0] != "-") outcome = c[0]; // set outcome to winner if not "-"
    }

    // check diagonal from top left
    if (spaceMatch(a[0], b[1], c[2])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check diagonal from bottom left
    if (spaceMatch(c[0], b[1], a[2])) {
        if (c[0] != "-") outcome = c[0]; // set outcome to winner if not "-"
    }

    return outcome; // return the final outcome
}

function clickSquare() {

    if ( (this.innerHTML == "") && (!gameOver) ) {

        this.innerHTML = currentTurn;
      
        this.classList.add("clicked");

        remainingTurns = remainingTurns - 1;

        console.log("Remaining turns: " + remainingTurns);

        if (this.id == "a1") rowA[0] = currentTurn;
      
        if (this.id == "a2") rowA[1] = currentTurn;
      
        if (this.id == "a3") rowA[2] = currentTurn;
      
        if (this.id == "b1") rowB[0] = currentTurn;
      
        if (this.id == "b2") rowB[1] = currentTurn;
      
        if (this.id == "b3") rowB[2] = currentTurn;
      
        if (this.id == "c1") rowC[0] = currentTurn;
      
        if (this.id == "c2") rowC[1] = currentTurn;
      
        if (this.id == "c3") rowC[2] = currentTurn;

        // output arrays to console
        console.log("Rows:");
      
        console.log(rowA);
      
        console.log(rowB);
      
        console.log(rowC);


        // get a handle on the DOM element to be updated with the outcome
        let gameOutputMsg = document.querySelector("#gameResult");

        // call your function checkGameboard() with the 3 rows
        let winState = checkGameboard(rowA, rowB, rowC);

        // tests the value of the function
        if (winState == "x") {
          
            gameOutputMsg.innerHTML = "x wins";
          
            gameOver = true;

        } else if (winState == "o") {
          
            gameOutputMsg.innerHTML = "o wins";
          
            gameOver = true;

        } else if ( (winState == "d") && (remainingTurns == 0) ) {
          
            gameOutputMsg.innerHTML = "draw";
          
            gameOver = true;

        }

        // reveal game outcome if game is over
        if (gameOver) {
          
            document.querySelector("#gameResult").style.display = "block";
          
        }

        // flip turn back and forth
        if (currentTurn == "x") currentTurn = "o";
      
        else currentTurn = "x";

        // update next player DOM element
        currentPlayer.innerHTML = currentTurn;

    }

}


// wait for the document to load before adding clickable events
document.addEventListener("DOMContentLoaded", function () {

    let allSpaces = document.querySelectorAll(".gameSpace");
 
    for (let eachSpace of allSpaces) {
      
        eachSpace.addEventListener("click", clickSquare);
      
    }

    currentPlayer = document.querySelector("#currentPlayer span");
  
    currentPlayer.indexHTML = currentTurn;

});