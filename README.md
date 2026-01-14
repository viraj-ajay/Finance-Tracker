# Full-Stack Finance Tracker

A robust, containerized investment portfolio manager that allows users to track stock holdings in real-time. The application calculates current portfolio value, total investment, and profit/loss percentages using live market data from Alpha Vantage.

## Features

* **Real-Time Market Data:** Integrates with **Alpha Vantage API** to fetch live stock prices (e.g., MSFT, AAPL).
* **High Performance:** Uses **Redis** caching to store stock prices, reducing API latency and preventing rate-limiting.
* **Secure Authentication:** User registration and login protected by **Spring Security** and **JWT** (JSON Web Tokens).
* **Portfolio Management:** Users can create multiple portfolios and log "Buy" transactions.
* **Live Dashboard:** A responsive **React (Vite)** frontend that visualizes holdings and performance metrics.
* **Persistent Data:** All user and transaction data is securely stored in **PostgreSQL**.
* **Dockerized:** Entire stack (App, DB, Cache) spins up with a single `docker-compose` command.

---

## Tech Stack

### Backend
* **Language:** Java 21
* **Framework:** Spring Boot 3.2
* **Security:** Spring Security, JWT
* **Database:** PostgreSQL
* **Cache:** Redis
* **Build Tool:** Maven

### Frontend
* **Framework:** React.js
* **Build Tool:** Vite
* **Styling:** CSS Modules / Standard CSS

### DevOps
* **Containerization:** Docker & Docker Compose
* **API:** Alpha Vantage (Financial Data)

---

##Getting Started
Prerequisites
Docker Desktop (Running)

Java 21

Node.js & npm

Alpha Vantage API Key (Free from alphavantage.co)

---

1. Backend Setup
The backend runs in a Docker container (Database & Cache) and a local Java process.

Start Infrastructure:

Bash
cd backend
docker-compose up -d
Configure API Key: Open backend/src/main/resources/application.yml and add your key:

financial-api:
  alpha-vantage:
    api-key: YOUR_KEY_HERE

Run Application:

Bash

mvn spring-boot:run

---

2. Frontend Setup
Install & Run: Open a new terminal.

Bash

cd frontend
npm install
npm run dev
Access: Open your browser to http://localhost:5173.

How to Use
Register: Create an account on the Login screen (e.g., crypto_king).

Create Portfolio (One-time Setup): Since the UI for creating portfolios is in progress, use this command in your terminal to initialize your first portfolio:

Bash

# Replace YOUR_TOKEN with the JWT from your browser console/local storage
curl -X POST http://localhost:8080/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{ "name": "My Tech Stocks", "description": "Long term holds" }'
Buy Stocks: Add a transaction to see it appear on your dashboard.

Bash

curl -X POST http://localhost:8080/api/portfolios/1/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{ "symbol": "MSFT", "type": "BUY", "quantity": 10, "pricePerUnit": 400.00 }'
Refresh: Reload the dashboard to see your profit/loss calculations!

---

Future Improvements
[ ] Add "Create Portfolio" form to the UI.

[ ] Implement historical price charts using Chart.js.

[ ] Deploy to AWS ECS.

License
This project is open source and available under the MIT License.

---
```text
Finance-Tracker/
├── backend/            # Spring Boot Application
│   ├── src/
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend/           # React Application
    ├── src/
    └── package.json
