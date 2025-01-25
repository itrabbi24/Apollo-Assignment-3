
# Apollo Assignment 3

## Overview
This project is a web application that allows users to manage blogs. It provides functionalities for user registration, authentication, and blog management. Additionally, admins can perform actions such as blocking users and deleting blogs.

---

## Table of Contents

1. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
     - [Register User](#register-user)
     - [Login User](#login-user)
   - [Blog Management](#blog-management)
     - [Create Blog](#create-blog)
     - [Update Blog](#update-blog)
     - [Delete Blog](#delete-blog)
     - [Get All Blogs (Public)](#get-all-blogs-public)
   - [Admin Actions](#admin-actions)
     - [Block User](#block-user)
     - [Delete Blog](#delete-blog)

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User
**POST** `/api/auth/register`

Description: Registers a new user with the platform. It validates user data and saves it to the database.

##### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

##### Response:

**Success (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

**Failure (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

#### 1.2 Login User
**POST** `/api/auth/login`

Description: Authenticates a user with their email and password and generates a JWT token.

##### Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

**Failure (401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

---

### 2. Blog Management

#### 2.1 Create Blog
**POST** `/api/blogs`

Description: Allows a logged-in user to create a blog by providing a title and content.

##### Request Header:
`Authorization: Bearer <token>`

##### Request Body:
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

##### Response:

**Success (201):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.2 Update Blog
**PATCH** `/api/blogs/:id`

Description: Allows a logged-in user to update their own blog by its ID.

##### Request Header:
`Authorization: Bearer <token>`

##### Request Body:
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.3 Delete Blog
**DELETE** `/api/blogs/:id`

Description: Allows a logged-in user to delete their own blog by its ID.

##### Request Header:
`Authorization: Bearer <token>`

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

#### 2.4 Get All Blogs (Public)
**GET** `/api/blogs`

Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

##### Query Parameters:
- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending) (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

Example Request URL:
```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

---

### 3. Admin Actions

#### 3.1 Block User
**PATCH** `/api/admin/users/:userId/block`

Description: Allows an admin to block a user by updating the `isBlocked` property to `true`.

##### Request Header:
`Authorization: Bearer <admin_token>`

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

#### 3.2 Delete Blog
**DELETE** `/api/admin/blogs/:id`

Description: Allows an admin to delete any blog by its ID.

##### Request Header:
`Authorization: Bearer <admin_token>`

##### Response:

**Success (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/itrabbi24/Apollo-Assignment-3.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Apollo-Assignment-3
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

---



## Dependencies

- [express](https://www.npmjs.com/package/express): Web framework for Node.js
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Token-based authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Password hashing
- [dotenv](https://www.npmjs.com/package/dotenv): Environment variable management
- [cors](https://www.npmjs.com/package/cors): Middleware for Cross-Origin Resource Sharing
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger
- [express-validator](https://www.npmjs.com/package/express-validator): Input validation and sanitization

---

## Development Scripts

- **Start Application**: `npm start`
- **Run in Development Mode**: `npm run dev` *(Requires `nodemon`)*

---

## Postman Collection

A Postman collection for all endpoints is included in the repository:
[PH-Assignment-3.postman_collection.json](https://github.com/itrabbi24/Apollo-Assignment-3/blob/main/PH-Assignment-3.postman_collection.json)

Import this collection into Postman to test all endpoints directly.

---

## Project Structure

```
Apollo-Assignment-3/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── package.json
└── server.js
```

---


## Usage
- Use a tool like Postman to test the API endpoints.
- Sign up a new user, log in to receive a JWT token, and use it to authenticate requests.
- Admin users can create, update, and delete services and slots. 

## Error Handling

The application includes middleware for error handling. It ensures proper validation and responses for various errors such as validation errors, authentication errors, and server errors.

## Authentication & Authorization
- JWT is used for authentication.
- Routes are protected based on user roles (admin or user).

## Future Improvements
- Add frontend interface for a better user experience.
- Implement email notifications for booking confirmations and updates.
- Enhance security features such as rate limiting and logging.