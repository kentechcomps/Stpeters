import { useState } from 'react'
import reactLogo from './assets/logo.png'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import viteLogo from '/vite.svg'
import Topnavigationbar from './Navigationbar'
import Users from './Users.jsx'
import Teachers from './Teachers.jsx'
import Students from './Students.jsx'
import TeacherDashboard from './Teacherdashboard.jsx'
import TeacherGrades from './Grading.jsx'
import TeacherMaterials from './Teachermaterials.jsx'
import './App.css'
import { FaWhatsapp } from 'react-icons/fa'
import Footer from './footer.jsx'
import Admindashboardoverview from './Dashboardoverview.jsx'
import AdminDashboard from './Admindashboard.jsx'
import ManageStudents from './Managestudents.jsx'
import ManageUsers from './Manageusers.jsx'
import TeacherAnnouncements from './Announcement.jsx'
import Announcements from './Adminannouncement.jsx'
import TeacherParents from './Teacherparent.jsx'
import ClerkDashboard from './Clerksdashboard.jsx'
import ParentDashboard from './Parentsdashboard.jsx'
import ClerkPayments from './Feepayment.jsx'
import { AuthProvider } from "./Authcontext";
import ProtectedRoute from "./Protectedrole";
import Unauthorized from "./Unauthorized";
import ReportsDashboard from './Report.jsx'
import SettingsPage from './Settings.jsx'
import Programs from './Program.jsx'
import ContactUs from './Contactus.jsx'
import { Toaster } from "react-hot-toast"
import AdmissionWizard from './Admissions.jsx'
import SchoolFeeSection from './Feesection.jsx'
import AboutUs from './Aboutus.jsx'
import Clerkoptions from './Clerkoption.jsx'
import PrePrimary from './Prepimarypage.jsx'
import Primary from './Primary.jsx'
import JuniorSecondary from './Jss.jsx'
import SeniorSecondary from './Secondary.jsx'
import Pictorials from './Pictorials.jsx'
import Slide from './slidepic.jsx'
import ManageTeachers from './Manageteachers.jsx'
import AdminAdmissions from './Viewnewadmissions.jsx'

/* ---------------------------------------------------------
   InnerApp Component (useLocation MUST be inside BrowserRouter)
---------------------------------------------------------- */
function InnerApp() {
  const location = useLocation();

  const hideFooterRoutes = [
    "/dashboard",
    "/clerksdashboard",
    "/Teacherdashboard",
    "/parentsdashboard"
  ];

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <Topnavigationbar />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
          <Route path="admindashboardoverview" element={<Admindashboardoverview />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="ManageStudents" element={<ManageStudents />} />
          <Route path="feemanagement" element={<ClerkPayments />} />
          <Route path="notices" element={<Announcements />} />
          <Route path="reports" element={<ReportsDashboard />} />
          <Route path="admissions" element={<AdminAdmissions />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path='/managestudent' element={<ManageStudents />} />

        {/* Parent Dashboard */}
        <Route
          path='/parentsdashboard'
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route path='/Teacherdashboard' element={<TeacherDashboard />} />
        <Route path='/grade' element={<TeacherGrades />} />
        <Route path='/materials' element={<TeacherMaterials />} />
        <Route path='/announcement' element={<TeacherAnnouncements />} />
        <Route path='/teacherparent' element={<TeacherParents />} />

        {/* Clerk Routes */}
        <Route
          path='/clerksdashboard'
          element={
            <ProtectedRoute allowedRoles={["clerk"]}>
              <ClerkDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Clerkoptions />} />
          <Route path="users" element={<Users />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="admindashboardoverview" element={<Admindashboardoverview />} />
          <Route path="ManageTeachers" element={<ManageTeachers />} />
          <Route path="ManageStudents" element={<ManageStudents />} />
          <Route path="feemanagement" element={<ClerkPayments />} />
          <Route path="notices" element={<Announcements />} />
          <Route path="reports" element={<ReportsDashboard />} />
          <Route path='clerkoptions' element={<Clerkoptions />} />
        </Route>

        {/* Public Pages */}
        <Route path='/feemanagement' element={<ClerkPayments />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/admissions' element={<AdmissionWizard />} />
        <Route path='/feesection' element={<SchoolFeeSection />} />
        <Route path='/aboutus' element={<AboutUs />} />

        <Route path='/preprimary' element={<PrePrimary />} />
        <Route path='/primary' element={<Primary />} />
        <Route path='/junior-secondary' element={<JuniorSecondary />} />
        <Route path='/secondary' element={<SeniorSecondary />} />
        <Route path='/pictorials' element={<Pictorials />} />
        <Route path='/slide' element={<Slide />} />
      </Routes>

      {/* Footer (hidden on dash routes) */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}


/* ---------------------------------------------------------
   Main App Component (Outer wrapper ONLY)
---------------------------------------------------------- */
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </BrowserRouter>

      <a
        href="https://wa.me/27718602038"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp size={28} /> Talk to us
      </a>
    </>
  );
}

export default App
