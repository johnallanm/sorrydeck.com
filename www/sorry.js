var deck = [];

function isDisplayTest() {
    return window.location.hash && window.location.hash == "#test";
}

function init() {
    updateScaling();

    window.addEventListener('resize', function () {
        updateScaling();
    });

    document.getElementById("backcard").addEventListener("click", function () {
        onCardClicked();
    });

    document.getElementById("numbercard").addEventListener("click", function () {
        onCardClicked();
    });

    document.getElementById("sorrycard").addEventListener("click", function () {
        onCardClicked();
    });
}

function onCardClicked() {
    hideCard();

    if (isDisplayTest()) {
        // Go straight to the next card if testing.
        showNextCard(); 
    }
    else {
        // The animation of hiding a card for a second is important. This makes it apparent when the card is
        // displayed twice in succession. Without this animation users think the phone did not recognize their
        // touch if the same card appears twice.
        setTimeout(function () { showNextCard(); }, 1200);
    }
}

function hideCard() {
    document.getElementById("backcard").style.display = "none";
    document.getElementById("numbercard").style.display = "none";
    document.getElementById("sorrycard").style.display = "none";
}

function showNextCard() {
    // This function assumes the previous card has already been hdiden.
    if (deck.length == 0)
        shuffleDeck();

    card = deck.shift();
    if (card.name == "Sorry")
        document.getElementById("sorrycard").style.display = "block";
    else {
        // Update the numbers.
        for (const name of ["topnumber", "middlenumber", "bottomnumber"])
            document.getElementById(name).textContent = card.name;

        for (const name of ["topnumberinstruction", "bottomnumberinstruction"]) {
            // Update the instructions text.
            var div = document.getElementById(name);
            div.innerHTML = card.instructions.join("</br>");

            // Slightly change the vertical alignment of the instructions based on the number of lines.
            div.classList.remove("numberinstruction1line");
            div.classList.remove("numberinstruction2lines");
            div.classList.remove("numberinstruction3lines");

            if (card.instructions.length == 1)
                div.classList.add("numberinstruction1line");
            else if (card.instructions.length == 2)
                div.classList.add("numberinstruction2lines");
            else if (card.instructions.length == 3)
                div.classList.add("numberinstruction3lines");
        }

        // Show the card.
        document.getElementById("numbercard").style.display = "block";
    }
}

function shuffleDeck() {
    addCardToDeck("Sorry", [], 4);
    addCardToDeck("1", ["Move from Start", "or move forward 1."], 5);
    addCardToDeck("2", ["Move from Start", "or more forward 2.", "<span class=\"boldnumberinstruction\">DRAW AGAIN.</span></b>"], 4);
    addCardToDeck("3", ["Move forward 3."], 4);
    addCardToDeck("4", ["Move backward 4."], 4);
    addCardToDeck("5", ["Move forward 5."], 4);
    addCardToDeck("7", ["Move forward 7", "or split between", "two pawns."], 4);
    addCardToDeck("8", ["Move forward 8."], 4);
    addCardToDeck("10", ["Move forward 10", "or backward 1."], 4);
    addCardToDeck("11", ["Move forward 11", "or change places", "with an opponent."], 4);
    addCardToDeck("12", ["Move forward 12."], 4);

    if (!isDisplayTest())
        deck.sort((a, b) => (a.randomorder > b.randomorder) ? 1 : -1)
}

function addCardToDeck(name, instructions, count) {
    if (isDisplayTest())
        count = 1;

    for (var i = 0; i < count; i++)
        deck.push({ "name": name, "instructions": instructions, "randomorder": Math.random() });
}

function updateScaling() {
    // Set a css property for the scaling.
    document.getElementById("backcard").style.display = "block";

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Bootstrap.
if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

