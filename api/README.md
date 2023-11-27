# Pense API Documentation

## Introduction
This API serves as the backend for Pense, a blog website. It provides various routes for managing user accounts, blog posts, comments, and email functionalities.

## Routes

### 1. Comment Routes (`comment.py`)
#### Create a Comment
- **Route:** `/comments/`
- **Method:** POST
- **Description:** Create a new comment and return it as JSON.
- **Request Body:**
  ```json
  {
    "comment": "Your comment here",
    "user_id": 1,
    "post_id": 1
  }

#### Update a Comment
- **Route:** `/comments/<int:comment_id>`
- **Method:** PUT
- **Description:** Update an existing comment.
- **Request Body:**
  ```json
  {
    "comment": "Updated comment"
  }

#### Delete a Comment
- **Route:** `/comments/<int:comment_id>`
- **Method:** DELETE
- **Description:** Delete an existing comment.
- **Request Body:**
  ```json
  {
    "message": "Comment deleted successfully"
  }

#### Get Comments for a Post
- **Route:** `/comments/<int:post_id>`
- **Method:** GET
- **Description:** Get all comments for a specified post.
- **Request Body:**
  ```json
  {
    "id": 1,
    "comment": "Comment 1",
    "user_id": 1,
    "post_id": 1,
    "created_at": "Timestamp",
    "updated_at": "Timestamp"
  },
  {
    "id": 2,
    "comment": "Comment 2",
    "user_id": 2,
    "post_id": 1,
    "created_at": "Timestamp",
    "updated_at": "Timestamp"
  }

### 2. Email Routes (`email.py`)
#### Send Email
- **Route:** `/mail`
- **Method:** GET
- **Description:**Send a verification email.
- **Query Parameters:**
    **receiver (Email address)**
    **body (HTML body of the email)**

### 3. Login Routes (`login.py`)
#### User Login
- **Route:** `/login`
- **Method:** POST
- **Description:**  Authenticate user login.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }

#### Password Reset Request
- **Route:** `/forget`
- **Method:** POST
- **Description:** Request a password reset email.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }

#### Password Reset
- **Route:** `/reset?email=<string:email>`
- **Method:** PUT
- **Description:** Request user password.
- **Request Body:**
  ```json
  {
    "password": "newpassword"
  }

### 4. Post Routes (`post.py`)
#### Create a Post
- **Route:** `/posts/`
- **Method:** POST
- **Description:** Create a new blog post.
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post Content",
    "category_ids": [1, 2],
    "user_id": 1
  }

#### Update a Post
- **Route:** `/posts/<int:id>`
- **Method:** PUT
- **Description:** Update an existing blog post.
- **Request Body:**
  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated Post Content",
    "category_ids": [1, 2],
    "user_id": 1
  }

#### Delete a Post
- **Route:** `/posts/<int:id>`
- **Method:** DELETE
- **Description:** Delete an existing blog post.
- **Response:**
  ```json
  {
    "success": "Post deleted"
  }

#### Get All Posts for a User
- **Route:** `/posts/<int:user_id>`
- **Method:** GET
- **Description:** Get all blog posts for a specified user.
- **Response:**
  ```json
  [
    {
        "id": 1,
        "title": "Post 1",
        "content": "Content...",
        "user_id": 1,
        "slug": "post-1",
        "summary": "Short summary...",
        "read_time": 2,
        "created_at": "Timestamp",
        "updated_at": "Timestamp"
    },
    {
        "id": 2,
        "title": "Post 2",
        "content": "Content...",
        "user_id": 1,
        "slug": "post-2",
        "summary": "Short summary...",
        "read_time": 3,
        "created_at": "Timestamp",
        "updated_at": "Timestamp"
    }
  ]

#### Search Posts
- **Route:** `/posts/search>`
- **Method:** GET
- **Description:** Search for blog posts based on a search term.
- **Request Body:**
  ```json
  {
    "search": "keyword"
  }

### 5. Signup Routes (`signup.py`)
#### User Signup
- **Route:** `/signup`
- **Method:** POST
- **Description:** Create a new user account.
- **Request Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com",
    "password": "password"
  }

#### Verify Signup
- **Route:** `/verify?email=<email>`
- **Method:** GET
- **Description:** Verify user signup.
- **Response:**
  ```json
  {
    "message": "Verification successful. Please login."
  }

### Upload User Profile Image Routes  (`upload_user.py`)
#### Upload User Profile Image
- **Route:** `/upload/<int:id>/image`
- **Method:** POST
- **Description:** Upload a user profile image.
- **Request Form Data:**
    **`image` (File):**
- **Response:**
  ```json
  {
    "message": "File uploaded successfully"
  }

```
python3 -m api.v1.app
```