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
