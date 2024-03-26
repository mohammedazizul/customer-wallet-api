# Customer Wallet API

## Description

The Customer Wallet API is a Node.js application that provides RESTful endpoints for managing customers and their associated wallets. It allows users to perform operations such as creating customers, retrieving customer information, creating wallets, removing customer and associated wallet, and more. The API is built using Express.js for handling HTTP requests and MySQL for data storage.

## Features

- **Customer Management**: Create, retrieve, update, and delete customer records.
- **Wallet Management**: Create wallets for customers, retrieve wallet information and delete wallet records.
- **Secure Authentication**: Implement authentication mechanisms to secure API endpoints.
- **Environment Variables**: Configure database credentials and other settings using environment variables and a `.env` file.
- **Automatic Server Restart**: Utilize Nodemon for automatic server restarts during development.

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/mohammedazizul/customer-wallet-api.git
   ```

2. Navigate to the project directory:

   ```bash
    cd customer-wallet-api
   ```

3. Install dependencies:

   ```bash
    npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
    PORT=5000
    SERVER_NAME="customer-wallet-api"
    TIME_ZONE="Asia/Kuala_Lumpur"
    API_KEY="123456789"
   ```

5. Start the server:

   ```bash
    npm start
   ```

6. Access the API at `http://localhost:5000`.

## Usage

- **API Endpoints**: Refer to the API documentation for details on available endpoints and their usage.
- **Testing**: Use tools like Postman or curl to test the API endpoints and verify functionality.
- **Customization**: Customize the API as needed by modifying route handlers, middleware, and configuration settings.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Implement your feature or fix.
4. Commit your changes and push to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact [Mohammed Azizul](mailto:mohammedazizulhoquesheikh@gmail.com).
