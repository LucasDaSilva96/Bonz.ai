// Som receptionist vill jag kunna se alla bokningar som gjorts för att få en överblick över hur beläggningen av hotellet ser ut.

const { getAllBookings } = require('../../lib/getAllBookings');
const { sendError, sendResponse } = require('../../responses');

exports.handler = async () => {
  try {
    const bookings = await getAllBookings();

    return sendResponse(bookings);
  } catch (error) {
    console.error('Error getting bookings', error);
    return sendError(500, error.message);
  }
};
