const { getBookingById } = require('../../lib/getBookingById');
const { sendError, sendResponse } = require('../../responses');

exports.handler = async (event) => {
  // Get the booking ID from the path parameters
  const { id } = event.pathParameters;
  if (!id) return sendError(400, 'Booking ID is required');
  // Get the booking
  try {
    const booking = await getBookingById(id);
    return sendResponse(booking);
  } catch (error) {
    console.error('Error getting booking', error);
    return sendError(400, error.message);
  }
};
