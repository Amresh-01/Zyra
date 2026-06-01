# Zyra Counselor Student Action Center

## Backend Live:- https://zyra-umwl.onrender.com


## Overview

This project implements the Action Center backend service for counselors to quickly assess student priorities, overdue work, unread communications, and risk level.

---

## 📖 API Documentation

The complete API endpoints, request payloads, and response structures are fully documented using Postman. 

👉 **[Explore the Zyra API Documentation](https://coders-0935.postman.co/workspace/My-Workspace~de84d656-a8f7-424d-8f83-dc3f98121138/collection/44436051-b62d69f8-0ba6-4340-9cd3-78f64e30b5be?action=share&source=copy-link&creator=44436051)**


Built using:

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose

---

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd server
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
PORT=8080
MONGO_URI=<mongodb-connection-string>
```

---

## Seed Database

```bash
npm run seed
```

This loads:

* Students
* Tasks
* Messages

into MongoDB.

---

## Run Application

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

Server starts at:

```txt
http://localhost:8080
```

---

## Run Tests

Backend:

```bash
npm test
```

Frontend:

```bash
npm run test:frontend
```

---

## Features

* Action Center aggregation endpoint
* Task status update endpoint
* Request logging middleware
* Request ID tracking
* Centralized error handling
* MongoDB indexing
* Integration tests
* Frontend component tests

# API Contract

## Get Action Center

### Request

GET

```http
/api/students/action-center/:studentId
```

Example:

```http
/api/students/action-center/stu_001
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Action Center fetched successfully",
  "data": {
    "student": {},
    "tasks": {},
    "messages": {},
    "insights": {}
  }
}
```

---

## Update Task Status

### Request

PATCH

```http
/api/tasks/:taskId/status
```

Body:

```json
{
  "status": "completed"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Task status updated successfully",
  "data": {}
}
```



# Architecture Note

## Design Approach

The application follows a layered architecture:

### Route Layer

Responsible for HTTP routing and request mapping.

Example:

```txt
Route → Controller
```

---

### Controller Layer

Handles:

* Request validation
* Response formatting
* HTTP concerns

Controllers contain no business logic.

---

### Service Layer

Contains business logic.

Example:

* Aggregating student data
* Calculating urgency score
* Computing risk level
* Generating Action Center insights

This keeps logic reusable and testable.

---

### Data Layer

MongoDB + Mongoose models:

* Student
* Task
* Message

Indexes are added on:

* studentId
* taskId
* messageId
* status
* priority

to improve query performance.

---

## Reliability

Implemented:

* Global error middleware
* Request IDs for traceability
* Structured request logging
* Async error handling

---

## Performance

Optimizations:

* Parallel database fetching using Promise.all
* Mongoose lean() queries
* Indexed lookup fields
* Aggregated calculations in memory after retrieval

---

## Testing

### Integration Test

Verifies:

* Action Center endpoint returns expected aggregated data.

### Frontend Test

Verifies:

* Action Center card renders correct risk level and counts.

---

## Future Improvements

* Redis caching
* Pagination for messages
* MongoDB aggregation pipelines
* OpenAPI / Swagger documentation
* Authentication and authorization
* Distributed tracing and monitoring


