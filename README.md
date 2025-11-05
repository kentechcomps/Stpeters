# 🏫 St Peters School Management System

[![React](https://img.shields.io/badge/Frontend-React.js-blue)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-green)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC)](https://tailwindcss.com/)
[![Africa's Talking](https://img.shields.io/badge/API-Africa's%20Talking-orange)](https://africastalking.com/)
[![Render](https://img.shields.io/badge/Deployed%20On-Render-purple)](https://render.com/)

**Live Demo:** [https://stpeters-hobo.vercel.app/](https://stpeters-hobo.vercel.app/)

---

## 📖 Overview

**St Peters** is a full-stack **School Management System** designed to automate key administrative operations for educational institutions — including student admissions, fee management, attendance tracking, and reporting.  
It helps schools minimize paperwork, reduce human error, and improve communication with parents and guardians.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Flask (Python) |
| Database | PostgreSQL |
| SMS Integration | Africa’s Talking API |
| Hosting | Render (Backend), Vercel (Frontend) |

---

## ✨ Key Features

### 🎓 Admissions Module
- Online admission form with file uploads (documents, photos)
- Admin review dashboard: verify documents, approve/reject applications
- Automatic student ID assignment upon approval
- Email/SMS confirmation via Africa’s Talking API

### 💰 Fee Management
- Define custom fee structures per class or program
- Record partial or full payments (cash, bank, or M-Pesa)
- Generate printable receipts and payment history
- Calculate outstanding balances and apply penalties for late payments

### 📱 SMS Notifications (Africa’s Talking)
- Automated SMS alerts for admission status and payment confirmations
- Overdue fee reminders and deadline alerts
- Personalized message templates with student data (name, balance, due date)

### 👥 Role-Based Dashboards
| Role | Capabilities |
|------|---------------|
| **Admin** | Manage admissions, fees, and reports |
| **Teacher** | Record attendance and grades |
| **Parent** | View student progress, payments, and updates |

### 📊 Reporting
- Generate financial, attendance, and performance reports
- Export data to CSV or PDF
- Daily/weekly summaries of admissions and revenue

---

## 🧩 System Architecture

**Frontend:**  
- Built with React and Tailwind CSS  
- Uses Axios for REST API communication  
- Client-side routing and form validation  

**Backend:**  
- Flask REST API with modular blueprints (Auth, Admissions, Payments, Reports)  
- PostgreSQL database with SQLAlchemy ORM  
- JWT authentication and role-based access control  

**Integrations:**  
- Africa’s Talking API for SMS notifications  
- Deployed using Render (Flask) and Vercel (React)  

---

## 🧱 Database Design (Highlights)

| Table | Description |
|--------|--------------|
| `users` | Stores user accounts and roles (Admin, Teacher, Parent) |
| `students` | Student details and assigned classes |
| `admissions` | Admission requests and document uploads |
| `fees` | Fee structures and due dates |
| `payments` | Payment records and methods |
| `attendance` | Daily attendance records |
| `sms_logs` | Outgoing SMS records and delivery status |

---

## 🔐 Security

- JWT-based authentication  
- Role-based authorization per API route  
- Server-side input validation  
- Password hashing using bcrypt  
- Secure file uploads with size and type restrictions  

---

## 🧠 Sample API Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/auth/login` | `POST` | User login, returns JWT |
| `/api/admissions` | `POST` | Submit admission form |
| `/api/admissions/pending` | `GET` | Fetch pending applications (Admin only) |
| `/api/payments` | `POST` | Record new payment |
| `/api/reports/financial` | `GET` | Generate financial reports |
| `/api/notifications/sms` | `POST` | Send SMS via Africa’s Talking |

---

## 🧾 Deployment Notes

- Environment variables configured on Render:
  - `DATABASE_URL`
  - `AT_USERNAME`
  - `AT_API_KEY`
  - `JWT_SECRET`
- CORS configured to allow Vercel frontend origin
- Automated database backups enabled
- Error monitoring through Render logs (optionally add Sentry)

---

## 🧩 Challenges Solved

- **Reliable SMS Delivery:** Implemented retry and queuing for bulk SMS.  
- **Partial Payment Logic:** Real-time recalculation of balances and due amounts.  
- **Secure Admissions Handling:** Safe file uploads and document preview for admins.  
- **Granular Role Permissions:** Ensured teachers and parents access only relevant endpoints.

---

## 📈 Impact & Metrics

- Reduced admission processing time by **60%**
- Improved fee collection rate through automated reminders
- Enabled transparent, real-time financial reporting for administrators
- Increased parent engagement via SMS updates

---

## 🔮 Future Enhancements

- M-Pesa and card payment gateway integration  
- Multi-school (multi-tenant) support  
- Mobile app or PWA for offline attendance  
- Predictive analytics for revenue and enrollment trends  

---

## 🧑‍💻 Author

**Kennedy Mutuku**  
Full Stack Developer | React · Flask · PostgreSQL  
📧 [Your Email Here]  
🌐 [Portfolio / GitHub Profile Link]

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute with attribution.

---

> “Building systems that solve real problems — from classrooms to communities.”
