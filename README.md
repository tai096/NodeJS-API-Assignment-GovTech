# Teacher-Student Management API

A RESTful API for teachers to manage students. Built with **TypeScript**, Node.js, Express, MySQL, and Sequelize ORM.

## 🎯 Features

- ✅ **TypeScript** - Full type safety and better developer experience
- ✅ Register students to teachers
- ✅ Get common students across multiple teachers
- ✅ Suspend students
- ✅ Retrieve notification recipients (registered + @mentioned students)
- ✅ **Joi validation** for request validation
- ✅ **Database migrations** with Sequelize CLI
- ✅ **Unit and integration tests** with Jest
- ✅ Auto-creates database on startup

## 📋 Prerequisites

- Node.js v18+
- MySQL v5.7+
- npm or yarn

## 🚀 Quick Start

1. **Clone and install:**

   ```bash
   git clone <your-repository-url>
   cd NodeJS-API-Assignment-GovTech-
   yarn install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your MySQL credentials:

   ```env
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=teacher_student_db
   ```

3. **Setup database (first time only):**

   ```bash
   # Create database and run migrations (one command!)
   yarn db:setup
   ```

   Or run separately:

   ```bash
   # Create database only
   yarn db:create

   # Run migrations only
   yarn db:migrate
   ```

4. **Start the server:**

   ```bash
   # Development mode (with auto-reload)
   yarn dev

   # Or build and run production
   yarn build
   yarn start
   ```

   Server starts on `http://localhost:5001`

**Note:** After first setup, you only need `yarn dev` to start. Run `yarn db:migrate` only when there are new schema changes.

**Commands:**

```bash
yarn dev          # Development with auto-reload
yarn build        # Compile TypeScript to JavaScript
yarn start        # Run production build
yarn typecheck    # Type check without compiling
```

## API Endpoints

### 1. Register Students

`POST /api/register`

Register students to a teacher. Emails are case-insensitive.

```json
{
  "teacher": "teacherken@gmail.com",
  "students": ["studentjon@gmail.com", "studenthon@gmail.com"]
}
```

**Response:** `204 No Content`

---

### 2. Get Common Students

`GET /api/commonstudents?teacher=teacherken@gmail.com`

Get students common to given teachers (supports multiple `teacher` params).

```json
{
  "students": ["commonstudent1@gmail.com", "commonstudent2@gmail.com"]
}
```

---

### 3. Suspend Student

`POST /api/suspend`

Suspend a student.

```json
{
  "student": "studentmary@gmail.com"
}
```

**Response:** `204 No Content`

---

### 4. Retrieve Notification Recipients

`POST /api/retrievefornotifications`

Get students who can receive notifications (registered + @mentioned, excluding suspended).

```json
{
  "teacher": "teacherken@gmail.com",
  "notification": "Hello @studentagnes@gmail.com @studentmiche@gmail.com"
}
```

**Response:**

```json
{
  "recipients": ["studentbob@gmail.com", "studentagnes@gmail.com", "studentmiche@gmail.com"]
}
```

---

### Health Check

`GET /health`

Check API status.

## Testing

Create `.env.test` file before testing:

```env
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=teacher_student_db_test
```

**Run tests with TypeScript:**

```bash
# Run all tests (unit + integration)
yarn test

# Run tests in watch mode
yarn test:watch

# Run only unit tests
yarn test -- tests/unit

# Run only integration tests
yarn test -- tests/integration
```

Tests automatically use a separate `teacher_student_db_test` database to protect your development data.

## 📁 Project Structure

```
src/                      # TypeScript source files
├── config/               # Configuration (database, env)
│   ├── database.ts       # Database config với types
│   ├── env.ts            # Environment config
│   └── index.ts          # Sequelize instance
├── controllers/          # HTTP request handlers (TypeScript)
│   └── teacherController.ts
├── services/             # Business logic layer (TypeScript)
│   └── teacherService.ts
├── models/               # Sequelize models với typed interfaces
│   ├── Teacher.ts
│   ├── Student.ts
│   ├── Registration.ts
│   └── index.ts
├── routes/               # API routes (TypeScript)
│   ├── api.ts
│   └── index.ts
├── middleware/           # Express middleware (TypeScript)
│   ├── validate.ts
│   ├── errorHandler.ts
│   └── requestLogger.ts
├── validators/           # Joi validation schemas (TypeScript)
│   └── teacherValidators.ts
├── utils/                # Helper functions (TypeScript)
│   └── helpers.ts
├── app.ts                # Express application
└── server.ts             # Server entry point

dist/                     # Compiled JavaScript output
tests/                    # Test files (to be migrated to TypeScript)
├── unit/                 # Unit tests (service layer)
├── integration/          # Integration tests (API endpoints)
└── helpers/              # Test utilities

migrations/               # Database migrations
```

## 🏗️ Architecture

**Layered architecture with TypeScript:**

1. **Routes** → Define endpoints + validation middleware
2. **Validators** → Joi schemas for request validation (typed)
3. **Controllers** → Handle HTTP requests/responses (typed with Express types)
4. **Services** → Business logic + database operations (fully typed)
5. **Models** → Sequelize ORM models (with TypeScript interfaces)

**Benefits of TypeScript in this architecture:**

- Type-safe data flow through all layers
- IntelliSense support in IDE
- Compile-time error detection
- Better refactoring support

## 🗄️ Database Migrations

**Important:** Database schema is managed via migrations, NOT auto-sync.

```bash
# Development (default)
yarn db:setup         # Create database + run migrations
yarn db:create        # Create database only
yarn db:migrate       # Run migrations (also creates DB if needed)

# Test environment
yarn db:setup:test    # Create test database + run migrations
yarn db:create:test   # Create test database only
yarn db:migrate:test  # Run migrations for test DB

# Production
yarn db:setup:prod    # Create production database + run migrations
yarn db:create:prod   # Create production database only
yarn db:migrate:prod  # Run migrations for production DB

# Rollback migrations
yarn db:migrate:undo       # Undo last migration
yarn db:migrate:undo:all   # Undo all migrations
```

**Or use NODE_ENV directly:**

```bash
# Any environment
NODE_ENV=test node scripts/create-database.cjs
NODE_ENV=production npx sequelize-cli db:migrate
```

**Workflow:**

- **First time setup:**
  1. Run `yarn db:setup` (creates database + runs migrations)
  2. Start server (`yarn dev`)
- **Different environment:** Use `yarn db:setup:test` or `yarn db:setup:prod`
- **Schema changes:** Create new migration file, then run `yarn db:migrate`
- **Normal startup:** Just `yarn dev` (database & tables already exist)
- **Server behavior:** Only connects to DB, no auto-sync

## Database Schema

**teachers**

- `id`, `email` (unique), `created_at`, `updated_at`

**students**

- `id`, `email` (unique), `is_suspended`, `created_at`, `updated_at`

**registrations**

- `id`, `teacher_id`, `student_id`, `created_at`, `updated_at`
- Unique constraint on (`teacher_id`, `student_id`)

## Environment Variables

| Variable    | Default            | Description       |
| ----------- | ------------------ | ----------------- |
| PORT        | 5001               | Server port       |
| NODE_ENV    | development        | Environment       |
| DB_HOST     | localhost          | MySQL host        |
| DB_PORT     | 3306               | MySQL port        |
| DB_NAME     | teacher_student_db | Database name     |
| DB_USER     | root               | Database user     |
| DB_PASSWORD | -                  | Database password |

## Technologies

- **Node.js** + **Express.js** - Backend framework
- **MySQL** + **Sequelize** - Database and ORM
- **Joi** - Schema validation
- **Jest** + **Supertest** - Testing framework
- **Sequelize CLI** - Database migrations
- **ES6 Modules** - Modern JavaScript
- **dotenv** - Environment configuration

## Key Improvements

✅ **Robust validation** - Joi schemas catch type errors (e.g., number instead of string)  
✅ **Layered architecture** - Separation of concerns (routes → controllers → services)  
✅ **Database migrations** - Version-controlled schema changes  
✅ **Case-insensitive emails** - Consistent email handling with `.toLowerCase()`  
✅ **Modular tests** - Separate unit tests (services) and integration tests (API)  
✅ **Centralized config** - Single source for environment variables  
✅ **Production-ready** - Multiple environment support (dev, test, production)
