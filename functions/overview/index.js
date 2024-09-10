// Som receptionist vill jag kunna se alla bokningar som gjorts för att få en överblick över hur beläggningen av hotellet ser ut.

const { getAllBookings } = require('../../lib/getAllBookings');
const { sendError, sendResponse } = require('../../responses');

// Get all bookings handler
exports.handler = async () => {
  try {
    // Get all bookings
    const bookings = await getAllBookings();

    if (!bookings || bookings.length === 0) {
      return sendResponse({
        message: 'No bookings yet created',
      });
    }

    return sendResponse(bookings);
  } catch (error) {
    console.error('Error getting bookings', error);
    return sendError(500, error.message);
  }
};
