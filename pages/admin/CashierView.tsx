
import React, { useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { Customer } from '../../types';
import { REDEMPTION_MINIMUM_PURCHASE, REWARD_VALUE } from '../../constants';
import Modal from '../../components/Modal';

const CashierView: React.FC = () => {
    const [customerId, setCustomerId] = useState('');
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

    const { getCustomerById, addPurchase, redeemReward } = useData();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleFindCustomer = () => {
        setMessage(null);
        const customer = getCustomerById(customerId);
        if (customer) {
            setActiveCustomer(customer);
        } else {
            setMessage({ type: 'error', text: 'Cliente no encontrado. Verifique el código.' });
            setActiveCustomer(null);
        }
    };

    const handleProcessPurchase = () => {
        if (!activeCustomer) return;
        const amount = parseFloat(purchaseAmount);
        if (isNaN(amount) || amount <= 0) {
            setMessage({ type: 'error', text: 'Monto de compra inválido.' });
            return;
        }

        if (activeCustomer.hasRewardPending && amount >= REDEMPTION_MINIMUM_PURCHASE) {
            setIsRedeemModalOpen(true);
        } else {
            const result = addPurchase(activeCustomer.id, amount);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });
            if(result.customer) setActiveCustomer(result.customer);
        }
        setPurchaseAmount('');
    };
    
    const handleRedeem = (redeem: boolean) => {
        setIsRedeemModalOpen(false);
        if (!activeCustomer) return;
        
        if (redeem) {
            redeemReward(activeCustomer.id);
            setMessage({ type: 'success', text: `Recompensa de $${REWARD_VALUE} aplicada. El acumulado ha sido ajustado.` });
        }

        const amount = parseFloat(purchaseAmount);
        const result = addPurchase(activeCustomer.id, amount);

        // We combine the messages
        setMessage(prev => ({ 
            type: result.success ? 'success' : 'error', 
            text: `${prev?.text || ''} ${result.message}`.trim() 
        }));
        
        if(result.customer) setActiveCustomer(result.customer);

        setPurchaseAmount('');
    }

    const resetState = () => {
        setCustomerId('');
        setPurchaseAmount('');
        setActiveCustomer(null);
        setMessage(null);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-brand-red mb-4">Punto de Venta (Caja)</h2>

            {!activeCustomer ? (
                <div className="space-y-4">
                    <p className="text-gray-300">Ingrese o escanee el código QR del cliente para comenzar.</p>
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="customerId">Código de Cliente</label>
                        <input type="text" id="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)} className="w-full md:w-1/2 bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" />
                    </div>
                    <button onClick={handleFindCustomer} className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">Buscar Cliente</button>
                </div>
            ) : (
                <div>
                    <div className="bg-black bg-opacity-40 p-4 rounded-lg mb-4 border border-gray-700">
                        <div className="flex justify-between items-start">
                           <div>
                                <h3 className="text-xl font-bold">{activeCustomer.name}</h3>
                                <p className="text-sm text-gray-400">{activeCustomer.id}</p>
                                <p className="font-bold mt-2">Acumulado: <span className="text-brand-red">RD${activeCustomer.accumulatedValue.toFixed(2)}</span></p>
                           </div>
                           <button onClick={resetState} className="text-sm text-gray-400 hover:text-white">&times; Cambiar Cliente</button>
                        </div>
                         {activeCustomer.hasRewardPending && (
                            <div className="mt-2 text-center bg-green-500/20 border border-green-500 text-green-300 p-2 rounded-md text-sm">
                                <strong>¡Recompensa disponible!</strong>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-1" htmlFor="purchaseAmount">Monto de la Compra Actual</label>
                            <input type="number" id="purchaseAmount" value={purchaseAmount} onChange={e => setPurchaseAmount(e.target.value)} className="w-full md:w-1/2 bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" placeholder="Ej: 350.00" />
                        </div>
                        <button onClick={handleProcessPurchase} className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">Registrar Compra</button>
                    </div>
                </div>
            )}
            
            {message && (
                 <div className={`mt-4 p-3 rounded-md text-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {message.text}
                </div>
            )}
            
            <Modal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} title="Recompensa Disponible">
                <div className="text-center">
                    <p className="mb-6">El cliente tiene una recompensa disponible y la compra califica para canjearla. ¿Desea aplicar el producto gratis en esta compra?</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => handleRedeem(true)} className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-500 transition-colors">Sí, Canjear</button>
                        <button onClick={() => handleRedeem(false)} className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition-colors">No, Acumular</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CashierView;
