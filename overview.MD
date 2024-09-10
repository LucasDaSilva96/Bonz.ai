# Aws Cheat Sheet

## Data type descriptors

- S – String

- N – Number

- B – Binary

- BOOL – Boolean

- NULL – Null

- M – Map

- L – List

- SS – String Set

- NS – Number Set

- BS – Binary Set

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypeDescriptors

## serverless-dotenv-plugin

https://www.serverless.com/plugins/serverless-dotenv-plugin

## Day.js

https://day.js.org/docs/en/installation/installation

## Booking Example

{
id: 123,
number_of_rooms: 2,
number_of_guests: 2,
rooms: [],
name: John Doe,
email: john_doe@example.com
check_in: 2024-09-10,
check_out: 2024-09-12,
total_price: 1000,
status: Confirmed
}

## Rooms Example

#### Single room:

{
room_type: Single,
capacity: 1,
price: 500
}

#### Double room:

{
room_type: Double,
capacity: 2,
price: 1000
}

#### Suite room:

{
room_type: Suite,
capacity: 3,
price: 1500
}

## Create (Put Item)

```
  const { db } = require('./db'); // Import the db instance from db.js

  async function createItem() {
  const params = {
  TableName: 'YourTableName',
  Item: {
  id: '123', // Partition Key
  name: 'John Doe',
  age: 30,
  },
  };

  try {
  await db.put(params);
  console.log('Item inserted successfully');
  } catch (err) {
  console.error('Error inserting item:', err);
  }
    }

```

## Read (Get Item)

```
  const { db } = require('./db'); // Import the db instance from db.js

  async function getItem() {
  const params = {
    TableName: 'YourTableName',
    Key: {
      id: '123',  // Partition Key
    },
  };

  try {
    const data = await db.get(params);
    console.log('Item retrieved:', data.Item);
  } catch (err) {
    console.error('Error retrieving item:', err);
  }
}


```

## Update (Update Item)

```
const { db } = require('./db'); // Import the db instance from db.js

async function updateItem() {
  const params = {
    TableName: 'YourTableName',
    Key: {
      id: '123',  // Partition Key
    },
    UpdateExpression: 'set #name = :name, age = :age',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': 'Jane Doe',
      ':age': 28,
    },
    ReturnValues: 'UPDATED_NEW',  // Return the updated attributes
  };

  try {
    const data = await db.update(params);
    console.log('Item updated:', data.Attributes);
  } catch (err) {
    console.error('Error updating item:', err);
  }
}

```

## Delete (Delete Item)

```
const { db } = require('./db'); // Import the db instance from db.js

async function deleteItem() {
  const params = {
    TableName: 'YourTableName',
    Key: {
      id: '123',  // Partition Key
    },
  };

  try {
    await db.delete(params);
    console.log('Item deleted successfully');
  } catch (err) {
    console.error('Error deleting item:', err);
  }
}

```

## Query

```
const { db } = require('./db'); // Import the db instance from db.js

async function queryItems() {
  const params = {
    TableName: 'YourTableName',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': '123',
    },
  };

  try {
    const data = await db.query(params);
    console.log('Query result:', data.Items);
  } catch (err) {
    console.error('Error querying items:', err);
  }
}


```

## Scan

```
const { db } = require('./db'); // Import the db instance from db.js

async function scanTable() {
  const params = {
    TableName: 'YourTableName',
  };

  try {
    const data = await db.scan(params);
    console.log('Scan result:', data.Items);
  } catch (err) {
    console.error('Error scanning table:', err);
  }
}



```
