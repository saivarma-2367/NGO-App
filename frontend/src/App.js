import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DashBoard from './Pages/DashBoard';
import DonarDashBoard from './Pages/DonarDashBoard';
import VolunteerDashBoard from './Pages/VolunteerDashBoard';
import AdminPortal from './Pages/AdminPortal';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<DashBoard />}/>
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/donate" element={<DonarDashBoard />} />
        <Route path="/volunteer" element={<VolunteerDashBoard />} />
      </Routes>
    </Router>
   
  );
}

export default App;
