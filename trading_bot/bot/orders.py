import logging
from .validators import (
    validate_symbol,
    validate_side,
    validate_order_type,
    validate_quantity,
    validate_price,
    validate_stop_price
)

logger = logging.getLogger(__name__)

def place_order(client, symbol, side, order_type, quantity, price=None, stop_price=None):
    """
    High-level function to validate and place an order.
    Returns a formatted result dictionary.
    """
    try:
        # Validate inputs
        validate_symbol(symbol)
        validate_side(side)
        validate_order_type(order_type)
        validate_quantity(quantity)
        
        if order_type in ["LIMIT", "STOP", "TAKE_PROFIT"]:
            validate_price(price, order_type)
        
        if order_type in ["STOP", "TAKE_PROFIT"]:
            validate_stop_price(stop_price, order_type)

        # Execute order via client
        response = client.create_order(
            symbol=symbol,
            side=side,
            order_type=order_type,
            quantity=quantity,
            price=price,
            stop_price=stop_price
        )

        # Parse and format response
        result = {
            "success": True,
            "orderId": response.get("orderId"),
            "status": response.get("status"),
            "executedQty": response.get("executedQty"),
            "avgPrice": response.get("avgPrice", "0.0"),
            "symbol": response.get("symbol"),
            "side": response.get("side"),
            "type": response.get("type")
        }
        
        logger.info(f"Order {result['orderId']} placed successfully. Status: {result['status']}")
        return result

    except Exception as e:
        logger.error(f"Failed to place order: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }
