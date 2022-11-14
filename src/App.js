import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard.js';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HospitalLogin from './components/HospitalLogin';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';

function App() {
  return (
    <>
   
   <Router>
    {/* <Header/> */}
     <Routes>
      <Route exact path="/" element={<Dashboard/>}/>
         
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/adminlogin" element={<AdminLogin/>} />
      <Route exact path="/userlogin" element={<UserLogin/>} />
      <Route exact path="/hospitallogin" element={<HospitalLogin/>} />
      <Route exact path="/admindashboard" element={<AdminDashboard/>} />
      <Route exact path="/usersignup" element={<UserSignup/>} />
	    </Routes>
     </Router>
       
    </>
     
    
    
  );
}

export default App;
