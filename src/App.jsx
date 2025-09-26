import { useState } from 'react'
import reactLogo from './assets/logo.png'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
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
import { FaWhatsapp } from 'react-icons/fa'; // ✅ Import WhatsApp icon
import Footer from './footer.jsx';
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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <BrowserRouter>
       <AuthProvider>

     
      <Topnavigationbar/>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element= {<Login/>}/>
          <Route path='/dashboard' 
           element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          
          >
            <Route index element={<Users/>} />
            <Route path="users" element={<Users/>} />
            <Route path="teachers" element={<Teachers/>} />
            <Route path="students" element={<Students/>} />
            <Route path= "admindashboardoverview" element={<Admindashboardoverview/>} />
            <Route path= "ManageUsers" element={<ManageUsers/>} />
            <Route path= "ManageStudents" element={<ManageStudents/>} />
            <Route path='feemanagement' element={<ClerkPayments/>}/>
            <Route path='notices' element={<Announcements/>}/>
            <Route path="reports" element={<ReportsDashboard/>} />
            <Route path="settings" element={<SettingsPage/>} />
          </Route>
        
        <Route path='/managestudent' element= {<ManageStudents/>}/>
        <Route path='/parentsdashboard' 
        element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <ParentDashboard />
              </ProtectedRoute>
            }
        
        />
        <Route path='/Teacherdashboard' element= {<TeacherDashboard/>}/> 
        <Route path='/grade' element= {<TeacherGrades/>}/>
        <Route path='/materials' element={<TeacherMaterials/>}/>
        <Route path='/announcement' element={<TeacherAnnouncements/>}/>
        <Route path='teacherparent' element={<TeacherParents/>} />
        <Route path='/clerksdashboard' 
        element={
              <ProtectedRoute allowedRoles={["clerk"]}>
                <ClerkDashboard />
              </ProtectedRoute> }
        
        />
        <Route path='/feemanagement' element={<ClerkPayments/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
       
        </Routes>
         <Footer/>

           </AuthProvider>
        
      </BrowserRouter>
           <a
        href="https://wa.me/254700000000" // replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  )
}

export default App
