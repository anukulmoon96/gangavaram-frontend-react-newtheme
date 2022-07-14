import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import LoginPage from './pages/LoginPage';
import Users from './pages/Users';
import Alerts from './pages/Alerts';
import Sites from './pages/Sites';
import CameraFeeds from './pages/CameraFeeds';
import Security from './pages/Security';
import Support from './pages/Support';
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
        <Route exact path="/aggregate" element={<ProtectedRoute><Sites /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
