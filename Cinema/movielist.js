let selectedMovie = '';

    function showSelection(movieId) {
      selectedMovie = movieId;

      const descriptions = document.querySelectorAll('.description');
      descriptions.forEach(desc => {
        desc.style.display = 'none';
      });

      const selectedDescription = document.getElementById(movieId);
      if (selectedDescription) {
        selectedDescription.style.display = 'block';
      }

      const selectionContainer = document.getElementById('selection-container');
      selectionContainer.style.display = 'block';

      document.getElementById('day').selectedIndex = 0;
      document.getElementById('time').selectedIndex = 0;
      document.getElementById('day-checkbox').checked = false;
      document.getElementById('time-checkbox').checked = false;

      document.getElementById('continue-button').disabled = true;

      const daySelect = document.getElementById('day');
      const timeSelect = document.getElementById('time');
      daySelect.onchange = updateSelection;
      timeSelect.onchange = updateSelection;
    }

    function updateSelection() {
      const day = document.getElementById('day').value;
      const time = document.getElementById('time').value;
      const dayCheckbox = document.getElementById('day-checkbox');
      const timeCheckbox = document.getElementById('time-checkbox');
      const continueButton = document.getElementById('continue-button');
      const output = document.getElementById('output');

      dayCheckbox.checked = !!day;
      timeCheckbox.checked = !!time;

      continueButton.disabled = !(dayCheckbox.checked && timeCheckbox.checked);

      if (day && time) {
        output.innerHTML = `You selected <strong>${selectedMovie}</strong> on <strong>${day}</strong> at <strong>${time}<strong> you may continue to book a seat </strong>.`;
      } else {
        output.innerHTML = '';
      }
    }

    document.getElementById('continue-button').addEventListener('click', () => {
        const day = document.getElementById('day').value;
        const time = document.getElementById('time').value;
    
        const username = localStorage.getItem("user-name");
        const email = localStorage.getItem("email_1");
        const password = localStorage.getItem("password");
    
        // Get existing user data or create an empty object if it doesn't exist
        const userDataString = localStorage.getItem("userBookingDetails");
        let userBookingDetails = userDataString ? JSON.parse(userDataString) : {};
    
        if (username && email && password && selectedMovie && day && time) {  // All required data present
            if (!userBookingDetails[username] && !userBookingDetails[email] && !userBookingDetails[password]) { // Check if user exists
                userBookingDetails[email] = { // Create new user entry
                    username: username,
                    email: email,
                    password: password,
                    bookings: [{  // Store bookings as an array
                        movie: selectedMovie,
                        day: day,
                        time: time,
                    }],
                };
            } else {
                // User exists, add new booking to their bookings array
                userBookingDetails[email].bookings.push({
                    movie: selectedMovie,
                    day: day,
                    time: time,
                });
            }
    
            localStorage.setItem("userBookingDetails", JSON.stringify(userBookingDetails));
            console.log("User data:", userBookingDetails);
            window.open("Bookseat.html", "_self");
        } else {
            alert("Missing user or booking information.");
        }
    });

    function loadLogin(){
      window.open("login.html", "_self")
    };