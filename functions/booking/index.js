// Som en gäst vill jag kunna boka ett rum för att säkerställa min vistelse på hotellet.
// Som en gäst vill jag få en bekräftelse när jag har bokat ett rum för att veta att min bokning har gått igenom.

const { createBooking } = require('../../lib/createBooking');
const { sendError, sendResponse } = require('../../responses');
const { db } = require('../../services/db');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const { name, email, amount_of_people, check_in, check_out } = body;

  if (!name || !email || !amount_of_people || !check_in || !check_out) {
    return sendError(400, 'Missing required fields');
  }

  try {
    const booking = await createBooking(
      name,
      email,
      amount_of_people,
      check_in,
      check_out
    );

    await db.put({
      TableName: 'booking-db',
      Item: booking,
    });

    return sendResponse(booking);
  } catch (error) {
    return sendError(500, error.message);
  }
};
