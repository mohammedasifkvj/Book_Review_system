#  Database Schema Design – Book Review API

---

##  User Collection

| Field      | Type     | Description              |
|------------|----------|--------------------------|
| _id        | ObjectId | Primary Key              |
| name       | String   | Full name of the user    |
| email      | String   | Unique user email        |
| password   | String   | Hashed password          |
| createdAt  | Date     | Registration timestamp   |

**Indexes**:
- Unique index on `email`

---

## Book Collection

| Field       | Type       | Description                        |
|-------------|------------|------------------------------------|
| _id         | ObjectId   | Primary Key                        |
| title       | String     | Title of the book                  |
| author      | String     | Author name                        |
| genre       | String     | Book genre                         |
| description | String     | Book description                   |
| createdBy   | ObjectId   | Reference to `User._id` (creator)  |
| createdAt   | Date       | Timestamp                          |

---

##  Review Collection

| Field      | Type       | Description                        |
|------------|------------|------------------------------------|
| _id        | ObjectId   | Primary Key                        |
| user       | ObjectId   | Reference to `User._id`            |
| book       | ObjectId   | Reference to `Book._id`            |
| rating     | Number     | Rating value (1–5)                 |
| comment    | String     | Optional review comment            |
| createdAt  | Date       | Timestamp                          |
| updatedAt  | Date       | Updated timestamp (on edit)        |

**Constraints**:
- One review per user per book 

---

##  RefreshToken Collection (Optional - for logging issued tokens)

| Field      | Type       | Description                          |
|------------|------------|--------------------------------------|
| _id        | ObjectId   | Primary Key                          |
| userId     | ObjectId   | Reference to `User._id`              |
| token      | String     | Refresh token                        |
| createdAt  | Date       | Issued time                          |
| expiresAt  | Date       | Expiry time                          |

---

##  ER Diagram (Conceptual)

```plaintext
  +---------+        +----------+        +----------+
  |  User   | <----> |  Review  | <----> |   Book   |
  +---------+        +----------+        +----------+
      |                                  ^
      |                                  |
      |                                  |
      +----------------------------> Created By
````

* A **User** can create many **Books**.
* A **User** can write **one review per Book**.
* A **Book** can have **many reviews**.
* Refresh Tokens (if stored) are linked to **Users**.

---