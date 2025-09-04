# Simple API

A simple API designed for infrastructure testing purposes with integrated Swagger documentation.

## Features

- ✅ REST API with Express.js
- ✅ Automatic documentation with Swagger UI
- ✅ Information and health endpoints
- ✅ Complete CRUD operations for data management
- ✅ MySQL database with Sequelize ORM
- ✅ Auto-generated UUID for data entries
- ✅ Database auto-sync on startup
- ✅ HTTP request logging with Morgan
- ✅ File-based logging with Winston
- ✅ Ready for infrastructure testing
- ✅ Lightweight and easy to deploy

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp env.example .env
# Edit .env file with your MySQL database credentials

# Start the server
npm start
```

## Usage

### Start the server

```bash
npm start
```

The server will run on `http://localhost:3000`

### Database Configuration

Before starting the server, make sure you have:

1. **MySQL server running** on your system
2. **Database created** (default: `simple_api`)
3. **Environment variables configured** in `.env` file:

```bash
# Copy the example file
cp env.example .env

# Edit .env with your MySQL credentials
DB_HOST=localhost
DB_PORT=3306
DB_NAME=simple_api
DB_USER=your_username
DB_PASSWORD=your_password
```

The application will automatically create the required tables on first startup.

### Logging

The application uses Winston for file-based logging:

- **`logs/combined.log`** - All application logs (info, warn, error)
- **`logs/error.log`** - Error logs only
- **Console output** - In development mode, logs also appear in console

Log files are automatically rotated when they reach 5MB and keep up to 5 backup files.

### API Documentation

Once the server is running, you can access the interactive Swagger documentation at:

- **Swagger UI**: http://localhost:3000/api-docs
- **Main page**: http://localhost:3000 (automatically redirects to documentation)

### Available endpoints

#### API Information
- **GET** `/api/` - Get basic application information

#### API Health
- **GET** `/api/health` - Check API health status

#### Data Management (CRUD)
- **GET** `/api/data` - Get all data entries
- **GET** `/api/data/{id}` - Get data entry by UUID
- **POST** `/api/data` - Create new data entry
- **PUT** `/api/data/{id}` - Update data entry by UUID
- **DELETE** `/api/data/{id}` - Delete data entry by UUID

## Project Structure

```
simple-api/
├── src/
│   ├── config/
│   │   └── swagger.js          # Swagger configuration
│   ├── controllers/
│   │   ├── api.controller.js   # API controllers
│   │   └── data.controller.js  # Data CRUD controllers
│   ├── database/
│   │   ├── config.js           # Database configuration
│   │   └── index.js            # Database initialization
│   ├── entities/
│   │   └── Data.js             # Data entity model
│   ├── utils/
│   │   └── logger.js           # Winston logger configuration
│   └── server.js               # Server configuration
├── logs/                       # Log files directory
│   ├── combined.log            # All logs
│   └── error.log               # Error logs only
├── env.example                 # Environment variables example
├── index.js                    # Application entry point
├── package.json
└── README.md
```

## Development

For development with automatic reload, you can use:

```bash
npm install -D nodemon
npm run dev
```

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Sequelize** - SQL ORM for Node.js
- **MySQL2** - MySQL database driver
- **UUID** - UUID generation for data entries
- **dotenv** - Environment variables management
- **Morgan** - HTTP request logger middleware
- **Winston** - File-based logging system
- **Swagger UI Express** - User interface for API documentation
- **Swagger JSDoc** - Documentation generation from JSDoc comments
- **npm** - Package manager

