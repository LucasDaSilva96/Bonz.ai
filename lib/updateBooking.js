const dayjs = require('dayjs');
const { db } = require('../services/db');
const { getBookingById } = require('./getBookingById');
const { calculateBooking } = require('./createBooking');

// Update a booking function
exports.updateBooking = async (bookingID, body) => {
  try {
    // Get the booking by ID
    const booking = await getBookingById(bookingID);

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if check-in and check-out dates are valid
    if (body.check_in && body.check_out) {
      const checkIn = dayjs(body.check_in);

      if (dayjs().isAfter(checkIn)) {
        throw new Error('Check-in date must be in the future');
      }

      const checkOut = dayjs(body.check_out);
      if (checkIn.isAfter(checkOut)) {
        throw new Error('Check-in date must be before check-out date');
      }
    }

    if (body.check_in && !body.check_out) {
      const checkIn = dayjs(body.check_in);
      if (dayjs().isAfter(checkIn) && !dayjs().isSame(checkIn, 'day')) {
        throw new Error('Check-in date cannot be in the past');
      }
    }

    if (body.check_out && !body.check_in) {
      const checkOut = dayjs(body.check_out);
      if (dayjs(booking.check_in).isAfter(checkOut)) {
        throw new Error('Check-out date must be after check-in date');
      }
    }

    // Update the booking with the new data
    booking.name = body.name || booking.name;
    booking.email = body.email || booking.email;
    booking.amount_of_people =
      body.amount_of_people || booking.amount_of_people;
    booking.check_in = body.check_in || booking.check_in;
    booking.check_out = body.check_out || booking.check_out;
    // Calculate the total cost, rooms and nights
    if (body.rooms && body.rooms.length > 0) {
      const { totalCost, rooms, nights } = calculateBooking(
        booking.amount_of_people,
        booking.check_in,
        booking.check_out,
        body.rooms
      );
      booking.total_cost = totalCost;
      booking.rooms = rooms;
      booking.nights = nights;
    }

    // Update the updated_at timestamp
    booking.updated_at = dayjs().toISOString();

    // Check if check-in and check-out dates are valid
    if (!dayjs(booking.check_in).isBefore(dayjs(booking.check_out))) {
      throw new Error('Check-in date must be before check-out date');
    }

    // Update the booking in the database
    const params = {
      TableName: 'booking-db',
      Key: {
        id: bookingID,
      },
      UpdateExpression:
        'SET #name = :name, email = :email, amount_of_people = :amount_of_people, check_in = :check_in, check_out = :check_out, total_cost = :total_cost, rooms = :rooms, nights = :nights, updated_at = :updated_at',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': booking.name,
        ':email': booking.email,
        ':amount_of_people': booking.amount_of_people,
        ':check_in': booking.check_in,
        ':check_out': booking.check_out,
        ':total_cost': booking.total_cost,
        ':rooms': booking.rooms,
        ':nights': booking.nights,
        ':updated_at': booking.updated_at,
      },
      ReturnValues: 'ALL_NEW', // Return the updated attributes
    };
    const data = await db.update(params).then((res) => res.Attributes);
    // Return the updated booking
    return data;
  } catch (error) {
    console.error('Error updating booking', error);
    throw error;
  }
};
