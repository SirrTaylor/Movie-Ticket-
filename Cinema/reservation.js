// Fetch bookings from local storage
const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || {};
const form = document.getElementById("username-form");
const bookingsContainer = document.getElementById("bookings-container");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  displayBookings(username);
});

// Function to display bookings for a specific user
function displayBookings(username) {
  bookingsContainer.innerHTML = ""; 

  const userBookings = Object.entries(reservedSeats).filter(
    ([seat, name]) => name.toLowerCase() === username.toLowerCase()
  );

  if (userBookings.length === 0) {
    bookingsContainer.innerHTML = `<div class="no-bookings">No bookings found for "${username}".</div>`;
  } else {
    
    userBookings.forEach(([seat]) => {
      const bookingItem = document.createElement("div");
      bookingItem.classList.add("booking-item");

      const seatLabel = document.createElement("span");
      seatLabel.innerText = `Seat ${seat}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", () => deleteBooking(seat, username));

      bookingItem.appendChild(seatLabel);
      bookingItem.appendChild(deleteBtn);
      bookingsContainer.appendChild(bookingItem);
    });
  }
}

// Function to delete a booking
function deleteBooking(seat, username) {
  
  if (confirm(`Are you sure you want to delete booking for Seat ${seat}?`)) {
    delete reservedSeats[seat];
    
    localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
    displayBookings(username);
  }
}
