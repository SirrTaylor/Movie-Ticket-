const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats")) || {};
const userBookingDetails = JSON.parse(localStorage.getItem("userBookingDetails")) || {};
const form = document.getElementById("username-form");
const bookingsContainer = document.getElementById("bookings-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const loggeduser = localStorage.getItem("user-name");
  const userDataString = localStorage.getItem("userBookingDetails");
  //let userBookingDetails = userDataString ? JSON.parse(userDataString) : {};


  if (username === loggeduser ) { // Check if entered username matches logged in user
      // Check if the username exists as a value in reservedSeats
      let userFound = false;

      for (const seatId in reservedSeats) {
          if (reservedSeats[seatId] === username) {
              userFound = true;
              break; // Exit the loop once the user is found
          }
      }

      if (userFound) {
          displayBookings(username);
      } else {
          alert("No reservations found for this user."); // More specific message
      }
  } else {
      alert("Incorrect username. Please enter the username you used to log in.");
  }
});

function displayBookings(username) {
    bookingsContainer.innerHTML = ""; // Clear previous results

    const userSeats = []; 

    // Find all seats reserved by the current user.
    for (const seatId in reservedSeats) {
        if (reservedSeats[seatId] === username) {
            userSeats.push(seatId);
        }
    }


    if (userSeats.length > 0) {
      userSeats.forEach((seat) => {
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
    } else {
        bookingsContainer.innerHTML = `<div class="no-bookings">No bookings found for "${username}".</div>`;
    }
}

function deleteBooking(seat, username) {
 if (confirm(`Are you sure you want to delete booking for Seat ${seat}?`)) {
          delete reservedSeats[seat]; // Remove the seat from reservedSeats
          localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
    
          
          if (userBookingDetails && userBookingDetails[username] && userBookingDetails[username].selectedSeats) {
              userBookingDetails[username].selectedSeats = userBookingDetails[username].selectedSeats.filter(s => s !== seat);
    
              // Clean up userBookingDetails if no seats left
              if (userBookingDetails[username].selectedSeats.length === 0) {
                  delete userBookingDetails[username]; // Remove the user's data if no seats left

              }
              const userDataString = localStorage.getItem("userBookingDetails");
              if (userDataString) {
                const userData = JSON.parse(userDataString);
                userData.selectedSeats = userSeats; 
                localStorage.setItem("userBookingDetails", JSON.stringify(userData));
              }
              
              //localStorage.setItem("userBookingDetails", JSON.stringify(userBookingDetails));
          }
    
    displayBookings(username);
  }
}
  


