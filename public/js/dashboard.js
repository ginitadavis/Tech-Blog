var modals = document.getElementsByClassName("modal");
var cards = document.getElementsByClassName("card");
// Get the button that opens the modal
var openBtns = document.getElementsByClassName("openBtn");

// Get the button that closes the modal
var closeBtns = document.getElementsByClassName("closeBtn");

// Function to open the modal
function openModal(index) {
  modals[index].style.display = "block";
}

// Function to close the modal
function closeModal(index) {
  modals[index].style.display = "none";
}

// Event listener for opening the modal
for (let i = 0; i < cards.length; i++) {
    let currentCard = cards[i];

    currentCard.children[1].addEventListener("click", () => openModal(i));//This references to the edit button

    currentCard.children[2].children[0].children[2].addEventListener("click", () => closeModal(i));// Event listener for closing the modal
}


