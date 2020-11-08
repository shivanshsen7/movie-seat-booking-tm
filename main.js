const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value); // "let" coz, it may change 


// get data from localStorage amd populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIdx = JSON.parse(localStorage.getItem("selectedMovieIdx"));
  if (selectedMovieIdx !== null) {
    movieSelect.selectedIndex = selectedMovieIdx;
  }

  const selectedMovieTicketPrice = JSON.parse(localStorage.getItem("selectedMovieTicketPrice"));
  if (ticketPrice !== null) {
    ticketPrice = selectedMovieTicketPrice;
  }


}



// set movie Detail to local storage
const setMovieData = (movieIndex, ticketPrice) => {
  localStorage.setItem("selectedMovieIdx", movieIndex);
  localStorage.setItem("selectedMovieTicketPrice", ticketPrice);
}

// update  selcted seats count and its price along with saves the same to local storage
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = parseInt(selectedSeats.length);
  const seatIdx = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  //  saves the selcted seats count and its price to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatIdx));
  populateUI();
}

// on page load
window.addEventListener("load", (e) => {
  populateUI();
  updateSelectedCount();
})


// movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})


// seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")) {

    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
})
