# Scalable REST API with Authentication & Role-Based Access

## Tech Stack

* Next.js
* Express.js
* MongoDB
* JWT Authentication
* Redux Toolkit
* Tailwind CSS
* Tanstack
* bcrypt

## Features

* User Signup / Login
* JWT Authentication
* bcrypt hashing 
* Role-Based Access (User / Admin)
* CRUD Task Management
* Protected Routes using Middleware
* Persistent Login using Redux Persist

## API Endpoints

### Auth

* POST /user-api/v1/signup
* POST /user-api/v1/signin
* POST /user-api/v1/signout

### Tasks

* GET /task-api/v1/my-tasks/:userId
* GET /task-api/v1/all-tasks
* POST /task-api/v1/task
* PATCH /task-api/v1/task/:id
* DELETE /task-api/v1/task/:id

## Roles

* user → create/view own tasks
* admin → access all tasks

## Setup

### Backend

npm install
npm run dev

### Frontend

npm install
npm run dev

## Swagger Docs

http://rest-api-project-xkqg.onrender.com/api-docs

## Scalability Notes

* Modular folder structure
* JWT middleware
* Role-based route guards
* Easily extendable for Redis caching / microservices
