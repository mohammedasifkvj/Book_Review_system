
```markdown
# Book Review API

A RESTful Book Review API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication** (access and refresh tokens). The project follows **Clean Architecture** for better maintainability and scalability.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (access + refresh tokens)
- **Architecture:** Clean Architecture
- **Validation:** Joi
- **Security:** HTTP-only cookies for refresh token, rate limiting, helmet

---
```

src/
├── application/
│   └── use-case/
├── config/
├── domain/
│   ├── entities/
│   └── models/
├── infrastructure/
│   ├── middleware/
│   └── repositories/
├── interfaces/
│   ├── controllers/
│   └── routes/
├── services/
├── utils/
├── app.js
└── server.js

````

---

## Project Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mohammedasifkvj/Book_Review_system.git
cd Book_Review_system
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in the root

```env
NODE_ENV=dev
PORT=8000
CLIENT_URL ='http://127.0.0.1:8000'

MONGO_URI=mongodb://localhost:27017/Book_Review_System

JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret
JWT_ACCESS_EXPIRES_IN =15m,
REFRESH_TOKEN_EXPIRES_IN =7d
```

### 4. Run the server

```bash
npm start
```

The server will run on `http://localhost:8000`

---

## Authentication

* **Access Token:** Short-lived JWT stored in `Authorization: Bearer <token>`
* **Refresh Token:** Long-lived JWT stored as `httpOnly` cookie (`refreshToken`)

---

##  Example API Requests (via Postman)

> **Base URL:** `http://localhost:8000`

### Auth

#### POST `/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Books

#### POST `/books` (Protected)

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Software Engineering",
  "description": "A handbook of Agile Software Craftsmanship"
}
```

#### GET `/books?page=1&limit=10&genre=Engineering`

---

### Book Details

#### GET `/books/:id`

Returns book info + average rating + paginated reviews

---

### Reviews

#### POST `/books/:id/reviews` (Protected)

```json
{
  "rating": 5,
  "comment": "A must-read for developers!"
}
```

#### PUT `/reviews/:id` (Protected)

```json
{
  "rating": 4,
  "comment": "Still good, but a bit outdated"
}
```

#### DELETE `/reviews/:id` (Protected)

---

### Search

#### GET `/search?q=Clean`

Search by book title or author name (case-insensitive)

---

## Design Decisions and Assumptions

* Follows **Clean Architecture** to separate business logic from frameworks.
* JWTs:

  * **Access tokens** are short-lived and sent in headers.
  * **Refresh tokens** are stored as `HttpOnly` cookies for better security.
* Every user can leave **only one review per book**.
* Pagination is implemented using query params (`page`, `limit`) on book listings and reviews.
* Input validation is handled with **Joi** middleware.

---
## 📧 Contact

For questions, feel free to raise an issue or connect via GitHub.

```