import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Truck, RefreshCw } from 'lucide-react';
import '../index.css';

function LiveTracking() {
  const [shipments, setShipments] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchLiveData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/shipments');
      setShipments(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.log("Live data fetch error", err);
    }
  };

  // Real-time polling (Kafka + WebSocket simulation)
  useEffect(() => {
    fetchLiveData(); // initial load

    const interval = setInterval(() => {
      fetchLiveData();
    }, 2500); // har 2.5 second mein update

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Live Tracking</h1>
          <p className="text-zinc-400">Real-time data from Backend (Kafka Simulation)</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-600 px-6 py-3 rounded-3xl text-white font-medium">
          <RefreshCw className="animate-spin" size={20} />
          <span>{shipments.length} Active Shipments • LIVE</span>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/40 rounded-3xl h-[580px] relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>

        <div className="absolute top-12 left-16 text-emerald-300/90 text-xs font-bold">RIYADH</div>
        <div className="absolute top-28 right-28 text-emerald-300/90 text-xs font-bold">JEDDAH</div>
        <div className="absolute bottom-32 left-28 text-emerald-300/90 text-xs font-bold">DAMMAM</div>
        <div className="absolute bottom-24 right-40 text-emerald-300/90 text-xs font-bold">NEOM</div>

        {shipments.map((shipment, index) => (
          <div
            key={shipment.id}
            className="absolute bg-zinc-900/95 backdrop-blur-md border border-emerald-500 rounded-3xl px-6 py-5 shadow-2xl text-white transition-all"
            style={{ top: `${18 + index * 23}%`, left: `${18 + index * 19}%` }}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6" />
              <div>
                <p className="font-mono text-sm">{shipment.trackingNumber}</p>
                <p className="text-emerald-400 text-xs">{shipment.status}</p>
                <p className="text-[10px] text-zinc-400">{shipment.origin} → {shipment.destination}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <div className="w-32 h-32 rounded-full border-4 border-emerald-400/30 flex items-center justify-center bg-emerald-500/10">
            <MapPin className="w-16 h-16 text-emerald-400 animate-pulse" />
          </div>
          <p className="text-emerald-400 text-xl font-bold mt-4">LIVE MAP</p>
          <p className="text-zinc-400 text-xs mt-1">KAFKA + WEBSOCKET • REAL-TIME</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 px-8 py-3 rounded-3xl text-xs flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          LAST UPDATED: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default LiveTracking;