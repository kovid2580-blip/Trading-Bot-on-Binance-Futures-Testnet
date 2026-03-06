from binance.client import Client
from binance.exceptions import BinanceAPIException
import logging
from .logging_config import setup_logging

logger = logging.getLogger(__name__)

from typing import Optional

class BinanceClient:
    def __init__(self, api_key: str, api_secret: str):
        self.client = Client(api_key, api_secret, testnet=True)
        logger.info("Binance Futures Testnet Client initialized.")

    def create_order(self, symbol: str, side: str, order_type: str, quantity: float, price: Optional[float] = None, stop_price: Optional[float] = None):
        """Sends order request to Binance Futures Testnet."""
        try:
            params = {
                "symbol": symbol,
                "side": side,
                "type": order_type,
                "quantity": quantity
            }
            
            if order_type in ["LIMIT", "STOP", "TAKE_PROFIT"]:
                params["price"] = str(price)
                params["timeInForce"] = "GTC"  # Good Till Cancelled
            
            if order_type in ["STOP", "TAKE_PROFIT"]:
                params["stopPrice"] = str(stop_price)

            logger.info(f"Placing {order_type} {side} order for {quantity} {symbol} at {price}")
            
            # Use futures_create_order for Binance Futures
            response = self.client.futures_create_order(**params)
            
            logger.info(f"Order created successfully: {response.get('orderId')}")
            return response

        except BinanceAPIException as e:
            logger.error(f"Binance API Error: {e.message} (code: {e.code})")
            raise e
        except Exception as e:
            logger.error(f"Network or Unexpected Error: {str(e)}")
            raise e
