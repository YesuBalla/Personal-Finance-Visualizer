# 💰 FinVisual – Personal Finance Visualizer

**FinVisual** is a full-stack web application designed to help users track personal financial transactions in a clean, interactive, and visually appealing interface.

Users can securely log in, manage their transactions, and gain insights into their spending habits with intuitive visualizations.

---

## ✨ Features

- **🔐 Secure User Authentication:** All transaction-related operations require users to log in.
- **📋 Transaction Management:** View, add, edit, and delete personal financial transactions.
- **➕ Add Transactions:** A slide-in form makes it easy to input new expenses or incomes.
- **✏️ Edit Transactions:** Update existing entries with a user-friendly interface.
- **🗑️ Delete Transactions:** Confirm before deleting to prevent accidental loss.
- **📊 Data Visualization:** Interactive pie charts give users a snapshot of their spending by category.
- **🔒 Protected API Routes:** Every API route checks for proper user authentication and data ownership.
- **⚡ Instant Test Data:** Just visit [`http://localhost:3000/api/seed-transactions`](http://localhost:3000/api/seed-transactions) to generate user-based transaction data instantly.

---

## 🧠 Example Transaction Categories

Transactions generated via `/api/seed-transactions` come from a smart seed generator using realistic descriptions per category, such as:

- **Food:** Grocery shopping, Coffee shop, Fast food orders
- **Rent:** Apartment rent, Shared room payments
- **Utilities:** Internet, Electricity, Water bills
- **Transportation:** Fuel, Uber rides, Train tickets
- **Entertainment:** Movie tickets, Concerts, Streaming subscriptions
- **Health:** Gym, Doctor appointments, Pharmacy
- **Shopping:** Gadgets, Clothes, Online purchases
- **Education:** Online courses, Books, Workshops
- **Investments:** Stocks, Mutual funds, Crypto
- **Travel:** Flights, Hotels, Local travel

---

## 🔧 Tech Stack

### Frontend
- **Next.js 14** – App router based UI with full SSR/SSG.
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui & Radix UI** – Reusable, accessible components.
- **Zustand** – Lightweight and scalable state management.
- **Axios** – Promise-based HTTP client.

### Backend
- **Next.js API Routes** – Serverless backend for API requests.
- **Mongoose** – Elegant MongoDB object modeling for Node.js.

### Database
- **MongoDB** – Stores users' transaction data securely.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and add:

```env
MONGODB_URI=<your-mongodb-connection-string>
AUTH_SECRET=<your-nextauth-secret>
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Now your app will be running at `http://localhost:3000` 🎉

---

## 📡 API Endpoints

| Method | Endpoint                     | Description                                       |
|--------|------------------------------|---------------------------------------------------|
| GET    | `/api/transactions`          | Fetch all user transactions (requires auth).     |
| PATCH  | `/api/transactions/[id]`     | Update a specific transaction by ID.             |
| DELETE | `/api/transactions/[id]`     | Delete a specific transaction by ID.             |
| GET    | `/api/seed-transactions`     | 🌱 Instantly seed transactions for testing.       |

---

## 📈 Data Seeding Logic

The app includes a dummy data generator that produces realistic transactions across 12 months, randomly selecting descriptions for each category like “Movie Ticket”, “Fuel refill”, or “Online shopping”.

This makes testing more intuitive and enjoyable!

---

## 🧠 Contribution & Feedback

Got a suggestion or found a bug? Open an issue or PR – we’d love your input!

---

**Built with ❤️ using Next.js + MongoDB + Tailwind**