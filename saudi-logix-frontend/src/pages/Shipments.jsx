import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Download, Eye } from 'lucide-react';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se real data fetch kar rahe hain
  useEffect(() => {
    axios.get('http://localhost:8080/api/shipments')
      .then((res) => {
        setShipments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Backend se data nahi aa raha", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Shipments</h1>
          <p className="text-zinc-400">Real-time shipments from backend</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-center text-zinc-400 py-20">Loading shipments from backend...</p>
      ) : (
        <div className="bg-zinc-900 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400 text-sm">
                <th className="text-left p-6">Tracking No</th>
                <th className="text-left p-6">Origin → Destination</th>
                <th className="text-left p-6">Status</th>
                <th className="text-left p-6">Fasah</th>
                <th className="text-left p-6">SABER</th>
                <th className="text-right p-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-zinc-700 hover:bg-zinc-800 transition-all">
                  <td className="p-6 font-mono">{shipment.trackingNumber}</td>
                  <td className="p-6">{shipment.origin} → {shipment.destination}</td>
                  <td className="p-6">
                    <span className="px-4 py-1 rounded-3xl text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-6 text-emerald-400">{shipment.fasahStatus || '—'}</td>
                  <td className="p-6 text-amber-400">{shipment.saberStatus || '—'}</td>
                  <td className="p-6 text-right">
                    <button className="text-emerald-400 hover:text-white">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Shipments;