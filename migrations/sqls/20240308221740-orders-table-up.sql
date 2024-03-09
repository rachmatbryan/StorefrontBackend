CREATE TABLE orders ( 
    order_id SERIAL PRIMARY KEY, 
    product_id bigint REFERENCES products(product_id), 
    user_id bigint REFERENCES users(user_id),
    quantity integer, 
    order_status VARCHAR(50) NOT NULL CHECK (order_status IN ('active', 'complete'))
    );