from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import config
from bot.client import BinanceClient
from bot.orders import place_order
from bot.logging_config import setup_logging
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Binance Bot API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_logging()
client = BinanceClient(config.API_KEY, config.API_SECRET)

class OrderRequest(BaseModel):
    symbol: str
    side: str
    order_type: str
    quantity: float
    price: Optional[float] = None
    stop_price: Optional[float] = None

@app.get("/")
def read_root():
    return {"status": "online", "message": "Binance Bot API"}

@app.post("/order")
def create_order(order: OrderRequest):
    result = place_order(
        client,
        order.symbol.upper(),
        order.side.upper(),
        order.order_type.upper(),
        order.quantity,
        order.price,
        order.stop_price
    )
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config.HOST, port=config.PORT)
