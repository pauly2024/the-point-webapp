
import React from 'react';
import { useData } from '../hooks/useData';
import { Offer } from '../types';

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => (
  <div className="bg-black bg-opacity-40 rounded-lg overflow-hidden shadow-lg border border-gray-800 transform transition-transform hover:-translate-y-2 flex flex-col">
    {offer.imageUrl && <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover" />}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-brand-red">{offer.title}</h3>
      <p className="text-gray-300 mt-2 flex-grow">{offer.description}</p>
      {offer.price && (
        <p className="text-2xl font-black text-white mt-4 self-end">
          Precio **${offer.price.toFixed(2)} pesos**
        </p>
      )}
    </div>
  </div>
);

const OffersPage: React.FC = () => {
    const { offers } = useData();
    return (
        <div>
            <h1 className="text-5xl font-display text-center text-brand-red mb-8">Combos Especiales</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {offers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
            </div>
        </div>
    );
};

export default OffersPage;
