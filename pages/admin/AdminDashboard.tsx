
import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import CashierView from './CashierView';
import ManageMenu from './ManageMenu';
import ManageOffers from './ManageOffers';

const AdminDashboard: React.FC = () => {
    
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-md text-sm font-bold transition-colors duration-300 ${isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;
    
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-1/4 lg:w-1/5 bg-black bg-opacity-20 p-4 rounded-lg self-start">
                <h2 className="text-xl font-bold text-brand-red mb-4">Panel de Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/admin" end className={navLinkClass}>Caja</NavLink>
                    <NavLink to="/admin/menu" className={navLinkClass}>Gestionar Menú</NavLink>
                    <NavLink to="/admin/offers" className={navLinkClass}>Gestionar Combos</NavLink>
                </nav>
            </aside>
            <div className="flex-grow bg-black bg-opacity-20 p-6 rounded-lg">
                <Routes>
                    <Route path="/" element={<CashierView />} />
                    <Route path="/menu" element={<ManageMenu />} />
                    <Route path="/offers" element={<ManageOffers />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
