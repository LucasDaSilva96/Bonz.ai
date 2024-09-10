const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

// Create a DynamoDB client
const client = new DynamoDB({
  region: process.env.AWS_REGION,
});

// Create a DynamoDB Document client
const db = DynamoDBDocument.from(client);

module.exports = { db };
