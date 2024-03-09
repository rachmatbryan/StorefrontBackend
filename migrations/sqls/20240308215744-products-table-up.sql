CREATE TABLE products (
    product_id SERIAL PRIMARY KEY, 
    product_name VARCHAR(255), 
    price DECIMAL(10,2), 
    category VARCHAR(100)
    );