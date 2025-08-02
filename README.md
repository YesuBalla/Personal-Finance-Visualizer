# 💰 FinVisual – Personal Finance Visualizer

**FinVisual** is a full-stack web application designed to help users track personal financial transactions through a clean, interactive, and visually appealing interface.

Users can securely log in, manage their transactions, and gain insights into their spending habits with intuitive visualizations.

---

## ✨ Features

- 🔐 **Secure User Authentication** – Supports Google, GitHub, and email/password login.
- 📋 **Transaction Management** – View, add, edit, and delete personal financial transactions.
- ➕ **Add Transactions** – A slide-in form makes it easy to input new expenses or incomes.
- ✏️ **Edit Transactions** – Update existing entries with a user-friendly interface.
- 🗑️ **Delete Transactions** – Confirm before deleting to prevent accidental loss.
- 📊 **Data Visualization** – Interactive pie charts give users a snapshot of their spending by category.
- 🔒 **Protected API Routes** – Every API route checks for proper user authentication and data ownership.
- ⚡ **Instant Test Data** – Visit [`/api/seed-transactions`](http://localhost:3000/api/seed-transactions) to generate test transactions (requires login).

---

## 🌍 Live Demo

This application is deployed on **Vercel**.

🔗 **Live App:**  
[https://personal-finance-visualizer-wheat-two.vercel.app](https://personal-finance-visualizer-wheat-two.vercel.app)

🔐 **Sign In:**  
[https://personal-finance-visualizer-wheat-two.vercel.app/signin](https://personal-finance-visualizer-wheat-two.vercel.app/signin)

> Supports Google, GitHub, and email/password login using NextAuth.js

---

## 🧠 Example Transaction Categories

Transactions generated via `/api/seed-transactions` come from a smart seed generator using realistic descriptions, such as:

- **Food:** Grocery shopping, Coffee shop, Fast food orders
- **Rent:** Apartment rent, Shared room payments
- **Utilities:** Internet, Electricity, Water bills
- **Transportation:** Fuel, Uber rides, Train tickets
- **Entertainment:** Movie tickets, Concerts, Subscriptions
- **Health:** Gym, Doctor appointments, Pharmacy
- **Shopping:** Gadgets, Clothes, Online purchases
- **Education:** Online courses, Books, Workshops
- **Investments:** Stocks, Mutual funds, Crypto
- **Travel:** Flights, Hotels, Local travel

> Requires the user to be authenticated

---

## 🔧 Tech Stack

### Frontend
- **Next.js 14** – App Router with SSR/SSG support
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui & Radix UI** – Accessible, reusable UI components
- **Zustand** – Lightweight state management
- **Axios** – Promise-based HTTP client

### Backend
- **Next.js API Routes** – Serverless backend for authentication and data handling
- **Mongoose** – MongoDB object modeling for Node.js

### Database
- **MongoDB Atlas** – Cloud database for user and transaction storage

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/YesuBalla/Personal-Finance-Visualizer.git
cd Personal-Finance-Visualizer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
MONGODB_URI=<Your MongoDB Connection String>
NEXTAUTH_SECRET=<Your NextAuth Secret>
NEXTAUTH_URL=http://localhost:3000

AUTH_GOOGLE_ID=<Your Google OAuth Client ID>
AUTH_GOOGLE_SECRET=<Your Google OAuth Client Secret>

AUTH_GITHUB_ID=<Your GitHub OAuth Client ID>
AUTH_GITHUB_SECRET=<Your GitHub OAuth Client Secret>
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Your app will now be running at `http://localhost:3000` 🎉

---

## 📡 API Endpoints

| Method | Endpoint                     | Description                                       |
|--------|------------------------------|---------------------------------------------------|
| GET    | `/api/transactions`          | Fetch all user transactions (requires auth)       |
| PATCH  | `/api/transactions/[id]`     | Update a specific transaction by ID               |
| DELETE | `/api/transactions/[id]`     | Delete a specific transaction by ID               |
| GET    | `/api/seed-transactions`     | 🌱 Instantly seed transactions for testing (auth)  |

---

## 🌱 Data Seeding Logic

The app includes a smart data generator that creates realistic transaction data across 12 months, with descriptions like:

- "Movie Ticket"
- "Fuel Refill"
- "Online Shopping"
- "Gym Membership"

Visit [`/api/seed-transactions`](http://localhost:3000/api/seed-transactions) while logged in to generate data for your account.

---

## 💬 Contributions & Feedback

Have suggestions or want to contribute? Feel free to open an issue or submit a pull request. We welcome all feedback and ideas!

---

**Built with ❤️ using Next.js, MongoDB, and Tailwind CSS**