# Minimal svelte eshop

> simple little demo project for the foxconn company

## Tasks:

1. ### Core Tasks

   - [X] 🖥️ Create the e-commerce interface.
   - [X] 📱 Implement responsive web design.
   - [X] 📦 Create a grid to display at least 3 products.
   - [X] 🏷️ Add product information: Each product should display the stock quantity and description.
   - [X] 🔗 Connect the web application to a database (e.g., MySQL, MSSQL).
   - [X] 💾 Store product information in the database.
2. ### Shopping Functionality

   - [X] 🛍️ Functionality to add products to the shopping cart.
   - [X] 📋 Show user's cart after each purchase.
   - [X] 📉 Implement functionality to update the stock quantity after each purchase.
3. ### Extra Tasks

   - [ ] 🔒 Implement product reservation: When a user adds a product to the cart, reserve the item, and temporarily deduct it from the stock.
   - [X] 👤 Add user registration and login functionality.
   - [X] 🛠️ Allow users to manage their shopping accounts and purchase history.
   - [ ] ⭐ Implement product ratings and reviews: Allow users to rate and review products.
   - [ ] 🌟 Display the average rating for each product.
   - [ ] 🔎 Add product filtering by category, price, or rating.
   - [ ] 🕵️ Implement a search bar for easy product finding.
   - [ ] 📧 Send users order confirmation emails.
   - [ ] 📨 Notify users of changes in their order status.
   - [X] 🖥️ Create an administrative interface for managing products, users, and orders.
   - [X] 🛠️ Allow administrators to add, edit, and delete products.

---

## Getting Started

To set up the project for development, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```
2. Install the node modules using [pnpm](https://pnpm.io/installation "installation guide") (preferred) or npm:

   ```sh
    pnpm install
   ```

   > Alternatively, you can use `npm install` instead, but this project was built using `pnpm`.
   >

### Running the Development Build

To start the development server, simply run:

```sh
pnpm run dev
```

The application should now be running on [http://localhost:6969](http://localhost:6969/).

## Building

To create a production version of your app:

```bash
pnpm run build
```

---

Happy coding! 🌟
