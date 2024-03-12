CREATE TABLE order_products ( 
    op_id SERIAL PRIMARY KEY, 
    quantity integer, 
    order_id bigint REFERENCES orders(order_id), 
    product_id bigint REFERENCES products(product_id) 
    );