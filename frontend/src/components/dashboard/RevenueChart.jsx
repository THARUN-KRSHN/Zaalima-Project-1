import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData } from '../../data/analyticsData';

export default function RevenueChart() {
    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-[340px] overflow-hidden">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Revenue Trajectory</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Gross income performance tracking across a 12-month timeline.</p>
            </div>

            {/* 🌟 SMART SWIPE LAYER: Enforces horizontal overflow scroll ONLY on mobile screens. 
                Resets cleanly to standard block behaviour on sm (Tablet) screens and above. */}
            <div className="w-full flex-grow overflow-x-auto sm:overflow-x-hidden overflow-y-hidden scrollbar-none touch-pan-x">
                <div className="h-full min-w-[540px] sm:min-w-0 text-[10px] sm:text-xs font-sans select-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgb(124, 58, 237)" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="rgb(124, 58, 237)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                stroke="var(--text-muted)"
                                dy={8}
                                interval={0}
                            />
                            <YAxis axisLine={false} tickLine={false} stroke="var(--text-muted)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-light)', borderRadius: '12px', color: 'var(--text-main)' }}
                                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="rgb(124, 58, 237)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}