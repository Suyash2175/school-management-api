# School Management API

This project implements a simple School Management API using Node.js, Express.js, and MySQL. The API allows users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Features

- **Add School:** API to add a new school with details such as name, address, latitude, and longitude.
- **List Schools:** API to retrieve a list of schools sorted by their proximity to a given latitude and longitude.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MySQL

## API Endpoints

### 1. Add School

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
      "name": "School Name",
      "address": "School Address",
      "latitude": 19.123456,
      "longitude": 72.123456
  }
  ```
- **Response:**
  - `201 Created`: School added successfully.
  - `400 Bad Request`: Invalid input.

### 2. Add Multiple Schools

- **Endpoint:** `/addSchools`
- **Method:** `POST`
- **Payload:**
  ```json
  [
      {
          "name": "School Name 1",
          "address": "School Address 1",
          "latitude": 19.123456,
          "longitude": 72.123456
      },
      {
          "name": "School Name 2",
          "address": "School Address 2",
          "latitude": 19.654321,
          "longitude": 72.654321
      }
  ]
  ```
- **Response:**
  - `201 Created`: Schools added successfully.
  - `400 Bad Request`: Invalid input.

### 3. List Schools

- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Parameters:**
  - `latitude`: User's current latitude.
  - `longitude`: User's current longitude.
- **Response:**
  - `200 OK`: Returns a sorted list of schools based on proximity.
  - `400 Bad Request`: Invalid input.

## Database Setup

1. Create a MySQL database named `school_management`.
2. Create the `schools` table with the following structure:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## How to Run

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MySQL database and update the connection details in the code.
4. Start the server using `node server.js`.
5. The API will be accessible at `http://localhost:3000`.

## Hosting and Testing

The API is hosted and accessible for testing at:

- **Base URL:** [http://your-hosted-url.com](http://your-hosted-url.com)

A Postman collection is provided for testing the APIs. You can import the collection into Postman using the following link:

- **Postman Collection:** [Postman Collection Link](https://localhoost.postman.co/workspace/localhoost-Workspace~a539df40-e156-4258-83dc-89748aa8983c/request/32606715-bbe93176-6e71-473c-ab31-c639c877ed26?action=share&creator=32606715&ctx=documentation)

## Contact

For any queries or issues, please contact:

- **Email:** sonwanesuyash001@gmail.com
