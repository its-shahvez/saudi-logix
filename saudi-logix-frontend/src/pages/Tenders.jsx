import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Eye } from 'lucide-react';

function Tenders() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Etimad API call (baad mein real API laga denge)
    axios.get('http://localhost:8080/api/shipments') // abhi shipment data use kar rahe hain as mock
      .then(res => {
        setTenders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Etimad Tenders</h1>
          <p className="text-zinc-400">Saudi Government Tenders • Auto-matched with your capabilities</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-3xl text-white flex items-center gap-2">
          <Download size={20} />
          Export Tenders
        </button>
      </div>

      {loading ? (
        <p>Loading government tenders...</p>
      ) : (
        <div className="bg-zinc-900 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 text-xs text-zinc-400">
                <th className="text-left p-6">Tender ID</th>
                <th className="text-left p-6">Description</th>
                <th className="text-left p-6">Value (SAR)</th>
                <th className="text-left p-6">Deadline</th>
                <th className="text-left p-6">Match Score</th>
                <th className="text-right p-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender.id} className="border-b border-zinc-700 hover:bg-zinc-800">
                  <td className="p-6 font-medium">ETD-{tender.id}</td>
                  <td className="p-6">Logistics services for {tender.destination}</td>
                  <td className="p-6 font-semibold">SAR 45,00,000</td>
                  <td className="p-6 text-zinc-400">15 May 2026</td>
                  <td className="p-6">
                    <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-3xl text-xs">92% Match</span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-emerald-400 hover:text-white">Bid Now</button>
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

export default Tenders;