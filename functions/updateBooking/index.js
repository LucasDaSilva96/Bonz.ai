// // Som en gäst vill jag kunna ändra min bokning ifall mina planer ändras.

// const { v4: uuidv4 } = require('uuid');
// const dayjs = require('dayjs');
// const { db } = require('../../services/db');
// const { sendResponse, sendError } = require('../../responses/index');

// // Business logic for rooms
// const ROOM_TYPES = {
//   single: { capacity: 1, price: 500 },
//   double: { capacity: 2, price: 1000 },
//   suite: { capacity: 3, price: 1500 },
// };

// exports.handler = async (event) => {
//   try {
//     const bookingId = event.pathParameters.id;
//     const { guests, rooms, checkInDate, checkOutDate, guestName, guestEmail } = JSON.parse(event.body);

//     // Retrieve the existing booking to get the created_at attribute
//     const existingBooking = await db.get({
//       TableName: 'booking-db',
//       Key: { id: bookingId },
//     });

//     if (!existingBooking.Item) {
//       throw new Error('Booking not found');
//     }

//     const { created_at } = existingBooking.Item;

//     // Validate input
//     let totalCapacity = 0;
//     let totalCost = 0;
//     for (const room of rooms) {
//       if (!ROOM_TYPES[room.type]) {
//         throw new Error(`Invalid room type: ${room.type}`);
//       }
//       totalCapacity += ROOM_TYPES[room.type].capacity * room.quantity;
//       totalCost += ROOM_TYPES[room.type].price * room.quantity;
//     }

//     if (totalCapacity < guests) {
//       throw new Error('The number of guests exceeds the room capacity.');
//     }

//     const nights = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
//     totalCost *= nights;

//     const updatedBooking = {
//       id: bookingId,
//       guests,
//       rooms,
//       checkInDate,
//       checkOutDate,
//       guestName,
//       guestEmail,
//       totalCost,
//       updated_at: new Date().toISOString(),
//     };

//     await db.update({
//       TableName: 'booking-db',
//       Key: { id: bookingId, created_at },
//       UpdateExpression: 'set guests = :guests, rooms = :rooms, checkInDate = :checkInDate, checkOutDate = :checkOutDate, guestName = :guestName, guestEmail = :guestEmail, totalCost = :totalCost, updated_at = :updated_at',
//       ExpressionAttributeValues: {
//         ':guests': guests,
//         ':rooms': rooms,
//         ':checkInDate': checkInDate,
//         ':checkOutDate': checkOutDate,
//         ':guestName': guestName,
//         ':guestEmail': guestEmail,
//         ':totalCost': totalCost,
//         ':updated_at': updatedBooking.updated_at,
//       },
//       ReturnValues: 'ALL_NEW',
//     });

//     return sendResponse(updatedBooking);
//   } catch (error) {
//     return sendError(400, error.message);
//   }
// };