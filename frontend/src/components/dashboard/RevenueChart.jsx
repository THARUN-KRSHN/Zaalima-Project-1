import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// 🌟 Connected to centralized analytics data engine
import { revenueData } from '../../data/analyticsData';

export default function RevenueChart() {
    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-[320px]">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Revenue Trajectory</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Gross income performance tracking across the last two quarters.</p>
            </div>

            <div className="w-full flex-grow text-xs font-sans">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgb(124, 58, 237)" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="rgb(124, 58, 237)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                        {/* Key updated to 'month' to match mock data schema */}
                        <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="var(--text-muted)" />
                        <YAxis axisLine={false} tickLine={false} stroke="var(--text-muted)" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-light)', borderRadius: '12px', color: 'var(--text-main)' }}
                            formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="rgb(124, 58, 237)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}