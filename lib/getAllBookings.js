const { db } = require('../services/db');

exports.getAllBookings = async () => {
  const params = {
    TableName: 'booking-db',
  };
  try {
    const { Items } = await db.scan(params);
    return Items;
  } catch (error) {
    console.error('Error getting bookings', error);
    throw error;
  }
};
