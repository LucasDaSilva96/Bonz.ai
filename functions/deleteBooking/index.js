// Som en gäst vill jag kunna avboka mitt rum ifall jag inte längre kan komma.

const { cancelBooking } = require('../../lib/cancelBooking');
const { sendError, sendResponse } = require('../../responses');

// Cancel a booking handler
exports.handler = async (event) => {
  // Get the booking ID from the path parameters
  const { id } = event.pathParameters;
  if (!id) {
    return sendError(400, 'Booking ID is missing');
  }

  // Cancel the booking
  try {
    await cancelBooking(id);

    // Return a success response
    return sendResponse({
      message: 'Booking cancelled successfully✅',
    });
  } catch (error) {
    console.error('Error deleting booking', error);
    return sendError(400, error.message);
  }
};
