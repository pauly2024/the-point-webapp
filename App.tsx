
import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OffersPage from './pages/OffersPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './hooks/useAuth';

const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/login" />;
};

const CustomerRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'customer' ? children : <Navigate to="/login" />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <DataProvider>
            <HashRouter>
                <div className="min-h-screen flex flex-col font-sans text-brand-light">
                    <Header />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/offers" element={<OffersPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/profile" element={
                                <CustomerRoute>
                                    <ProfilePage />
                                </CustomerRoute>
                            } />
                             <Route path="/admin/*" element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            } />
                        </Routes>
                    </main>
                </div>
            </HashRouter>
        </DataProvider>
    </AuthProvider>
  );
};

export default App;
