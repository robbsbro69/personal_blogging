# Personal Blogging Platform

A simple RESTful API for managing blog posts and users with JWT authentication.

## Tech Stack

Node.js • Express • MongoDB • JWT • Bcrypt

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blogging-platform
JWT=your_secret_key
```

3. Run the server:
```bash
npm run dev
```

## API Endpoints

### Users
- `POST /users/signup` - Register
- `POST /users/signin` - Login
- `GET /users` - Get all users
- `GET /users/:id` - Get user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Blogs
- `POST /blogs` - Create post
- `GET /blogs` - Get all posts
- `PATCH /blogs/:id` - Update post
- `DELETE /blogs/:id` - Delete post

## Features

-> User authentication with JWT  
-> Password hashing with bcrypt  
-> Blog CRUD operations  
-> Email & password validation  
-> MongoDB with Mongoose
