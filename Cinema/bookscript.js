document.addEventListener("DOMContentLoaded", () => {
  const cinema = document.getElementById("cinema");
  const reservationForm = document.getElementById("reservation-form");

  // Fetch reserved seats from localStorage
  const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || {};

  // Constants for grid dimensions
  const ROWS = 8; // 8 rows (A-H)
  const COLS = 8; // 8 columns (1-8)
  const TOTAL_SEATS = ROWS * COLS;

  // Create the cinema grid with labels
  createCinemaGrid(cinema, ROWS, COLS);

  // Mark reserved seats
  Object.keys(reservedSeats).forEach((seat) => {
    const seatElement = document.getElementById(seat);
    if (seatElement) {
      seatElement.classList.add("reserved");
    }
  });

  // Handle seat selection
  cinema.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
      e.target.classList.toggle("selected");
    }
  });

  // Handle form submission
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedSeats = document.querySelectorAll(".seat.selected");

    // Get the username from localStorage
    const userName = localStorage.getItem("user-name");

    if (!userName) {
      alert("Please sign up first.");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("reserved");
      const seatId = seat.id; // Use the seat ID (e.g., "A1", "H4")
      reservedSeats[seatId] = userName; // Save reservation
    });

    localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
    alert("Reservation successful!");
  });
});

// Function to create the cinema grid with labels
function createCinemaGrid(cinema, rows, cols) {
  // Create the horizontal number line (column labels)
  const numberLine = document.createElement("div");
  numberLine.classList.add("number-line");

  for (let col = 1; col <= cols; col++) {
    const number = document.createElement("span");
    number.classList.add("number");
    number.innerText = col;
    numberLine.appendChild(number);

    // Add gaps after column 2 and column 6
    if (col === 2 || col === 6) {
      const gap = document.createElement("span");
      gap.classList.add("gap");
      numberLine.appendChild(gap);
    }
  }

  cinema.appendChild(numberLine);

  // Create the grid with vertical alphabetical line (row labels)
  for (let row = 0; row < rows; row++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    // Add the row label (alphabetical)
    const rowLabel = document.createElement("span");
    rowLabel.classList.add("row-label");
    rowLabel.innerText = String.fromCharCode(65 + row); // A, B, C, etc.
    rowContainer.appendChild(rowLabel);

    // Add the seats for this row
    for (let col = 1; col <= cols; col++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      const seatId = `${String.fromCharCode(65 + row)}${col}`; // e.g., "A1", "B2"
      seat.id = seatId; // Set the seat ID
      seat.dataset.seatNumber = row * cols + col; // Unique seat number
      rowContainer.appendChild(seat);

      // Add gaps after column 2 and column 6
      if (col === 2 || col === 6) {
        const gap = document.createElement("div");
        gap.classList.add("gap");
        rowContainer.appendChild(gap);
      }
    }

    cinema.appendChild(rowContainer);
  }
}