
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Customer } from '../types';
import { REWARD_THRESHOLD } from '../constants';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { getCustomerById } = useData();

    if (!user || user.role !== 'customer') {
        return <div className="text-center text-red-500">Error: No se encontró el perfil de cliente.</div>;
    }
    
    const customer = getCustomerById(user.id) as Customer;

    if (!customer) {
        return <div className="text-center text-red-500">Error: No se pudieron cargar los datos del cliente.</div>;
    }

    const progressPercentage = Math.min((customer.accumulatedValue / REWARD_THRESHOLD) * 100, 100);

    return (
        <div className="max-w-2xl mx-auto bg-black bg-opacity-40 p-8 rounded-xl shadow-lg border border-gray-800 text-white">
            <h1 className="text-3xl font-bold text-center text-brand-red mb-2">¡Hola, {customer.name}!</h1>
            <p className="text-center text-gray-400 mb-6">Muestra este código QR en caja para acumular puntos.</p>

            <div className="bg-white p-4 rounded-lg w-64 h-64 mx-auto mb-6 shadow-md flex items-center justify-center">
                <QRCodeSVG value={customer.id} size={240} fgColor="#1a1a1a" />
            </div>
            
            <div className="text-center mb-8">
                <p className="text-gray-300">Tu código de cliente:</p>
                <p className="font-mono bg-gray-800 px-2 py-1 rounded inline-block">{customer.id}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-red border-b border-gray-700 pb-2">Tu Progreso de Lealtad</h2>
                
                {customer.hasRewardPending ? (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg">¡Recompensa Disponible!</h3>
                        <p>Tienes un producto gratis esperando. Canjéalo en tu próxima compra de RD$500 o más.</p>
                    </div>
                ) : (
                     <div>
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-lg font-bold">Acumulado: RD${customer.accumulatedValue.toFixed(2)}</span>
                            <span className="text-sm text-gray-400">Meta: RD${REWARD_THRESHOLD.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div 
                                className="bg-brand-red h-4 rounded-full transition-all duration-500" 
                                style={{ width: `${progressPercentage}%` }}>
                            </div>
                        </div>
                         <p className="text-center text-sm text-gray-400 mt-2">
                           Te faltan RD${(REWARD_THRESHOLD - customer.accumulatedValue).toFixed(2)} para tu producto gratis.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
