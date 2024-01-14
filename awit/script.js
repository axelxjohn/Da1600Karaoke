// script.js

// Initialize the booked room quantities
var bookedStandardRooms = 0;
var bookedPremiumRooms = 0;

function confirmBooking() {
    var selectedDate = document.getElementById('date').value;
    var selectedTime = document.getElementById('time').value;
    var selectedRoom = document.getElementById('room').value;
    var roomPrice = getRoomPrice(selectedRoom); // Get the price based on the selected room

    // Combine selected date and time for comparison
    var selectedDateTime = new Date(`${selectedDate} ${selectedTime}`);

    // Get the current date and time
    var currentDate = new Date();

    // Check if the selected date and time are in the future
    if (selectedDateTime <= currentDate) {
        alert('Selected date and time must be in the future. Please choose a valid date and time.');
        return false; // Prevent form submission
    }
    
    // Customize the confirmation message with user-selected information and room price
    var confirmationMessage = `Please confirm your booking details:\nDate: ${selectedDate}\nTime: ${selectedTime}\nRoom: ${selectedRoom}\nPrice: ${roomPrice} Pesos`;

    // Show a confirmation dialog
    var userConfirmation = confirm(confirmationMessage);

    // If the user confirms, proceed with the booking
    if (userConfirmation) {
        // Add the booked details to the table
        addBookingToTable(selectedDate, selectedTime, selectedRoom);

        // You can add any other logic here for post-booking actions if needed

        // Construct the URL with parameters for the alternative link
        var confirmationUrl = `confirmation.html?date=${selectedDate}&time=${selectedTime}&room=${selectedRoom}&price=${roomPrice}`;

        // Redirect to the confirmation page with the constructed URL
        window.location.href = confirmationUrl;

        // Prevent form submission to avoid page reload
        return false;
    } else {
        // If the user cancels, prevent the form submission
        alert('Booking canceled.');
        return false;
    }
}

function addBookingToTable(date, time, room) {
    // Get the table body
    var tableBody = document.querySelector('#booking-table tbody');

    // Create a new row
    var newRow = tableBody.insertRow();

    // Insert cells with booked details
    newRow.insertCell(0).textContent = date;
    newRow.insertCell(1).textContent = time;
    newRow.insertCell(2).textContent = room;
    newRow.insertCell(3).textContent = 'Booked';
}

function updateCurrentTime() {
    var currentDate = new Date();
    var currentDateTimeString = currentDate.toLocaleString();
    document.getElementById('currentDateTime').innerText = `${currentDateTimeString}`;
}

// Function to get the room price based on the selected room
function getRoomPrice(selectedRoom) {
    if (selectedRoom === 'Standard Room') {
        return 450;
    } else if (selectedRoom === 'Premium Room') {
        return 1500;
    }
    // Add more conditions for other room types if needed
}

document.addEventListener('DOMContentLoaded', function () {
    // Display the current date and time when the page loads
    updateCurrentTime();

    // Set up an interval to update the current time every second
    setInterval(updateCurrentTime, 1000);

    // Set the minimum value for the date input
    document.getElementById('date').min = new Date().toISOString().split('T')[0];

    // Set the minimum and maximum values for the time input
    document.getElementById('time').min = '16:00';
    document.getElementById('time').max = '02:00';
});
