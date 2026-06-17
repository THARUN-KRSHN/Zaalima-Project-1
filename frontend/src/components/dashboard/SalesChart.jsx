import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesVolumeData } from '../../data/analyticsData';

export default function SalesChart() {
    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-[340px] overflow-hidden">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Monthly Sales Volume</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Volume ledger tracking total item conversion checkouts.</p>
            </div>

            {/* 🌟 SMART SWIPE LAYER: Limits column compressing on mobile by offering swipe tracking 
                and unlocks completely for the static wide look on tablets. */}
            <div className="w-full flex-grow overflow-x-auto sm:overflow-x-hidden overflow-y-hidden scrollbar-none touch-pan-x">
                <div className="h-full min-w-[540px] sm:min-w-0 text-[10px] sm:text-xs font-sans select-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesVolumeData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
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
                                formatter={(value) => [value, 'Units Sold']}
                            />
                            <Bar dataKey="unitsSold" fill="rgb(59, 130, 246)" radius={[3, 3, 0, 0]} maxBarSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}