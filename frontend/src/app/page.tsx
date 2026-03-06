"use client";

import { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Terminal, Info, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Home() {
    const [formData, setFormData] = useState({
        symbol: 'BTCUSDT',
        side: 'BUY',
        order_type: 'MARKET',
        quantity: 0.01,
        price: '',
    });

    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    quantity: Number(formData.quantity),
                    price: formData.order_type === 'LIMIT' ? Number(formData.price) : null,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Order failed');

            setResponse(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Order Execution Form */}
            <Card className="md:col-span-12 lg:col-span-7">
                <CardHeader>
                    <CardTitle className="text-4xl flex items-center gap-3">
                        Execute Trade
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Place high-precision orders on Binance Futures Testnet.
                    </CardDescription>
                    <CardAction>
                        <Badge variant="default" className="text-xs uppercase">Live Connection</Badge>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="symbol">Ticker Symbol</Label>
                            <Input
                                id="symbol"
                                value={formData.symbol}
                                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                placeholder="BTCUSDT"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Order Side</Label>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, side: 'BUY' })}
                                        className="flex-1"
                                        variant={formData.side === 'BUY' ? 'default' : 'neutral'}
                                    >
                                        BUY
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, side: 'SELL' })}
                                        className="flex-1"
                                        variant={formData.side === 'SELL' ? 'default' : 'neutral'}
                                        style={formData.side === 'SELL' ? { backgroundColor: '#ff6b6b' } : {}}
                                    >
                                        SELL
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order_type">Order Type</Label>
                                <Select
                                    value={formData.order_type}
                                    onValueChange={(value) => setFormData({ ...formData, order_type: value })}
                                >
                                    <SelectTrigger id="order_type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MARKET">MARKET</SelectItem>
                                        <SelectItem value="LIMIT">LIMIT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Asset Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    step="0.0001"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                    required
                                />
                            </div>
                            {formData.order_type === 'LIMIT' && (
                                <div className="space-y-2">
                                    <Label htmlFor="price">Target Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-16 text-xl tracking-widest"
                        style={formData.side === 'SELL' ? { backgroundColor: '#ff6b6b' } : { backgroundColor: '#00FF66' }}
                    >
                        {loading ? (
                            <span className="animate-pulse">TRANSMITTING...</span>
                        ) : (
                            `CONFIRM ${formData.side} ORDER`
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {/* Response & Status */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-8">
                {/* API Response Card */}
                <Card className="bg-[#c3dafe]">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal size={24} /> API FEED
                            </div>
                            <Badge variant="neutral">REAL-TIME</Badge>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="bg-white border-2 border-border rounded-base p-4 h-[350px] overflow-auto font-mono text-sm leading-relaxed shadow-none">
                            {response ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-green-700 font-heading bg-[#00FF66]/20 p-2 border-2 border-border rounded-base">
                                        <CheckCircle2 size={24} /> ORDER CONFIRMED
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between border-b-2 border-dashed border-gray-200 py-1">
                                            <span className="text-gray-500">ID</span>
                                            <span className="font-heading underline">{response.orderId}</span>
                                        </div>
                                        <div className="flex justify-between border-b-2 border-dashed border-gray-200 py-1">
                                            <span className="text-gray-500">Price</span>
                                            <span className="font-heading italic">{response.avgPrice}</span>
                                        </div>
                                        <div className="flex justify-between border-b-2 border-dashed border-gray-200 py-1">
                                            <span className="text-gray-500">Filled</span>
                                            <span className="font-heading">{response.executedQty}</span>
                                        </div>
                                    </div>
                                    <pre className="mt-4 p-2 bg-gray-50 rounded-base text-[10px] break-all border-2 border-gray-100">
                                        {JSON.stringify(response, null, 2)}
                                    </pre>
                                </div>
                            ) : error ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-red-700 font-heading bg-red-100 p-2 border-2 border-border rounded-base">
                                        <AlertCircle size={24} /> REJECTED
                                    </div>
                                    <p className="text-red-600 bg-red-50 p-2 border-2 border-red-200 rounded-base font-base">{error}</p>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-70">
                                    <Info size={48} className="animate-bounce text-black" />
                                    <p className="font-heading uppercase italic tracking-widest text-center text-black">
                                        AWAITING ORDER<br />INPUT DATA...
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="neutral" className="w-full text-xs" onClick={() => setResponse(null)}>
                            CLEAR FEED
                        </Button>
                    </CardFooter>
                </Card>

                {/* Info Card */}
                <Card className="bg-main">
                    <CardContent className="flex items-center gap-4 py-4">
                        <div className="p-3 bg-white border-2 border-border rounded-base shadow-shadow">
                            <ExternalLink size={24} />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-lg">TESTNET ACTIVE</CardTitle>
                            <CardDescription className="text-xs text-black/80">
                                Trading is in simulator mode. No real capital at risk.
                            </CardDescription>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
