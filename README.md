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

📸 Screenshots-

<img width="1895" height="867" alt="saudilogx8" src="https://github.com/user-attachments/assets/8588a16a-d1b0-4ad2-9c80-3982514214ce" />
<img width="1912" height="865" alt="saudilogix7" src="https://github.com/user-attachments/assets/3ccda867-a134-4f19-bce6-4a0dd6bd2ddb" />
<img width="1903" height="866" alt="saudilogix6" src="https://github.com/user-attachments/assets/057ba4cf-85d5-46b4-8aa9-60e1d18050dc" />
<img width="1893" height="865" alt="saudilogix5" src="https://github.com/user-attachments/assets/50b76fb9-4795-49a4-84ac-e4eb5b60b3e2" />
<img width="1892" height="866" alt="saudilogix4" src="https://github.com/user-attachments/assets/27f3d9a1-562d-4f8f-a7e5-bc3710cf4cbf" />
<img width="1917" height="871" alt="saudilogix3" src="https://github.com/user-attachments/assets/5c2d0ca9-af34-4f44-8737-7dc96ec4b13b" />
<img width="1901" height="865" alt="saudilogix2" src="https://github.com/user-attachments/assets/455a0c1f-7ce5-4177-a841-d2a07eb1c7c8" />
<img width="1902" height="866" alt="saudilogix1" src="https://github.com/user-attachments/assets/75f51c82-535b-437a-aa3a-252582a499a3" />

👨‍💼 Author

Mohd Shahvez
Java Full Stack Developer
Open to opportunities in Saudi Arabia (KSA)
Email:mohdshahvez78600@gmail.com
Location: Uttar Pradesh, India (Ready to relocate to KSA)

Project Status: Production-ready core features complete. Ready for further enhancements (full JWT Auth, WebSocket, Docker deployment, Driver PWA).

Made with ❤️ for Saudi Vision 2030
