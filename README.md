# card-transaction
This repository contains the implementation of the Cards API. It provides various endpoints to retrieve information about items sold in a market.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/cards-api.git
Install the dependencies:

shell
Copy code
cd cards-api
npm install
Start the server:

shell
Copy code
npm start
The server will start running on http://localhost:3000.

API Endpoints
The following API endpoints are available:

### Total Items Sold in Marketing
Endpoint: GET /api/total_items

Use Case: Returns the total number of items (total seats) sold in the marketing department within a specified date range.

 Parameters:

start_date: Start date (YYYY-MM-DD) for the query.
end_date: End date (YYYY-MM-DD) for the query.
department: Department name (string) for filtering the results.
### Nth Most Sold Item
Endpoint: GET /api/nth_most_total_item

Use Cases:

Returns the name of the 2nd most sold item (in terms of quantity) within a specified date range.
Returns the name of the 4th most sold item (in terms of total price) within a specified date range.
Parameters:

### item_by: Indicates whether to sort by "quantity" or "price".
start_date: Start date (YYYY-MM-DD) for the query.
end_date: End date (YYYY-MM-DD) for the query.
n: Nth position for the result.
### Percentage of Department-wise Sold Items
Endpoint: GET /api/percentage_of_department_wise_sold_items

Use Case: Returns the percentage of sold items (seats) department-wise within a specified date range.

Parameters:

start_date: Start date (YYYY-MM-DD) for the query.
end_date: End date (YYYY-MM-DD) for the query.
### . Monthly Sales
Endpoint: GET /api/monthly_sales

Use Case: Returns the monthly sales for a specific product throughout the year.

Parameters:

product: Product name (string) for filtering the results.
year: Year (number) for the query.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

