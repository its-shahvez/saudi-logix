import { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import '../index.css';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const templates = [
    { id: 1, name: "Classic", color: "orange" },
    { id: 2, name: "Modern", color: "blue" },
    { id: 3, name: "Premium", color: "purple" },
    { id: 4, name: "Corporate", color: "slate" },
    { id: 5, name: "Vision 2030", color: "emerald" }
  ];

  useEffect(() => {
    axios.get('http://localhost:8080/api/shipments')
      .then(res => {
        setInvoices(res.data);
        if (res.data.length > 0) setSelectedInvoice(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const downloadInvoice = () => {
    if (!selectedInvoice) return;
    window.open(`http://localhost:8080/api/shipments/${selectedInvoice.trackingNumber}/invoice`, '_blank');
  };

  if (!selectedInvoice) return <p className="p-8 text-zinc-400">Loading...</p>;

  const renderPreview = () => {
    const commonData = {
      trackingNumber: selectedInvoice.trackingNumber,
      origin: selectedInvoice.origin,
      destination: selectedInvoice.destination,
      fasah: selectedInvoice.fasahStatus || 'CLEARED',
      saber: selectedInvoice.saberStatus || 'UNDER_REVIEW',
      amount: "12,450"
    };

    switch (selectedTemplate) {
      case 1: // Classic (Orange - jaise tu chahta tha)
        return (
          <div className="bg-white text-black p-8 rounded-3xl border-4 border-orange-500 min-h-[520px] relative">
            <h2 className="text-3xl font-bold text-orange-600 text-center">SAUDI LOGIX</h2>
            <p className="text-center text-orange-600 text-sm">Official Invoice • Vision 2030</p>
            <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
              <div><strong>Invoice No:</strong> INV-987654</div>
              <div><strong>Date:</strong> 29 Apr 2026</div>
              <div><strong>Tracking:</strong> {commonData.trackingNumber}</div>
              <div><strong>From:</strong> {commonData.origin}</div>
              <div><strong>To:</strong> {commonData.destination}</div>
              <div><strong>Fasah:</strong> <span className="text-orange-600">{commonData.fasah}</span></div>
            </div>
            <div className="text-4xl font-bold text-orange-600 mt-8 text-right">SAR {commonData.amount}</div>
            <div className="absolute bottom-12 right-12">
              <QRCodeSVG value={`Tracking: ${commonData.trackingNumber} | Amount: SAR ${commonData.amount}`} size={130} />
            </div>
          </div>
        );

      case 2: // Modern (Blue)
        return (
          <div className="bg-white text-black p-8 rounded-3xl border-4 border-blue-600 min-h-[520px] relative">
            <h2 className="text-3xl font-bold text-blue-600">SAUDI LOGIX</h2>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between"><span className="font-medium">Tracking No</span><span className="font-mono">{commonData.trackingNumber}</span></div>
              <div className="flex justify-between"><span className="font-medium">Route</span><span>{commonData.origin} → {commonData.destination}</span></div>
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-blue-600">SAR {commonData.amount}</span></div>
            </div>
            <div className="absolute bottom-12 right-12">
              <QRCodeSVG value={`Tracking: ${commonData.trackingNumber}`} size={130} />
            </div>
          </div>
        );

      case 3: // Premium (Purple)
        return (
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 text-white p-8 rounded-3xl min-h-[520px] relative">
            <h2 className="text-4xl font-bold">SAUDI LOGIX</h2>
            <p className="opacity-75">Premium Invoice</p>
            <div className="mt-12 text-xl">SAR {commonData.amount}</div>
            <div className="absolute bottom-12 right-12 bg-white p-2 rounded-xl">
              <QRCodeSVG value={`Invoice Amount: SAR ${commonData.amount}`} size={130} fgColor="#6b21a8" />
            </div>
          </div>
        );

      case 4: // Corporate (Slate)
        return (
          <div className="bg-white text-black p-8 rounded-3xl border-4 border-slate-700 min-h-[520px] relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold">SAUDI LOGIX</h2>
                <p className="text-slate-500">Corporate Invoice</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">SAR {commonData.amount}</div>
              </div>
            </div>
            <div className="mt-12 space-y-2">
              <p><strong>Tracking:</strong> {commonData.trackingNumber}</p>
              <p><strong>Fasah:</strong> {commonData.fasah}</p>
            </div>
            <div className="absolute bottom-12 right-12">
              <QRCodeSVG value={`Tracking: ${commonData.trackingNumber}`} size={120} />
            </div>
          </div>
        );

      case 5: // Vision 2030 (Green)
        return (
          <div className="bg-gradient-to-br from-emerald-700 to-teal-700 text-white p-8 rounded-3xl min-h-[520px] relative">
            <h2 className="text-4xl font-bold text-center">🇸🇦 SAUDI LOGIX</h2>
            <p className="text-center text-emerald-200">Vision 2030 • Sustainable Logistics</p>
            <div className="text-center mt-12 text-5xl font-bold">SAR {commonData.amount}</div>
            <div className="absolute bottom-12 right-12">
              <QRCodeSVG value={`SaudiLogix Invoice ${commonData.trackingNumber}`} size={140} fgColor="#10b981" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Invoices</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Invoice List */}
        <div className="col-span-5">
          <div className="bg-zinc-900 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700 text-xs text-zinc-400">
                  <th className="text-left p-6">Invoice</th>
                  <th className="text-left p-6">Tracking</th>
                  <th className="text-left p-6">Amount</th>
                  <th className="text-left p-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} onClick={() => setSelectedInvoice(inv)} className={`border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer ${selectedInvoice?.id === inv.id ? 'bg-zinc-800' : ''}`}>
                    <td className="p-6 font-medium">INV-{inv.id}</td>
                    <td className="p-6 font-mono">{inv.trackingNumber}</td>
                    <td className="p-6 font-semibold">SAR 12,450</td>
                    <td className="p-6"><span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-3xl text-xs">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Area */}
        <div className="col-span-7">
          <div className="flex gap-3 mb-6">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`px-6 py-3 rounded-3xl text-sm font-medium transition-all ${
                  selectedTemplate === t.id ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {renderPreview()}

          <button
            onClick={downloadInvoice}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-3xl text-white font-semibold flex items-center justify-center gap-2"
          >
            <Download size={24} />
            Download {templates.find(t => t.id === selectedTemplate).name} Template
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoices;