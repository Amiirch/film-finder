# film-finder Project

This is a Node.Js-based film-finder project that provides a RESTful API for managing movie finding. The project includes authentication and authorization, uses MongoDb with Mongoose for data persistence, socket.io for online chat as support team, and is containerized using Docker. The project also implements unit tests with jest.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation Without Docker](#installation-without-docker)
   - [Installation With Docker](#installation-with-docker)
5. [Usage](#usage)
6. [Running Tests](#running-tests)

---

## About the Project

This project serves as the back-end for a film-finder platform, offering the following features:

### Features

- User authentication and authorization (JWT)
- Movie catalog management
- socket.io for online chat
- Mongo.Db for data storage with Mongoose
- Docker for easy deployment and containerization
- Unit tests to ensure code quality and reliability

---

## Technologies

- **Node.js 22**: The framework used to build the application.
- **Mongoose**: ORM for database interactions with PostgreSQL.
- **MongoDb**: Relational database used for data storage.
- **Socket.io**: use for online chat
- **Docker**: Containerization for deployment and isolated environments.
- **JWT**: JSON Web Tokens for secure authentication and authorization.

---

## Getting Started

To set up and run the project locally, follow these instructions.

### Prerequisites

Ensure that you have the following installed:

- [Node.js22] (https://nodejs.org/en/download/package-manager)
- [Docker](https://www.docker.com/products/docker-desktop)
- [MongoDb](https://www.postgresql.org/download/)
---

### Installation Without Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/Amiirchg/E_commerce.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Shopping_API
    ```

3. Configure the connection string in the `appsettings.json` file to point to your PostgreSQL instance.

4. Restore the dependencies:

    ```bash
    dotnet restore
    ```

5. Set up the PostgreSQL database using Entity Framework Core migrations:

    ```bash
    dotnet ef database update
    ```

6. Run the application:

    ```bash
    dotnet run
    ```

---

### Installation With Docker

1. Set up Docker containers for PostgreSQL and Redis using the `docker-compose.yml` file:

    ```bash
    docker compose up --build
    ```

2. Ensure the correct connection string in the `appsettings.json` file, then run migrations to update the PostgreSQL database:

    ```bash
    dotnet ef database update
    ```

---

## Usage

Once the application is running, you can access the API via Swagger for testing and documentation at:

--- 
### Running Tests

for running Test just do it :
   ```bash
   dotnet test
   ```