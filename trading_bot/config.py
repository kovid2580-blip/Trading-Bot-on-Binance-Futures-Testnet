import os
from dotenv import load_dotenv

load_dotenv()

# Binance Futures Testnet Credentials
API_KEY = os.getenv("BINANCE_API_KEY", "")
API_SECRET = os.getenv("BINANCE_API_SECRET", "")

# Base URL for Futures Testnet
BASE_URL = "https://testnet.binancefuture.com"

# FastAPI Settings
HOST = "0.0.0.0"
PORT = 8000
