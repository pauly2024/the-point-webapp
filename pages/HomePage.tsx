import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="text-center">
            <div 
                className="relative bg-black bg-opacity-50 rounded-lg shadow-2xl overflow-hidden my-8 p-12 flex flex-col items-center justify-center"
                style={{ backgroundImage: "url('https://i.imgur.com/dK5uL3I.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <img src="https://i.imgur.com/8J2t6f7.png" alt="The Point Logo" className="w-full max-w-xs md:max-w-sm mb-2" />
                    <h1 className="text-5xl md:text-7xl font-display text-brand-red -mt-2 md:-mt-4">
                        Lounge
                    </h1>
                    <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto text-center">
                        Disfruta delicias en un ambiente único. Únete a nuestro programa de lealtad y obtén recompensas exclusivas.
                    </p>
                    <div className="mt-8 space-x-4">
                        <Link to="/menu" className="bg-brand-red text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-transform transform hover:scale-105">
                            Ver Menú
                        </Link>
                        <Link to="/login" className="bg-transparent border-2 border-brand-red text-brand-red font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-red hover:text-white transition-all">
                            Únete Ahora
                        </Link>
                    </div>
                </div>
            </div>
             <div className="mt-10 p-6 bg-black bg-opacity-30 rounded-lg">
                <h2 className="text-3xl font-bold text-brand-red mb-4">Nuestro Contacto</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg">
                    <div className="bg-brand-red p-4 rounded-lg font-bold">829-2020019</div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-red" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>Puerto Plata, Rep. Dom.</span>
                    </div>
                    <div className="bg-brand-red p-4 rounded-lg font-bold">PEDIDOS</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;