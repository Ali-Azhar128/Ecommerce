# ShopEase - MERN Stack E-commerce Project

ShopEase is a dynamic e-commerce platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to shop seamlessly with integrated payment options and provides robust admin functionalities for managing products, orders, and users.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API References](#api-references)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Seamless shopping experience with integrated card payment options.
- Admin-exclusive functionalities for adding, editing, and deleting products.
- Admins can manage orders, including marking orders as delivered.
- User account management features for admins to edit and delete users.
- Admin dashboard for comprehensive management of the platform.
- Responsive design for a smooth experience on both desktop and mobile devices.

## Demo

You can check out the live demo of ShopEase deployed on Render [here](https://shopease-2wtu.onrender.com).

## Installation

To run this project locally, follow these steps:

1. Clone the Repository:

   ```bash
   git clone https://github.com/Ali-Azhar128/Ecommerce.git

   ```

2. Navigate to the Project Directory:
   ```bash
   cd proshop
   ```
3. Install the Dependencies (frontend & backend):
   ```bash
   npm install
   cd frontend
   npm install
   ```
4. Seed Database
   ```bash
   # Import data
   npm run data:import

   # Destroy data
   npm run data:destroy
   ```

5. Create a .env file in the root directory and add your environment variables:
   ```bash
   REACT_APP_PORT = 3000
   REACT_APP_NODE_ENV=your_server
   REACT_APP_MONGO_URI=your_mongodb_uri
   REACT_APP_JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
6. Start the development server:
   ```bash
   # Run frontend (:5005) & backend (:3000)
   npm run dev
   ```

7. Open the app in your browser at http://localhost:5005.

## Usage

- Register and log in to create a user account.
- Browse products and add them to your cart.
- Proceed to checkout and make a payment using your card.
- Admins can log in to access admin functionalities such as managing products, orders, and users through the admin dashboard.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Stripe API for payment processing

## API Reference

The app uses various APIs for its functionalities. Ensure you have the necessary API keys:

- Sign up for an account on the respective API platforms (e.g., MongoDB, Stripe).
- Generate the required API keys.
- Replace the placeholder keys in your .env file with the actual API keys.
- Make sure to specify mode in REACT_APP_NODE_ENV as either production or development

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Features

- Seamless shopping experience with integrated card payment options.
- Admin-exclusive functionalities for adding, editing, and deleting products.
- Admins can manage orders, including marking orders as delivered.
- User account management features for admins to edit and delete users.
- Admin dashboard for comprehensive management of the platform.
- Responsive design for a smooth experience on both desktop and mobile devices.

## Demo

You can check out the live demo of ShopEase deployed on Render. [here](https://shopease-2wtu.onrender.com).

## Contact

If you have any questions or feedback, feel free to reach out to me:

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ali-azhar128/)
