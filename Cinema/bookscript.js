document.addEventListener("DOMContentLoaded", () => {
  const cinema = document.getElementById("cinema");

  
  for (let i = 1; i <= 64; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.dataset.seatNumber = i; 
    cinema.appendChild(seat);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cinema = document.getElementById("cinema");
  const reservationForm = document.getElementById("reservation-form");
  const userNameInput = document.getElementById("user-name");

  const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || {};

  // Mark reserved seats
  Object.keys(reservedSeats).forEach((seat) => {
    const seatElement = document.querySelector(`[data-seat-number="${seat}"]`);
    seatElement.classList.add("reserved");
  });

  cinema.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
      e.target.classList.toggle("selected");
    }
  });

  
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const userName = userNameInput.value.trim();

    if (selectedSeats.length === 0 || !userName) {
      alert("Please select at least one seat and enter your name.");
      return;
    }

    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("reserved");
      const seatNumber = seat.dataset.seatNumber;
      reservedSeats[seatNumber] = userName; // Save reservation
    });

    localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
    userNameInput.value = ""; 
    alert("Reservation successful!");
  });
});