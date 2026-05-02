import { Routes, Route, NavLink } from 'react-router-dom';
import { Search, Bell, Package, Truck, MapPin, FileText, Globe, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import './index.css';

// Pages
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import LiveTracking from './pages/LiveTracking';
import Invoices from './pages/Invoices';
import Tenders from './pages/Tenders';

const tenants = [
  { id: 1, name: "Al-Riyadh Trading", short: "ART" },
  { id: 2, name: "Saudi Freight Co.", short: "SFC" },
  { id: 3, name: "NEOM Logistics", short: "NEOM" }
];

function App() {
  const [language, setLanguage] = useState('en');
  const [currentTenant, setCurrentTenant] = useState(tenants[0]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "🇸🇦 Shipment SAU123456789 - Customs Cleared (Fasah)", time: "just now", read: false }
  ]);
  const [showPanel, setShowPanel] = useState(false);

  const isArabic = language === 'ar';

  // Real-time WhatsApp Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newMsg = {
        id: Date.now(),
        message: isArabic ? "✅ التسليم مؤكد: SAU112233445" : "✅ Delivery Confirmed: SAU112233445",
        time: "just now",
        read: false
      };
      setNotifications(prev => [newMsg, ...prev.slice(0, 4)]);
    }, 6000);
    return () => clearInterval(interval);
  }, [isArabic]);

  return (
    <div className={`min-h-screen bg-zinc-950 text-white flex ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Sidebar with Multi-Tenant */}
      <div className={`w-72 bg-zinc-900 border-zinc-800 p-6 flex flex-col fixed h-screen transition-all ${isArabic ? 'right-0 border-l' : 'left-0 border-r'}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-3xl">🇸🇦</div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              {isArabic ? 'سعودي لوجيكس' : 'SaudiLogix'}
            </h1>
            <p className="text-emerald-400 text-xs -mt-1">VISION 2030</p>
          </div>
        </div>

        {/* SaaS Tenant Selector */}
        <div className="mb-8 bg-zinc-800 rounded-3xl p-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 px-3">
            <Building2 size={14} />
            CURRENT TENANT
          </div>
          <select 
            value={currentTenant.id}
            onChange={(e) => setCurrentTenant(tenants.find(t => t.id === parseInt(e.target.value)))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl py-3 px-4 text-white focus:outline-none"
          >
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-5 py-4 rounded-3xl font-medium transition-all ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 text-zinc-300'}`}>
            {isArabic ? '📊 لوحة القيادة' : '📊 Dashboard'}
          </NavLink>
          <NavLink to="/shipments" className={({ isActive }) => `flex items-center gap-3 px-5 py-4 rounded-3xl font-medium transition-all ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 text-zinc-300'}`}>
            {isArabic ? '🚚 الشحنات' : '🚚 Shipments'}
          </NavLink>
          <NavLink to="/track" className={({ isActive }) => `flex items-center gap-3 px-5 py-4 rounded-3xl font-medium transition-all ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 text-zinc-300'}`}>
            {isArabic ? '📍 التتبع المباشر' : '📍 Live Tracking'}
          </NavLink>
          <NavLink to="/invoices" className={({ isActive }) => `flex items-center gap-3 px-5 py-4 rounded-3xl font-medium transition-all ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 text-zinc-300'}`}>
            {isArabic ? '📄 الفواتير' : '📄 Invoices'}
          </NavLink>
          <NavLink to="/tenders" className={({ isActive }) => `flex items-center gap-3 px-5 py-4 rounded-3xl font-medium transition-all ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 text-zinc-300'}`}>
            {isArabic ? '📋 المناقصات' : '📋 Etimad Tenders'}
          </NavLink>
        </nav>

        <div className="mt-auto pt-8 border-t border-zinc-700">
          <div className="flex items-center gap-3 px-4 py-3 rounded-3xl hover:bg-zinc-800 transition-all">
            <div className="w-9 h-9 bg-zinc-700 rounded-2xl flex items-center justify-center text-xl">👨‍💼</div>
            <div>
              <p className="font-medium">{isArabic ? 'محمد شاهفيز' : 'Mohd Shahvez'}</p>
              <p className="text-xs text-zinc-500">{currentTenant.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all ${isArabic ? 'mr-72' : 'ml-72'}`}>

        {/* Top Navbar */}
        <div className="h-16 bg-zinc-900 border-b border-zinc-800 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-4 text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder={isArabic ? "ابحث برقم التتبع..." : "Search tracking number..."} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500" 
            />
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-3xl text-sm font-medium">
              <Globe size={18} />
              {language === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
            </button>

            <button onClick={() => setShowPanel(!showPanel)} className="relative p-2 hover:bg-zinc-800 rounded-2xl transition-all">
              <Bell size={24} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-[10px] flex items-center justify-center rounded-full font-bold animate-pulse">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <p className="text-sm font-medium">{isArabic ? 'محمد شاهفيز' : 'Mohd Shahvez'}</p>
                <p className="text-xs text-emerald-400">{currentTenant.name}</p>
              </div>
              <div className="w-9 h-9 bg-zinc-700 rounded-2xl flex items-center justify-center text-xl">👨‍💼</div>
            </div>
          </div>
        </div>

        {/* WhatsApp Notification Panel */}
        {showPanel && (
          <div className={`absolute ${isArabic ? 'left-8' : 'right-8'} top-20 w-96 bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl z-50 max-h-[420px] overflow-hidden`}>
            <div className="p-4 border-b border-zinc-700 font-medium">WhatsApp Notifications</div>
            <div className="max-h-[340px] overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border-b border-zinc-700 hover:bg-zinc-800">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/track" element={<LiveTracking />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/tenders" element={<Tenders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;