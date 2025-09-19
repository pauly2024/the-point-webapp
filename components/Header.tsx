import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-md text-sm font-bold transition-colors duration-300 ${isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

    return (
        <header className="bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-red/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src="https://i.imgur.com/8J2t6f7.png" alt="The Point Logo" className="h-12 object-contain" />
                        <span className="text-3xl font-display text-brand-red self-center">LOUNGE</span>
                    </NavLink>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
                        <NavLink to="/menu" className={navLinkClass}>Menú</NavLink>
                        <NavLink to="/offers" className={navLinkClass}>Combos</NavLink>
                        {user?.role === 'customer' && <NavLink to="/profile" className={navLinkClass}>Mi Perfil</NavLink>}
                        {user?.role === 'admin' && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
                        {!user ? (
                            <NavLink to="/login" className="bg-brand-red text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-colors duration-300">
                                Acceder
                            </NavLink>
                        ) : (
                            <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-500 transition-colors duration-300">
                                Salir
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;