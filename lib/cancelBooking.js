const dayjs = require('dayjs');
const { db } = require('../services/db');
const { getBookingById } = require('./getBookingById');

// Cancel a booking handler
exports.cancelBooking = async (bookingID) => {
  try {
    // Get the booking by ID
    const booking = await getBookingById(bookingID);

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if the booking can be cancelled
    const twoDaysBeforeCheckIn = dayjs(booking.checkInDate).subtract(2, 'day');

    // Check if the current date is within 48 hours of the check-in date
    if (!dayjs().isBefore(twoDaysBeforeCheckIn, 'day')) {
      throw new Error(
        'Booking cannot be cancelled within 48 hours of check-in date. Please contact the hotel directly for assistance.'
      );
    }

    // Delete the booking from the database
    await db.delete({
      TableName: 'booking-db',
      Key: {
        id: bookingID,
      },
    });

    return true;
  } catch (error) {
    console.error('Error cancelling booking', error);
    throw error;
  }
};
