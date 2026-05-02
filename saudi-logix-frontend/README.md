# 🇸🇦 SaudiLogix - Real-Time Supply Chain Visibility Platform

**Vision 2030 aligned AI-powered logistics SaaS platform** with Saudi Customs (Fasah), SABER compliance, and multi-tenant architecture.

Built as a complete full-stack project to demonstrate modern Java backend + React frontend skills for Saudi Arabia job market.

## ✨ Key Features

### Backend (Spring Boot 3.5 + Java 21)
- Full Shipment CRUD with Saudi-specific fields (Fasah, SABER, Risk Score, Carbon Footprint)
- Professional PDF Invoice Generation (iText7)
- Mock Etimad Government Tender integration
- Carbon Footprint Tracker
- Supplier Risk Score
- Multi-Tenant SaaS support (Tenant selector)
- Notification Service (WhatsApp style)
- Basic Security Setup (JWT ready)

### Frontend (React 18 + Vite + Tailwind CSS)
- Modern responsive sidebar navigation
- Executive Dashboard with KPI cards + Recharts
- Shipments page (real backend data)
- Live Tracking with real-time polling (Kafka/WebSocket simulation)
- Invoices page with **5 professional templates** + QR code + preview + download
- Multi-Tenant selector
- Full Arabic language support (RTL + translated text)
- Real-time WhatsApp notification banner + panel
- Etimad Tenders page

### Other Highlights
- Arabic + English toggle (full RTL support)
- Multi-Tenant SaaS ready
- Clean layered architecture (Entity → Repository → Service → Controller)
- Responsive & professional UI

## 🛠 Tech Stack

**Backend**
- Java 21 + Spring Boot 3.5
- Spring Data JPA + MySQL
- iText7 (PDF)
- JJWT (Security ready)
- Lombok-free clean code

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Lucide Icons
- Recharts
- Axios

## 🚀 How to Run

### Backend
```bash
cd saudi-logix-backend
mvn clean install
mvn spring-boot:run
Runs on http://localhost:8080
Frontend
Bashcd saudi-logix-frontend
npm install
npm run dev
Runs on http://localhost:5173
Note: Make sure MySQL is running and database is configured in application.properties.
📸 Screenshots
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix1.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix2.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix3.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix4.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix5.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix6.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogix7.png
c:\Users\Mohd Shahvez\Desktop\resumes\intershala -assign 2\saudilogx8.png

👨‍💼 Author
Mohd Shahvez
Java Full Stack Developer
Open to opportunities in Saudi Arabia (KSA)
Email: mohdshahvez78600@gmail.com

Location: Uttar Pradesh, India (Ready to relocate to KSA)

Project Status: Production-ready core features complete. Ready for further enhancements (full JWT Auth, WebSocket, Docker deployment, Driver PWA).

Made with ❤️ for Saudi Vision 2030