const { db } = require('../services/db');

// Get all bookings function
exports.getAllBookings = async () => {
  const params = {
    TableName: 'booking-db',
  };
  try {
    // Get all bookings from the database
    const { Items } = await db.scan(params);
    return Items;
  } catch (error) {
    console.error('Error getting bookings', error);
    throw error;
  }
};
