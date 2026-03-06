class ValidationError(Exception):
    """Custom exception for validation errors."""
    pass

def validate_symbol(symbol: str):
    if not isinstance(symbol, str) or not symbol.isupper():
        raise ValidationError("Symbol must be an uppercase string (e.g., BTCUSDT).")

def validate_side(side: str):
    if side not in ["BUY", "SELL"]:
        raise ValidationError("Side must be either 'BUY' or 'SELL'.")

def validate_order_type(order_type: str):
    valid_types = ["MARKET", "LIMIT", "STOP", "TAKE_PROFIT"]
    if order_type not in valid_types:
        raise ValidationError(f"Order type must be one of {valid_types}.")

def validate_quantity(quantity: float):
    try:
        q = float(quantity)
        if q <= 0:
            raise ValidationError("Quantity must be a positive number.")
    except ValueError:
        raise ValidationError("Quantity must be a valid float.")

def validate_price(price: float, order_type: str):
    if order_type in ["LIMIT", "STOP", "TAKE_PROFIT"]:
        if price is None:
            raise ValidationError(f"Price is required for {order_type} orders.")
        try:
            p = float(price)
            if p <= 0:
                raise ValidationError("Price must be a positive number.")
        except ValueError:
            raise ValidationError("Price must be a valid float.")

def validate_stop_price(stop_price: float, order_type: str):
    if order_type in ["STOP", "TAKE_PROFIT"]:
        if stop_price is None:
            raise ValidationError(f"Stop Price is required for {order_type} orders.")
        try:
            sp = float(stop_price)
            if sp <= 0:
                raise ValidationError("Stop Price must be a positive number.")
        except ValueError:
            raise ValidationError("Stop Price must be a valid float.")
