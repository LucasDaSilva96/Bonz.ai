const { v4 } = require('uuid');
const dayjs = require('dayjs');
const { ROOMS_DATA } = require('./roomsData');

// Create a booking
const createBooking = async (
  name,
  email,
  guests,
  check_in,
  check_out,
  rooms
) => {
  try {
    //  The booking object
    const booking = {
      id: v4(),
      name,
      email,
      guests,
      check_in,
      check_out,
      created_at: dayjs().toISOString(),
    };

    // Calculate the booking cost, rooms and nights
    const {
      totalCost,
      rooms: ROOMS,
      nights,
    } = calculateBooking(guests, check_in, check_out, rooms);

    // Add the calculated values to the booking object
    booking.total_cost = totalCost;
    booking.rooms = ROOMS;
    // Set the booking status to confirmed
    booking.status = 'confirmed';
    booking.nights = nights;
    // Set the booking policy
    booking.policy = '❗Free cancellation 48h before check-in❗';
    return booking;
  } catch (error) {
    console.error('Error creating booking', error);
    throw error;
  }
};

// Calculate the booking cost, rooms and nights
const calculateBooking = (guests, check_in, check_out, rooms) => {
  if (!guests || !check_in || !check_out || !rooms) {
    throw new Error('Missing required fields');
  }

  // Check if the check-in and check-out dates are valid
  const nights = dayjs(check_out).diff(dayjs(check_in), 'days');
  if (nights <= 0) {
    throw new Error('Check-out date must be after check-in date');
  }

  // Create the booking rooms
  rooms = rooms.map((roomType) => {
    const roomData = ROOMS_DATA.find((room) => room.type === roomType.type);
    if (!roomData) {
      throw new Error(`Room type ${roomType.type} not found`);
    }
    return { ...roomType, ...roomData };
  });

  if (rooms.length === 0) {
    throw new Error('No rooms found');
  }

  // Check if the amount of rooms is valid and if it exceeds the maximum amount
  const amountOfRooms = rooms.reduce(
    (total, roomType) => total + roomType.amount,
    0
  );

  if (amountOfRooms > 20) {
    throw new Error('Invalid amount of rooms. Maximum 20 rooms can be booked');
  }

  // Combine the rooms with the same type
  for (let i = 0; i < rooms.length; i++) {
    for (let j = i + 1; j < rooms.length; j++) {
      if (rooms[i].type === rooms[j].type) {
        rooms[i].amount += rooms[j].amount;
        rooms.splice(j, 1);
        j--;
      }
    }
  }

  // Calculate the total cost
  const totalCost = rooms.reduce(
    (total, roomType) => total + roomType.costPerNight * roomType.amount,
    0
  );

  // Return the total cost, rooms and nights
  return { totalCost: totalCost * nights, rooms, nights };
};

module.exports = { calculateBooking, createBooking };
