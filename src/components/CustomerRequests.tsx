
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [{
  subject: 'North America',
  value: 85
}, {
  subject: 'South America',
  value: 75
}, {
  subject: 'Europe',
  value: 65
}, {
  subject: 'Asia',
  value: 80
}, {
  subject: 'Australia',
  value: 70
}];

const CustomerRequests = () => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Regions" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerRequests;
