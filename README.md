# Storefront Backend

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm or Yarn
- PostgreSQL

1. **Install Dependencies**

   ```sh
   db-migrate
   express
   jsonwebtoken
   pg
   typescript
   bcrypt
   dotenv
   jasmine
   ```
# Database Schema Documentation

Below is the schema for the various tables in the database along with their columns and data types.

## Users Table

| Column Name     | Data Type    | Description                    |
|-----------------|--------------|--------------------------------|
| user_id         | SERIAL       | Primary key, auto-increments.  |
| firstName       | VARCHAR(50)  | The user's first name.         |
| lastName        | VARCHAR(50)  | The user's last name.          |
| password_digest | VARCHAR(255) | The user's hashed password.    |

## Products Table

| Column Name | Data Type          | Description                        |
|-------------|--------------------|------------------------------------|
| product_id  | SERIAL             | Primary key, auto-increments.      |
| name        | VARCHAR(255)       | The name of the product.           |
| price       | DECIMAL(10, 2)     | The price of the product.          |
| category    | VARCHAR(100)       | The category the product belongs to. |

## Orders Table

| Column Name  | Data Type    | Description                                      |
|--------------|--------------|--------------------------------------------------|
| order_id     | SERIAL       | Primary key, auto-increments.                    |
| user_id      | BIGINT       | Foreign key to the users table.                  |
| order_status | VARCHAR(50)  | The status of the order (e.g., 'active').        |

## Order Products Table (Join Table for Many-to-Many Relationship)

| Column Name | Data Type | Description                                      |
|-------------|-----------|--------------------------------------------------|
| id          | SERIAL    | Primary key, auto-increments.                    |
| order_id    | BIGINT    | Foreign key to the orders table.                 |
| product_id  | BIGINT    | Foreign key to the products table.               |
| quantity    | INTEGER   | The quantity of the product included in the order. |



## Setting Up and Connecting to the Database

To set up your PostgreSQL database and connect to it from the backend, follow these steps:

1. **Install PostgreSQL**: Make sure you have PostgreSQL installed on your machine. If not, download and install it from the [official PostgreSQL website](https://www.postgresql.org/download/).

2. **Configure PostgreSQL**:

   - Start the PostgreSQL service on your machine.
   - Log in to the PostgreSQL CLI using `psql`.
   - Create a new database for development and testing:

     ```sql
     CREATE DATABASE store_dev;
     CREATE DATABASE store_test;
     ```

3. **Environment Configuration**:

   - Copy the `.env.example` file to a new file named `.env`.
   - Fill in your database credentials and specify the ports in the `.env` file:

     ```
     POSTGRES_HOST=127.0.0.1
     POSTGRES_DB=db_name
     POSTGRES_TEST_DB=db_name_test
     POSTGRES_USER=user
     POSTGRES_PASSWORD=pass
     ENV=dev
     BCRYPT_PASSWORD=samplepassword
     SALT_ROUNDS=10
     TOKEN_SECRET=secrettoken
     ```

   Replace `yourusername` and `yourpassword` with the actual username and password for your PostgreSQL database.

4. **Running Database Migrations**:

   - Navigate to your project directory and run the migration scripts to create the database schema:

     ```sh
     npm run migrate up
     ```

   Ensure that you have a `migrate` script set up in your `package.json` that points to your migration tool or files.

## Ports

By default, the backend server runs on port `3000`, and PostgreSQL runs on port `5432`. Make sure that these ports are not being used by other processes. You can configure the backend server port in the `.env` file if necessary.

## Package Installation Instructions

To install all the required packages for the backend server, follow these steps:

1. **Navigate to your project directory**:

   ```sh
   cd path_to_your_project
   ```

2. **Install NPM packages**:

   ```sh
   npm install
   ```

   This will install all dependencies listed in your `package.json` file.

3. **Start the Server**:

   ```sh
   npm start
   ```

   This command will start the backend server, and you should see a message indicating that the server is running on the port specified in your `.env` file.
