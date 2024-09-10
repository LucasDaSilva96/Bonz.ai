// Som en gäst vill jag kunna ändra min bokning ifall mina planer ändras.

const { getBookingById } = require('../../lib/getBookingById');
const { updateBooking } = require('../../lib/updateBooking');
const { sendError, sendResponse } = require('../../responses');

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  if (!id) return sendError(400, 'Booking ID is required');

  try {
    const booking = await getBookingById(id);
    return sendResponse(booking);
  } catch (error) {
    console.error('Error updating booking', error);
    return sendError(500, error.message);
  }
};
