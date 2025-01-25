Here’s a clean and professional `README.md` for your assignment:

---

# Apollo Assignment 3

## Overview

This project is a backend implementation for a blogging platform. The application is built using **Node.js**, **Express.js**, and **MongoDB**, with **TypeScript** for type safety. It includes role-based access control, user authentication, and CRUD operations for blog management.

## Features

### User Roles
1. **Admin**:
   - Can delete any blog.
   - Can block users (mark as `isBlocked`).
   - Cannot update blogs.
2. **User**:
   - Can register and log in.
   - Can create, update, and delete their own blogs.
   - Cannot access admin privileges.

### Core Functionalities
- **Authentication**:
  - User registration and login.
  - JWT-based authentication for secured access.
- **Authorization**:
  - Role-based access control to differentiate between Admin and User permissions.
- **Blog Management**:
  - Create, read, update, and delete (CRUD) operations for blogs.
  - Admins can delete any blog, but updates are restricted to the blog owner.
- **User Management**:
  - Admins can block users, restricting them from logging in or performing any actions.
- **Public API**:
  - Public endpoints to fetch blogs with search, filter, and sort functionalities.

---

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: JOI or similar library for request validation

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Local instance or cloud-based URI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itrabbi24/Apollo-Assignment-3.git
   cd Apollo-Assignment-3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:
   ```bash
   npm run start
   ```

---

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in and get a token.

### Blog Management
- `GET /api/blogs`: Fetch all blogs (public access).
- `POST /api/blogs`: Create a blog (authenticated users).
- `PUT /api/blogs/:id`: Update a blog (blog owner only).
- `DELETE /api/blogs/:id`: Delete a blog (blog owner or admin).

### Admin Actions
- `DELETE /api/admin/blogs/:id`: Delete any blog.
- `PATCH /api/admin/users/:id/block`: Block a user.

---

## Project Structure

```plaintext
src/
├── controllers/       # Business logic for routes
├── middleware/        # Authentication and role-based authorization
├── models/            # Mongoose schemas
├── routes/            # API endpoints
├── utils/             # Helper functions
└── app.ts             # Main application entry point
```

---

## Usage Instructions

1. **Run the application**:
   - Use `npm run start` for production.
   - Use `npm run dev` for development with live reloading.

2. **Test API endpoints**:
   - Use Postman, Insomnia, or any other API client to test endpoints.

3. **Admin User**:
   - Create an Admin user manually in the database for testing Admin features.

---

## Contributing

Contributions to this project are welcome. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with detailed information on your changes.

---

