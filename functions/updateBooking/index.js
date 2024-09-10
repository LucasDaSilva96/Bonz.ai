// Som en gäst vill jag kunna ändra min bokning ifall mina planer ändras.
const { updateBooking } = require('../../lib/updateBooking');
const { sendError, sendResponse } = require('../../responses');

// Update a booking handler
exports.handler = async (event) => {
  // Get the booking ID from the path parameters
  const { id } = event.pathParameters;
  if (!id) return sendError(400, 'Booking ID is required');
  // Parse the request body
  const body = JSON.parse(event.body);

  if (!body) return sendError(400, 'Request body is required');

  // Remove the status field if it exists
  if (body.status) delete body.status;

  // Update the booking
  try {
    const updatedBooking = await updateBooking(id, body);
    return sendResponse({
      message: 'Booking successfully updated',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking', error);
    return sendError(500, error.message);
  }
};
