// Som receptionist vill jag kunna se alla bokningar som gjorts för att få en överblick över hur beläggningen av hotellet ser ut.

const AWS = require('aws-sdk'); // Laddar AWS SDK
const db = new AWS.DynamoDB.DocumentClient(); // Skapar DynamoDB-klienten

module.exports.handler = async (event) => {
  const params = {
    TableName: 'booking-db',  // DynamoDB-tabellen för bokningar
  };

  try {
    const data = await db.scan(params).promise(); // Skannar tabellen
    return {
      statusCode: 200,
      body: JSON.stringify({
        bookings: data.Items, // Returnerar bokningarna i JSON-format
      }),
    };
  } catch (err) {
    console.error('Error scanning table:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not retrieve bookings' }),
    };
  }
};
