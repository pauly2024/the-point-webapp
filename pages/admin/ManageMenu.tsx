
import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { MenuItem } from '../../types';
import Modal from '../../components/Modal';

const ManageMenu: React.FC = () => {
  const { menu, updateMenu } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<MenuItem> | null>(null);

  const openModal = (item: Partial<MenuItem> | null = null) => {
    setCurrentItem(item || { name: '', category: '', price: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = () => {
    if (!currentItem) return;
    
    let updatedMenu;
    if (currentItem.id) {
        // Edit
        updatedMenu = menu.map(item => item.id === currentItem.id ? { ...item, ...currentItem } as MenuItem : item);
    } else {
        // Add
        const newItem: MenuItem = {
            id: `menu-${Date.now()}`,
            name: currentItem.name || 'Sin Nombre',
            category: currentItem.category || 'General',
            price: currentItem.price || 0,
            imageUrl: currentItem.imageUrl,
        };
        updatedMenu = [...menu, newItem];
    }
    updateMenu(updatedMenu);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if(window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
        updateMenu(menu.filter(item => item.id !== id));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCurrentItem(prev => prev ? ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }) : null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-brand-red">Gestionar Menú</h2>
        <button onClick={() => openModal()} className="bg-brand-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
          Añadir Artículo
        </button>
      </div>
      <div className="bg-black bg-opacity-40 rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Nombre</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">RD${item.price.toFixed(2)}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => openModal(item)} className="text-blue-400 hover:underline text-sm">Editar</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:underline text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentItem?.id ? 'Editar Artículo' : 'Añadir Artículo'}>
        <div className="space-y-4">
          <input type="text" name="name" value={currentItem?.name || ''} onChange={handleChange} placeholder="Nombre del artículo" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <input type="text" name="category" value={currentItem?.category || ''} onChange={handleChange} placeholder="Categoría" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <input type="number" name="price" value={currentItem?.price || ''} onChange={handleChange} placeholder="Precio" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <input type="text" name="imageUrl" value={currentItem?.imageUrl || ''} onChange={handleChange} placeholder="URL de la Imagen (Opcional)" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white" />
          <div className="flex justify-end gap-4">
            <button onClick={closeModal} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md">Cancelar</button>
            <button onClick={handleSave} className="bg-brand-red text-white font-bold py-2 px-4 rounded-md">Guardar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageMenu;
