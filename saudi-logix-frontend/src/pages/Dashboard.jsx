import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Truck, MapPin, AlertCircle, TrendingUp } from 'lucide-react';
import '../index.css';

const trendData = [
  { day: 'Mon', shipments: 142 }, { day: 'Tue', shipments: 138 },
  { day: 'Wed', shipments: 165 }, { day: 'Thu', shipments: 151 },
  { day: 'Fri', shipments: 183 }, { day: 'Sat', shipments: 148 },
  { day: 'Sun', shipments: 155 }
];

const statusData = [
  { name: 'In Transit', value: 87, color: '#10b981' },
  { name: 'Customs', value: 47, color: '#f59e0b' },
  { name: 'Delivered', value: 112, color: '#3b82f6' },
  { name: 'Delayed', value: 15, color: '#ef4444' }
];

function Dashboard() {
  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter">Executive Summary</h1>
          <p className="text-zinc-400">April 2026 • Kingdom of Saudi Arabia</p>
        </div>
        <div className="text-emerald-400 text-sm">Last updated just now</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-6">
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-emerald-500 transition-all">
          <p className="text-emerald-400 text-sm font-medium">Total Shipments</p>
          <p className="text-6xl font-bold mt-3">284</p>
          <div className="flex items-center gap-1 text-emerald-400 text-sm mt-4">
            <TrendingUp size={16} /> +18 this week
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-amber-500 transition-all">
          <p className="text-amber-400 text-sm font-medium">In Customs</p>
          <p className="text-6xl font-bold mt-3">47</p>
          <p className="text-amber-400 text-sm mt-4">Fasah Clearance Pending</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-blue-500 transition-all">
          <p className="text-blue-400 text-sm font-medium">On-Time Delivery</p>
          <p className="text-6xl font-bold mt-3">94%</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-red-500 transition-all">
          <p className="text-red-400 text-sm font-medium">Delayed</p>
          <p className="text-6xl font-bold mt-3">9</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-purple-500 transition-all">
          <p className="text-purple-400 text-sm font-medium">Carbon Saved</p>
          <p className="text-6xl font-bold mt-3">1.8t</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700 hover:border-teal-500 transition-all">
          <p className="text-teal-400 text-sm font-medium">Avg Delivery Days</p>
          <p className="text-6xl font-bold mt-3">4.2</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Daily Shipments Trend</h3>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Line type="monotone" dataKey="shipments" stroke="#10b981" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Shipment Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={120}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;