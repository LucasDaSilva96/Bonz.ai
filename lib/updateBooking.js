const { getBookingById } = require('./getBookingById');

exports.updateBooking = async (bookingID) => {
  try {
    const booking = await getBookingById(bookingID);

    if (!booking) {
      throw new Error('Booking not found');
    }

    // const params = {
    //   TableName: 'booking-db',
    //   Key: {
    //     id: bookingID,
    //   },
    //   UpdateExpression: 'set #status = :status',
    //   ExpressionAttributeNames: {
    //     '#status': 'status',
    //   },
    //   ExpressionAttributeValues: {
    //     ':status': 'checked-in',
    //   },
    // };

    // await db.update(params);

    return booking;
  } catch (error) {
    console.error('Error updating booking', error);
    throw error;
  }
};
