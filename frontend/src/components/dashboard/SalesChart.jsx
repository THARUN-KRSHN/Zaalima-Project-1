import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
    { name: 'Jan', sales: 45 },
    { name: 'Feb', sales: 58 },
    { name: 'Mar', sales: 82 },
    { name: 'Apr', sales: 69 },
    { name: 'May', sales: 94 },
    { name: 'Jun', sales: 120 },
];

export default function SalesChart() {
    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-[320px]">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Monthly Sales Volume</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Volume ledger tracking total item conversion checkouts.</p>
            </div>

            <div className="w-full flex-grow text-xs font-sans">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="var(--text-muted)" />
                        <YAxis axisLine={false} tickLine={false} stroke="var(--text-muted)" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-light)', borderRadius: '12px', color: 'var(--text-main)' }}
                            formatter={(value) => [value, 'Units Sold']}
                        />
                        <Bar dataKey="sales" fill="rgb(59, 130, 246)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}