# Rest Shop API

Mock store API that serves raw data to user connecting via Rest-Shop-App

## Tables Outputed

### Product

Routes: `GET /products` & `GET /products/:id`

| Column Name  | Datatype                |
|--------------|-------------------------|
| id (PK)      | serial                  |
| name         | TEXT                    |
| description  | TEXT                    |
| price        | DECIMAL(2)              |
| created_at   | timestamp               |
| updated_at   | timestamp               |

### Order

Routes: `GET /orders`, `GET /orders/:id` & `POST /orders`

| Column Name     | Datatype                |
|-----------------|-------------------------|
| id              | serial                  |
| name            | TEXT                    |
| quantity        | INTEGER                 |
| created_at      | timestamp               |
| updated_at      | timestamp               |
| product_id (FK) | INTEGER                 |

### Inventory

Route: `none`

| Column Name     | Datatype                |
|-----------------|-------------------------|
| id              | serial                  |
| quantity        | INTEGER                 |
| created_at      | timestamp               |
| updated_at      | timestamp               |
| product_id (FK) | INTEGER                 |