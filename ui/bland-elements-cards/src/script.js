// Just for the toogle 

const Toggle = document.getElementById("toggle");
const radioButtons = document.querySelector(".no-radio-buttons");
const radioCards = document.querySelector(".radio-cards");
Toggle.addEventListener("click", () => {
  radioButtons.classList.toggle("no-radio-buttons");
  radioButtons.classList.toggle("radio-buttons");

  radioCards.classList.toggle("radio-cards");
  radioCards.classList.toggle("no-radio-cards");
});