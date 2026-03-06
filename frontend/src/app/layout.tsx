import './globals.css';
import Link from 'next/link';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen">
                <nav className="bg-main neo-border border-t-0 border-x-0 py-4 px-8 flex justify-between items-center mb-8">
                    <Link href="/" className="text-2xl font-heading italic tracking-tighter uppercase transition-transform hover:scale-105 inline-block">
                        Binance Bot <span className="bg-border text-white px-1">TX</span>
                    </Link>
                    <div className="flex gap-4">
                        <span className="font-heading flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#00FF66] rounded-full neo-border border-2 animate-pulse"></span>
                            API: ONLINE
                        </span>
                    </div>
                </nav>
                <main className="max-w-6xl mx-auto px-4 pb-12">
                    {children}
                </main>
            </body>
        </html>
    );
}
