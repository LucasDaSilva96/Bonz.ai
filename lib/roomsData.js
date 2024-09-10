// This file contains the data for the rooms in the hotel. Each room has a type, capacity, and cost per night. This data is used to calculate the total cost of a booking based on the number of guests, check-in and check-out dates, and the selected rooms. The calculateBooking function takes the guest count, check-in and check-out dates, and selected rooms as input and returns the total cost, rooms, and nights for the booking. The ROOMS_DATA array contains the data for the different room types available in the hotel. This data is used to calculate the cost of the booking based on the selected rooms. The ROOMS_DATA array is exported so that it can be used in other files in the application.
exports.ROOMS_DATA = [
  { type: 'Single', capacity: 1, costPerNight: 500 },
  { type: 'Double', capacity: 2, costPerNight: 1000 },
  { type: 'Suite', capacity: 3, costPerNight: 1500 },
];
