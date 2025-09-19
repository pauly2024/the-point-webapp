import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { User } from '../types';

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true); // Default to registration view
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  const { addCustomer } = useData();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for admin
      const adminUser: User = { id: 'admin-01', name: 'Admin', role: 'admin' };
      login(adminUser);
      navigate('/admin');
    } else {
      setError('Contraseña de administrador incorrecta.');
    }
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!phone && !email)) {
      setError('Por favor, ingrese su nombre y un teléfono o correo electrónico.');
      return;
    }
    const newCustomer = addCustomer({ name, phone, email });
    login(newCustomer);
    navigate('/profile');
  };


  return (
    <div className="max-w-md mx-auto mt-10 bg-black bg-opacity-40 p-8 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold text-center text-brand-red mb-6">
        {isRegister ? 'Registro de Cliente' : 'Acceso de Administrador'}
      </h1>
      
      {error && <p className="bg-red-500/30 text-red-300 p-3 rounded-md mb-4 text-center">{error}</p>}

      {isRegister ? (
        <form onSubmit={handleCustomerRegister} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="name">Nombre Completo</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required/>
          </div>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="phone">Teléfono (WhatsApp)</label>
            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
           <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" />
          </div>
          <button type="submit" className="w-full bg-brand-red text-white font-bold py-2 rounded-md hover:bg-red-700 transition-colors">Registrarme</button>
        </form>
      ) : (
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="password">Contraseña de Administrador</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
          </div>
          <button type="submit" className="w-full bg-gray-600 text-white font-bold py-2 rounded-md hover:bg-gray-500 transition-colors">Ingresar como Admin</button>
        </form>
      )}

      <div className="text-center mt-6">
        <button onClick={() => { setIsRegister(!isRegister); setError(''); }} className="text-brand-red hover:underline">
          {isRegister ? 'Acceso de Administrador' : 'Registrar Nuevo Cliente'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;