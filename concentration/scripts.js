let clicks = 0;

let timeDelay = 1000;

function clearClicks() {

    let allClickedCards = document.querySelectorAll(".clicked");

    for (let eachCard of allClickedCards) {

        eachCard.classList.remove("clicked");

    }

    clicks++;

    document.querySelector("#turnCount span").innerHTML = clicks;

    let allCards = document.querySelectorAll(".card");

    let matchedCards = document.querySelectorAll(".matched");

    if (allCards.length == matchedCards.length) {

        console.log("all cards matched, player has won");

        document.querySelector("#winning").innerHTML = "You won!";

    }

}

function flipCard() {

    if (!this.classList.contains("matched")) {

        let allClickedCards = document.querySelectorAll(".clicked");

        if (allClickedCards.length < 2) {

            this.classList.add("clicked");

        }

        allClickedCards = document.querySelectorAll(".clicked");

        if (allClickedCards.length == 2) {

            let card1 = allClickedCards[0].classList.toString();

            let card2 = allClickedCards[1].classList.toString();

            if (card1 == card2) {

                console.log("it's a match!");

                allClickedCards[0].classList.add("matched");

                allClickedCards[1].classList.add("matched");

            } else {

                console.log("not a match");
                
            }

            window.setTimeout(clearClicks, timeDelay);

        }

    }

}

document.addEventListener("DOMContentLoaded", function (e) {

    let allCards = document.querySelectorAll(".card");

    let gameboard = document.querySelector("#gameBoard");

    for (x = 0; x < allCards.length; x++) {
        
        let randNum = Math.floor(Math.random() * allCards.length);

        gameboard.insertBefore(allCards[x], gameboard.children[randNum]);

        allCards[x].addEventListener("click", flipCard);

    }

});