# Blog Management Backend

## Overview

The Blog Project backend provides a platform for users to write, update, and delete their blogs. The system supports two roles:

- **Admin**: Manages users and their blogs with special permissions.
- **User**: Can perform CRUD operations on their own blogs.

The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

---

## Features and Requirements

### 1. User Roles

- **Admin**:
  - Created manually in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating the `isBlocked` property.
  - Cannot update blogs.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### 2. Authentication & Authorization

- **Authentication**:
  - Users must log in to perform write, update, and delete operations.
- **Authorization**:
  - Differentiated and secured access for Admin and User roles.

### 3. Blog API

- A public API for reading blogs:
  - Includes blog title, content, author details, and other necessary information.
  - Supports search, sorting, and filtering functionalities.

---

## Models

### User Model

| Field       | Type                | Description                                         |
| ----------- | ------------------- | --------------------------------------------------- |
| `name`      | `string`            | The full name of the user.                          |
| `email`     | `string`            | Email address for authentication.                   |
| `password`  | `string`            | Securely stored password.                           |
| `role`      | `"admin" \| "user"` | Role determining access level. Default: `"user"`.   |
| `isBlocked` | `boolean`           | Indicates if the user is blocked. Default: `false`. |
| `createdAt` | `Date`              | Timestamp when the user was created.                |
| `updatedAt` | `Date`              | Timestamp of the last update.                       |

### Blog Model

| Field         | Type       | Description                                          |
| ------------- | ---------- | ---------------------------------------------------- |
| `title`       | `string`   | Title of the blog post.                              |
| `content`     | `string`   | Main content of the blog post.                       |
| `author`      | `ObjectId` | Reference to the User model (author).                |
| `isPublished` | `boolean`  | Indicates if the blog is published. Default: `true`. |
| `createdAt`   | `Date`     | Timestamp when the blog was created.                 |
| `updatedAt`   | `Date`     | Timestamp of the last update.                        |

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**`POST /api/auth/register`**

Registers a new user with the platform.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (201):**
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
- **Failure (400):**
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

**`POST /api/auth/login`**

Authenticates a user and generates a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (200):**
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
- **Failure (401):**
  ```json
  {
    "success": false,
    "message": "Invalid credentials",
    "statusCode": 401,
    "error": { "details" },
    "stack": "error stack"
  }
  ```

### 2. Blog Management

#### 2.1 Create Blog

**`POST /api/blogs`**

Allows logged-in users to create a blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**
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

**`PATCH /api/blogs/:id`**

Allows logged-in users to update their own blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

- **Success (200):**
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

**`DELETE /api/blogs/:id`**

Allows logged-in users to delete their own blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Response:**

- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
  }
  ```

#### 2.4 Get All Blogs (Public)

**`GET /api/blogs`**

Fetches all blogs with options for searching, sorting, and filtering.

**Query Parameters:**

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines sorting order (`asc` or `desc`).
- `filter`: Filter blogs by author ID.

**Example Request URL:**

```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

**Response:**

- **Success (200):**

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
