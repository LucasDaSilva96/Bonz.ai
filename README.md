# Iron Monkeys

- Lucas Da Silva
- Ellika Larsson
- Rebecca Jansson

## API

- ### Create new booking - POST

**/booking**

**body - Example**

```
{
    "guestName": "John Doe",
    "guestEmail": "admin@io.com",
    "guests": 10,
    "checkInDate": "2024-09-15",
    "checkOutDate": "2024-09-20",
    "rooms": [
        {
            "type": "Single",
            "amount": 10
        },
         {
            "type": "Double",
            "amount": 5
        },
         {
            "type": "Double",
            "amount": 5
        }
    ]
}
```

- ### Get all bookings - GET

**/overview**

**Response - Example**

```
[
    {
        "policy": "❗Free cancellation 48h before check-in❗",
        "created_at": "2024-09-12T17:43:47.840Z",
        "guests": 10,
        "checkOutDate": "2024-09-20",
        "guestName": "John Doe",
        "status": "confirmed",
        "rooms": [
            {
                "amount": 10,
                "type": "Single",
                "costPerNight": 500,
                "capacity": 1
            },
            {
                "amount": 10,
                "type": "Double",
                "costPerNight": 1000,
                "capacity": 2
            }
        ],
        "guestEmail": "admin@io.com",
        "totalCost": 105000,
        "id": "9a08483f-1e55-48a1-9787-09d67be0e84e",
        "checkInDate": "2024-09-13",
        "nights": 7
    },
    {
        "policy": "❗Free cancellation 48h before check-in❗",
        "created_at": "2024-09-12T17:36:36.784Z",
        "guests": 100,
        "checkOutDate": "2024-09-14",
        "guestName": "John Doe",
        "status": "confirmed",
        "rooms": [
            {
                "amount": 10,
                "type": "Single",
                "costPerNight": 500,
                "capacity": 1
            },
            {
                "amount": 5,
                "type": "Double",
                "costPerNight": 1000,
                "capacity": 2
            },
            {
                "amount": 5,
                "type": "Suite",
                "costPerNight": 1500,
                "capacity": 3
            }
        ],
        "guestEmail": "admin@io.com",
        "totalCost": 17500,
        "id": "83fad6bb-ca08-4b45-bc6c-f3f9f2c3caa1",
        "checkInDate": "2024-09-13",
        "nights": 1
    },
]
```

- ### Get one booking - GET

**/getBookingById/{id}**

**Response - Example**

```
{
    "policy": "❗Free cancellation 48h before check-in❗",
    "created_at": "2024-09-12T17:43:47.840Z",
    "guests": 10,
    "checkOutDate": "2024-09-20",
    "guestName": "John Doe",
    "status": "confirmed",
    "rooms": [
        {
            "amount": 10,
            "type": "Single",
            "costPerNight": 500,
            "capacity": 1
        },
        {
            "amount": 10,
            "type": "Double",
            "costPerNight": 1000,
            "capacity": 2
        }
    ],
    "guestEmail": "admin@io.com",
    "totalCost": 105000,
    "id": "9a08483f-1e55-48a1-9787-09d67be0e84e",
    "checkInDate": "2024-09-13",
    "nights": 7
}
```

- ### Update booking - PUT

  **/updateBooking/{id}**

**Body - Example**

```
{
    "guests": 10,
    "checkOutDate": "2024-09-14",
    "guestName": "John Doe",
    "status": "confirmed",
    "rooms": [
        {
            "amount": 10,
            "type": "Single",
            "costPerNight": 500,
            "capacity": 1
        }
    ],
    "total_cost": 5000,
    "guestEmail": "admin@io.com",
    "id": "0e35ea86-2bda-4c08-8382-0b1ff5ba4942",
    "checkInDate": "2024-09-14",
    "nights": 1
}
```

- ### Cancel booking - POST

  **/deleteBooking/{id}**

**Response if within 48 hours - Example**

```
{
    "message": "Booking cancelled successfully✅"
}
```

**Response if NOT within 48 hours - Example**

```
{
    "errorMessage": "Booking cannot be cancelled within 48 hours of check-in date. Please contact the hotel directly for assistance."
}
```
