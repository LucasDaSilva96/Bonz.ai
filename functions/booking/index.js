// Som en gäst vill jag kunna boka ett rum för att säkerställa min vistelse på hotellet.
// Som en gäst vill jag få en bekräftelse när jag har bokat ett rum för att veta att min bokning har gått igenom.

const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const { ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses/index');

// Business logic for rooms
const ROOM_TYPES = {
  single: { capacity: 1, price: 500 },
  double: { capacity: 2, price: 1000 },
  suite: { capacity: 3, price: 1500 },
}

const MAX_ROOMS = 20;

exports.handler = async (event) => {
  try {
    const { guests, rooms, checkInDate, checkOutDate, guestName, guestEmail } = JSON.parse(event.body);

    // Validate input
    let totalCapacity = 0;
    let totalCost = 0;
    let totalRooms = 0;
    for (const room of rooms) {
      if (!ROOM_TYPES[room.type]) {
        throw new Error(`Invalid room type: ${room.type}`);
      }
      totalCapacity += ROOM_TYPES[room.type].capacity * room.quantity;
      totalCost += ROOM_TYPES[room.type].price * room.quantity;
      totalRooms += room.quantity;
    }

    if (totalCapacity < guests) {
      throw new Error('The number of guests exceeds the room capacity.');
    }

    if (totalRooms > MAX_ROOMS) {
      throw new Error(`You cannot book more than ${MAX_ROOMS} rooms in a single booking.`);
    }

    // Query the database to get the total number of rooms already booked
    const scanCommand = new ScanCommand({
      TableName: 'booking-db',
      ProjectionExpression: 'rooms',
    });
    const result = await db.send(scanCommand);

    let roomsBooked = 0;
    for (const item of result.Items) {
      for (const room of item.rooms) {
        roomsBooked += room.quantity;
      }
    }

    if (roomsBooked + totalRooms > MAX_ROOMS) {
      throw new Error('The total number of rooms booked exceeds the hotel capacity.');
    }

    const nights = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
    totalCost *= nights;

    const bookingId = uuidv4();

    const booking = {
      id: bookingId,
      guests,
      rooms,
      checkInDate,
      checkOutDate,
      guestName,
      guestEmail,
      totalCost,
      created_at: new Date().toISOString(),
    };

    const putCommand = new PutCommand({
      TableName: 'booking-db',
      Item: booking,
    });
    await db.send(putCommand);

    return sendResponse({
      bookingId,
      guests,
      rooms,
      totalCost,
      checkInDate,
      checkOutDate,
      guestName,
    });
  } catch (error) {
    return sendError(400, error.message);
  }
};