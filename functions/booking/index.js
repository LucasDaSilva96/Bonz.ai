// Som en gäst vill jag kunna boka ett rum för att säkerställa min vistelse på hotellet.
// Som en gäst vill jag få en bekräftelse när jag har bokat ett rum för att veta att min bokning har gått igenom.

const { createBooking } = require('../../lib/createBooking');
const { sendError, sendResponse } = require('../../responses');
const { db } = require('../../services/db');

// Create a booking handler
exports.handler = async (event) => {
  // Parse the request body
  const body = JSON.parse(event.body);
  const { guestName, guestEmail, guests, checkInDate, checkOutDate, rooms } =
    body;

  // Validate the request body
  try {
    if (!guestName) throw new Error('Guest guestName is missing');
    if (!guestEmail) throw new Error('Guest guestEmail is missing');
    if (!guests) throw new Error('Amount of people is missing');
    if (guests < 1) throw new Error('Invalid amount of people');
    if (!checkInDate) throw new Error('Check-in date is missing');
    if (!checkOutDate) throw new Error('Check-out date is missing');
    if (!rooms) throw new Error('Room types are missing');

    // Validate the room types
    rooms.forEach((room) => {
      if (!room.type) throw new Error('Room type is missing');
      if (!room.amount) throw new Error('Room amount is missing');
      if (room.amount < 1) throw new Error('Invalid room quantity');
      if (
        room.type !== 'Single' &&
        room.type !== 'Double' &&
        room.type !== 'Suite'
      )
        throw new Error('Invalid room type. Must be Single, Double or Suite');
    });

    // Create the booking
    const booking = await createBooking(
      guestName,
      guestEmail,
      guests,
      checkInDate,
      checkOutDate,
      rooms
    );

    // Save the booking to the database
    await db.put({
      TableguestName: 'booking-db',
      Item: booking,
    });

    // Return a success response
    return sendResponse({
      message: 'Booking created successfully✅',
      booking: { ...booking, booking_id: booking.id },
    });
  } catch (error) {
    console.error('Error creating booking', error);
    return sendError(400, error.message);
  }
};
