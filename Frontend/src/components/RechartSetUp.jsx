import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
function RechartSetUp({ charts }) {
    if (!charts || charts.length === 0) return null;
    const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];
    return (
        <div className='space-y-8'>
            {charts.map((chart, index) => (
                <div key={index} className='rounded-xl border border-slate-700 bg-[#0b1120] p-4'>

                    <h4 className='mb-3 font-semibold text-slate-100'>
                        📊 {chart.title}
                    </h4>
                    <div className='h-72'>

                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />
                                    <YAxis tick={{ fill: "#cbd5e1" }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />
                                    <Tooltip contentStyle={{ backgroundColor: "#111c30", border: "1px solid #334155", borderRadius: "12px" }} labelStyle={{ color: "#f1f5f9" }} itemStyle={{ color: "#cbd5e1" }} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Bar>
                                </BarChart>
                            )}

                            {chart.type === "line" && (
                                <LineChart data={chart.data}>
                                    <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />
                                    <YAxis tick={{ fill: "#cbd5e1" }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />
                                    <Tooltip contentStyle={{ backgroundColor: "#111c30", border: "1px solid #334155", borderRadius: "12px" }} labelStyle={{ color: "#f1f5f9" }} itemStyle={{ color: "#cbd5e1" }} />
                                    <Line type="monotone"
                                        dataKey="value"
                                        stroke="#6366f1"
                                        strokeWidth={3} />
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip contentStyle={{ backgroundColor: "#111c30", border: "1px solid #334155", borderRadius: "12px" }} labelStyle={{ color: "#f1f5f9" }} itemStyle={{ color: "#cbd5e1" }} />
                                    <Pie data={chart.data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Pie>
                                </PieChart>

                            )}

                        </ResponsiveContainer>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default RechartSetUp