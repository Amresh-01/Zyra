# Zyra Counselor Student Action Center

## Overview

This project implements the Action Center backend service for counselors to quickly assess student priorities, overdue work, unread communications, and risk level.

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



