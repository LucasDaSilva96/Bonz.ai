const { db } = require('../services/db');

exports.getBookingById = async (bookingID) => {
  try {
    const params = {
      TableName: 'booking-db',
      Key: {
        id: bookingID,
      },
    };

    const { Item } = await db.get(params);

    return Item;
  } catch (error) {
    console.error('Error getting booking', error);
    throw error;
  }
};
