import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function TradeoffRadarChart({ data }) {
  // Convert object { "Cost Efficiency": 85, ... } to array format for Recharts
  const chartData = data ? Object.keys(data).map(key => ({
    subject: key,
    value: data[key],
    fullMark: 100
  })) : [
    { subject: 'Cost Efficiency', value: 85, fullMark: 100 },
    { subject: 'Emission Score', value: 90, fullMark: 100 },
    { subject: 'Speed / Delivery', value: 75, fullMark: 100 },
    { subject: 'Eco Efficiency', value: 88, fullMark: 100 },
    { subject: 'Schedule Reliability', value: 80, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#2A3656" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
          <Radar
            name="Scenario Score"
            dataKey="value"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px', color: '#FFF' }}
            formatter={(val) => [`${val} / 100`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
