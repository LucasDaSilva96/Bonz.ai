const { db } = require('../services/db');
const { v4 } = require('uuid');
const dayjs = require('dayjs');
const { roomTypes } = require('./roomsData');

exports.createBooking = async (
  name,
  email,
  amount_of_people,
  check_in,
  check_out
) => {
  try {
    const booking = {
      id: v4(),
      name,
      email,
      amount_of_people,
      check_in,
      check_out,
      created_at: dayjs().format('YYYY-MM-DD HH:mm'),
    };

    const { bookingDetails, totalCost } = calculateBooking(
      amount_of_people,
      check_in,
      check_out
    );

    booking.bookingDetails = bookingDetails;
    booking.totalCost = totalCost;
    booking.status = 'confirmed';

    return booking;
  } catch (error) {
    console.error('Error creating booking', error);
    throw error;
  }
  // const params = {
  //   TableName: 'booking-db',
  //   Item: booking,
  // };
  // try {
  //   await db.put(params);
  //   return booking;
  // } catch (error) {
  //   console.error('Error creating booking', error);
  //   throw error;
  // }
};

const calculateBooking = (guests, check_in, check_out) => {
  if (!guests || !check_in || !check_out) {
    throw new Error('Missing required fields');
  }

  check_in = dayjs(check_in);
  check_out = dayjs(check_out);

  const isBefore = dayjs(check_in).isBefore(check_out);
  if (!isBefore) {
    throw new Error('Check-in date must be before check-out date');
  }

  let nights = dayjs(check_out).diff(check_in, 'days');

  nights = nights < 1 ? 1 : nights;

  let remainingGuests = guests;
  const bookingDetails = [];

  for (let i = roomTypes.length - 1; i >= 0; i--) {
    const room = roomTypes[i];
    const roomsNeeded = Math.floor(remainingGuests / room.capacity);
    if (roomsNeeded > 0) {
      bookingDetails.push({
        type: room.type,
        rooms: roomsNeeded,
        cost: roomsNeeded * room.costPerNight * nights,
        capacity: room.capacity,
      });
      remainingGuests -= roomsNeeded * room.capacity;
    }
    if (roomsNeeded > 20) {
      throw new Error('The maximum number of rooms that can be booked is 20');
    }
  }

  if (remainingGuests > 0) {
    throw new Error(
      'It is not possible to book a room for the remaining guests'
    );
  }

  const totalCost = bookingDetails.reduce((sum, room) => sum + room.cost, 0);

  return {
    bookingDetails,
    totalCost,
  };
};
