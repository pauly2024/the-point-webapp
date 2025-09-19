
import React from 'react';
import { useData } from '../hooks/useData';
import { MenuItem } from '../types';

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => (
    <div className="bg-black bg-opacity-40 rounded-lg p-4 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-brand-red/20">
        <div>
            <h3 className="font-bold text-lg text-white">{item.name}</h3>
            {item.description && <p className="text-sm text-gray-400">{item.description}</p>}
        </div>
        <p className="font-bold text-brand-red text-lg whitespace-nowrap">RD ${item.price.toFixed(2)}</p>
    </div>
);

const MenuPage: React.FC = () => {
    const { menu } = useData();

    const groupedMenu = menu.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
            acc[category] = { items: [], imageUrl: item.imageUrl };
        }
        acc[category].items.push(item);
        if (item.imageUrl && !acc[category].imageUrl) {
          acc[category].imageUrl = item.imageUrl;
        }
        return acc;
    }, {} as Record<string, { items: MenuItem[], imageUrl?: string }>);

    return (
        <div>
            <h1 className="text-5xl font-display text-center text-brand-red mb-8">Nuestro Menú</h1>
            <div className="space-y-12">
                {Object.entries(groupedMenu).map(([category, {items, imageUrl}]) => (
                    <div key={category} className="bg-black bg-opacity-20 p-6 rounded-xl shadow-lg border border-gray-800">
                        <div className="flex flex-col md:flex-row gap-8">
                            {imageUrl && (
                                <div className="md:w-1/3 flex-shrink-0">
                                    <img src={imageUrl} alt={category} className="w-full h-48 object-cover rounded-lg shadow-md" />
                                </div>
                            )}
                            <div className="flex-grow">
                                <h2 className="text-3xl font-bold text-brand-red border-b-2 border-brand-red pb-2 mb-6">{category}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {items.map(item => <MenuItemCard key={item.id} item={item} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
