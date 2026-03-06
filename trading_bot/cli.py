import argparse
import sys
from bot.client import BinanceClient
from bot.orders import place_order
from bot.logging_config import setup_logging
import config

def interactive_menu():
    """Interactive CLI menu for easier order placement."""
    print("\n" + "="*40)
    print("      BINANCE TRADING BOT INTERACTIVE")
    print("="*40)
    
    symbol = input("Enter Ticker (e.g. BTCUSDT): ").upper() or "BTCUSDT"
    side = input("Side (BUY/SELL): ").upper() or "BUY"
    
    print("Order Types:")
    print("1. MARKET")
    print("2. LIMIT")
    print("3. STOP")
    print("4. TAKE_PROFIT")
    choice = input("Select Type (1-4): ")
    
    order_types = {"1": "MARKET", "2": "LIMIT", "3": "STOP", "4": "TAKE_PROFIT"}
    order_type = order_types.get(choice, "MARKET")
    
    quantity = float(input("Quantity: ") or 0.001)
    
    price = None
    stop_price = None
    
    if order_type in ["LIMIT", "STOP", "TAKE_PROFIT"]:
        price = float(input("Limit Price: "))
        
    if order_type in ["STOP", "TAKE_PROFIT"]:
        stop_price = float(input("Stop Price: "))
        
    return symbol, side, order_type, quantity, price, stop_price

def main():
    setup_logging()
    
    parser = argparse.ArgumentParser(description="Binance Futures Testnet Trading Bot CLI")
    parser.add_argument("--symbol", help="Trading symbol (e.g., BTCUSDT)")
    parser.add_argument("--side", choices=["BUY", "SELL"], help="Order side")
    parser.add_argument("--type", choices=["MARKET", "LIMIT", "STOP", "TAKE_PROFIT"], help="Order type")
    parser.add_argument("--quantity", type=float, help="Order quantity")
    parser.add_argument("--price", type=float, help="Order price")
    parser.add_argument("--stop-price", type=float, help="Stop price")
    parser.add_argument("--interactive", action="store_true", help="Run in interactive mode")

    args = parser.parse_args()

    if args.interactive:
        symbol, side, order_type, quantity, price, stop_price = interactive_menu()
    else:
        # Check required for non-interactive
        if not all([args.symbol, args.side, args.type, args.quantity]):
            parser.print_help()
            sys.exit(1)
        symbol, side, order_type, quantity, price, stop_price = args.symbol, args.side, args.type, args.quantity, args.price, args.stop_price

    if not config.API_KEY or not config.API_SECRET:
        print("Error: API_KEY and API_SECRET must be set in config.py or .env")
        sys.exit(1)

    print("\n--- Order Request Summary ---")
    print(f"Symbol:     {symbol}")
    print(f"Side:       {side}")
    print(f"Type:       {order_type}")
    print(f"Quantity:   {quantity}")
    if price:
        print(f"Price:      {price}")
    if stop_price:
        print(f"Stop Price: {stop_price}")
    print("-----------------------------\n")

    client = BinanceClient(config.API_KEY, config.API_SECRET)
    
    result = place_order(
        client, 
        symbol, 
        side, 
        order_type, 
        quantity, 
        price,
        stop_price
    )

    if result["success"]:
        print("SUCCESS: Order Placed Successfully!")
        print(f"Order ID:     {result['orderId']}")
        print(f"Status:       {result['status']}")
        print(f"Executed Qty: {result['executedQty']}")
        print(f"Avg Price:    {result['avgPrice']}")
    else:
        print("FAILED: Order Failed")
        print(f"Error: {result['error']}")

if __name__ == "__main__":
    main()
