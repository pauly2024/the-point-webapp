
import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { Offer } from '../../types';
import Modal from '../../components/Modal';

const ManageOffers: React.FC = () => {
  const { offers, updateOffers } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Partial<Offer> | null>(null);

  const openModal = (offer: Partial<Offer> | null = null) => {
    setCurrentOffer(offer || { title: '', description: '', price: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOffer(null);
  };

  const handleSave = () => {
    if (!currentOffer) return;
    
    let updatedOffers;
    if (currentOffer.id) {
        // Edit
        updatedOffers = offers.map(offer => offer.id === currentOffer.id ? { ...offer, ...currentOffer } as Offer : offer);
    } else {
        // Add
        const newOffer: Offer = {
            id: `offer-${Date.now()}`,
            title: currentOffer.title || 'Sin Título',
            description: currentOffer.description || '',
            price: currentOffer.price,
            imageUrl: currentOffer.imageUrl,
        };
        updatedOffers = [...offers, newOffer];
    }
    updateOffers(updatedOffers);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if(window.confirm('¿Estás seguro de que quieres eliminar este combo?')) {
        updateOffers(offers.filter(offer => offer.id !== id));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCurrentOffer(prev => prev ? ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }) : null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-brand-red">Gestionar Combos</h2>
        <button onClick={() => openModal()} className="bg-brand-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
          Añadir Combo
        </button>
      </div>
      <div className="space-y-4">
        {offers.map(offer => (
          <div key={offer.id} className="bg-black bg-opacity-40 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{offer.title}</h3>
              <p className="text-sm text-gray-400 max-w-lg">{offer.description}</p>
            </div>
            <div className="flex items-center gap-4">
                {offer.price && <span className="font-bold text-brand-red">RD${offer.price.toFixed(2)}</span>}
                <div className="space-x-2">
                    <button onClick={() => openModal(offer)} className="text-blue-400 hover:underline text-sm">Editar</button>
                    <button onClick={() => handleDelete(offer.id)} className="text-red-400 hover:underline text-sm">Eliminar</button>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentOffer?.id ? 'Editar Combo' : 'Añadir Combo'}>
        <div className="space-y-4">
          <input type="text" name="title" value={currentOffer?.title || ''} onChange={handleChange} placeholder="Título del combo" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <textarea name="description" value={currentOffer?.description || ''} onChange={handleChange} placeholder="Descripción" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white h-24" />
          <input type="number" name="price" value={currentOffer?.price || ''} onChange={handleChange} placeholder="Precio (Opcional)" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <input type="text" name="imageUrl" value={currentOffer?.imageUrl || ''} onChange={handleChange} placeholder="URL de la Imagen (Opcional)" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <div className="flex justify-end gap-4">
            <button onClick={closeModal} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md">Cancelar</button>
            <button onClick={handleSave} className="bg-brand-red text-white font-bold py-2 px-4 rounded-md">Guardar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageOffers;
