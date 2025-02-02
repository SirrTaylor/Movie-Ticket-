
document.addEventListener("DOMContentLoaded", () => {
  const cinema = document.getElementById("cinema");
  const reservationForm = document.getElementById("reservation-form");

  const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || {}; // Initialize to empty object if nothing in localStorage

  const ROWS = 8;
  const COLS = 8;
  const TOTAL_SEATS = ROWS * COLS;

  createCinemaGrid(cinema, ROWS, COLS);

  Object.keys(reservedSeats).forEach((seat) => {
      const seatElement = document.getElementById(seat);
      if (seatElement) {
          seatElement.classList.add("reserved");
      }
  });

  cinema.addEventListener("click", (e) => {
      if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
          e.target.classList.toggle("selected");
      }
  });

  reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedSeats = document.querySelectorAll(".seat.selected");

      const userName = localStorage.getItem("user-name");
      const userEmail = localStorage.getItem("email_!");
      const password = localStorage.getItem("password");

      if (!userName) {
          alert("Please sign up first.");
          return;
      }

      if (selectedSeats.length === 0) {
          alert("Please select at least one seat.");
          return;
      }

      const selectedSeatIds = [];

      selectedSeats.forEach((seat) => {
          seat.classList.remove("selected");
          seat.classList.add("reserved");
          const seatId = seat.id;
          reservedSeats[seatId] = userName;
          selectedSeatIds.push(seatId);
      });
     //adds to reserved seats
      localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
      alert("Reservation successful!");

      const userDataString = localStorage.getItem("userBookingDetails");
      if (userDataString) {
          const userData = JSON.parse(userDataString);
          userData.selectedSeats = selectedSeatIds; 
          localStorage.setItem("userBookingDetails", JSON.stringify(userData));
          
      } else {
          // Handle the case where userBookingDetails doesn't exist yet.
          const userData = {
              userName: userName, 
              userEmail: userEmail,
              password:password,
              selectedSeats: selectedSeatIds,
          };
          localStorage.setItem("userBookingDetails", JSON.stringify(userData)); // Create it.
        
      }

  });
});

function createCinemaGrid(cinema, rows, cols) {
  
  const numberLine = document.createElement("div");
  numberLine.classList.add("number-line");

  for (let col = 1; col <= cols; col++) {
    const number = document.createElement("span");
    number.classList.add("number");
    number.innerText = col;
    numberLine.appendChild(number);

    
    if (col === 2 || col === 6) {
      const gap = document.createElement("span");
      gap.classList.add("gap");
      numberLine.appendChild(gap);
    }
  }

  cinema.appendChild(numberLine);

  // Create the grid with vertical alphabetical line 
  for (let row = 0; row < rows; row++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    const rowLabel = document.createElement("span");
    rowLabel.classList.add("row-label");
    rowLabel.innerText = String.fromCharCode(65 + row); 
    rowContainer.appendChild(rowLabel);

    // Add the seats for this row
    for (let col = 1; col <= cols; col++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      const seatId = `${String.fromCharCode(65 + row)}${col}`; // e.g., "A1", "B2"
      seat.id = seatId; // Set the seat ID
      seat.dataset.seatNumber = row * cols + col; // Unique seat number
      rowContainer.appendChild(seat);

      
      if (col === 2 || col === 6) {
        const gap = document.createElement("div");
        gap.classList.add("gap");
        rowContainer.appendChild(gap);
      }
    }

    cinema.appendChild(rowContainer);
  }
}


function loadLogin(){
  window.open("login.html", "_self")
}

function loadMovie(){
  window.open("MovieList.html", "_self")
}
// ... (createCinemaGrid, loadLogin, and loadMovie functions remain the same)