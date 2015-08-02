# Rest Shop API

Mock store API that serves raw data to user connecting via Rest-Shop-App

##Server will:

1. Give JSON data to user based on routes.
1. Check Inventories' stock quantity with `POST /orders` quantity submit is acceptable.
  1. Return 'no stock' message if there isn't enough to support new order post.
  1. Subtract Inventories' stock quantity based on quantity submission.
1. Queries associated products with orders and inventory.


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

##Things to do (Aug 1, 2015):

1. Validate name and quantity input for correct datatypes.
1. Clean up front-end code.