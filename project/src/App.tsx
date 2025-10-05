import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ResourceHub from './pages/ResourceHub';
import SupportGroups from './pages/SupportGroups';
import SelfCare from './pages/SelfCare';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import Feedback from './pages/Feedback';
import AdminPanel from './pages/AdminPanel';
import MedicalRecords from './pages/MedicalRecords';
import EmergencyPlan from './pages/EmergencyPlan';
import CareSchedule from './pages/CareSchedule';
import FinancialResources from './pages/FinancialResources';
import CommunityForum from './pages/CommunityForum';
import Training from './pages/Training';
import Profile from './pages/Profile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <ResourceHub />
                </ProtectedRoute>
              } />
              <Route path="/support" element={
                <ProtectedRoute>
                  <SupportGroups />
                </ProtectedRoute>
              } />
              <Route path="/self-care" element={
                <ProtectedRoute>
                  <SelfCare />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/medical-records" element={
                <ProtectedRoute>
                  <MedicalRecords />
                </ProtectedRoute>
              } />
              <Route path="/emergency-plan" element={
                <ProtectedRoute>
                  <EmergencyPlan />
                </ProtectedRoute>
              } />
              <Route path="/care-schedule" element={
                <ProtectedRoute>
                  <CareSchedule />
                </ProtectedRoute>
              } />
              <Route path="/financial-resources" element={
                <ProtectedRoute>
                  <FinancialResources />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityForum />
                </ProtectedRoute>
              } />
              <Route path="/training" element={
                <ProtectedRoute>
                  <Training />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;