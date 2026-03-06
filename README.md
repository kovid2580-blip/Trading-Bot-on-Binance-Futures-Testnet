# Binance Futures Testnet Trading Bot + Dashboard

A production-grade, modular Python trading bot with a high-performance FastAPI backend and a stunning Neo-Brutalism web dashboard.

## 🚀 Features

- **Multi-Interface**: Interact via CLI or the Web Dashboard.
- **Neo-Brutalism Design**: High-contrast, bold, and modern UI.
- **Secure**: Handles API credentials via environment variables.
- **Robust**: Integrated validation, structured logging, and error handling.
- **Testnet Ready**: Pre-configured for Binance Futures Testnet.

---

## 📂 Project Structure

```text
.
├── trading_bot/           # Python Backend
│   ├── bot/               # Core bot logic (Client, Orders, Validators)
│   ├── logs/              # Bot execution logs
│   ├── cli.py             # CLI Entry point
│   ├── main.py            # FastAPI Entry point
│   ├── config.py          # Configuration
│   └── requirements.txt   # Backend dependencies
└── frontend/              # Next.js Web Dashboard
    ├── src/               # Source code
    └── tailwind.config.ts # Neo-Brutalism design tokens
```

---

## 🛠️ Setup & Installation

### 1. Environment Variables
Create a `.env` file in the `trading_bot/` directory:
```env
BINANCE_API_KEY=your_testnet_key
BINANCE_API_SECRET=your_testnet_secret
```

### 2. Backend Setup
```bash
cd trading_bot
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

---

## 📈 Usage

### Run via CLI
```bash
python trading_bot/cli.py --symbol BTCUSDT --side BUY --type MARKET --quantity 0.01
```

### Run Web Dashboard
1. Start the Backend API:
```bash
cd trading_bot
python main.py
```
2. Start the Frontend:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the Neo-Brutalism dashboard.

---

## 📝 Logging
Detailed logs are stored in `trading_bot/logs/bot.log` with timestamps and module labels.
