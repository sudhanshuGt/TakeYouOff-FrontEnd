import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './components/Jobs'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Login from './components/auth/Login'
import Singup from './components/auth/Singup'
import Profile from './components/Profile'
import PostJob from './components/PostedJobs'
import Companies from './components/Companies'
import CompanySetup from './components/CompanySetup'
import CompanyCreate from './components/CompanyCreate'
import Browse from './components/Browse'
import CreateJobs from './components/admin/CreateJobs'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Applicants from './components/admin/Applicants'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQVQJ8OpcVx36QVu_oP5tUt8UHYdiZnJc",
  authDomain: "inscribe-d9e3b.firebaseapp.com",
  projectId: "inscribe-d9e3b",
  storageBucket: "inscribe-d9e3b.appspot.com",
  messagingSenderId: "1051026563088",
  appId: "1:1051026563088:web:5c71666886cf14058eaa95",
  measurementId: "G-QBMSG5H51V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Singup />
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  // Admin Dashboard Route Started
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><CreateJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
])





function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
