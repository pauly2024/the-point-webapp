import { Customer, MenuItem, Offer } from '../types';

export const seedCustomers: Customer[] = [
    {
        id: 'CUST-1678886400000',
        name: 'Juan Perez',
        email: 'juan.perez@example.com',
        role: 'customer',
        accumulatedValue: 1250.50,
        hasRewardPending: false,
    },
    {
        id: 'CUST-1678886400001',
        name: 'Maria Rodriguez',
        phone: '829-555-1234',
        role: 'customer',
        accumulatedValue: 5100.00,
        hasRewardPending: true,
    }
];

export const seedMenu: MenuItem[] = [
    { id: 'menu-1', category: 'RIKISKEBAB', name: 'Rikiskebab', price: 100.00, imageUrl: 'https://i.imgur.com/t7Bv4pX.jpeg' },
    { id: 'menu-2', category: 'POSTRES EN VASITOS', name: 'Tres leches', price: 75.00, imageUrl: 'https://i.imgur.com/sWVLp3A.jpeg' },
    { id: 'menu-3', category: 'POSTRES EN VASITOS', name: 'Cheesecake oreo', price: 75.00 },
    { id: 'menu-4', category: 'POSTRES EN VASITOS', name: 'Cheesecake dulce de leche', price: 75.00 },
    { id: 'menu-5', category: 'POSTRES EN VASITOS', name: 'Cheesecake de mango', price: 75.00 },
    { id: 'menu-6', category: 'POSTRES EN VASITOS', name: 'Cheesecake de fresa', price: 75.00 },
    { id: 'menu-7', category: 'CAFÉ COMESTIBLE', name: 'Café Comestible', price: 35.00, imageUrl: 'https://i.imgur.com/5gXkL0j.jpeg' },
    { id: 'menu-8', category: 'PANNINI GELATI', name: 'Pannini Gelati', price: 75.00, imageUrl: 'https://i.imgur.com/F3K1gVI.jpeg' },
    { id: 'menu-9', category: 'EMPANADAS', name: 'Jamón y queso', price: 60.00, imageUrl: 'https://i.imgur.com/9vJ9X3F.jpeg' },
    { id: 'menu-10', category: 'EMPANADAS', name: 'Pollo', price: 60.00 },
    { id: 'menu-11', category: 'EMPANADAS', name: 'Pollo con queso', price: 60.00 },
    { id: 'menu-12', category: 'EMPANADAS', name: 'Vegetales con queso', price: 60.00 },
    { id: 'menu-13', category: 'EMPANADAS', name: 'Camarones', price: 90.00 },
    { id: 'menu-14', category: 'JUGOS', name: 'Sandia', price: 50.00, imageUrl: 'https://i.imgur.com/J2b5b3f.jpeg' },
    { id: 'menu-15', category: 'JUGOS', name: 'MorirSoñando', price: 50.00 },
    { id: 'menu-16', category: 'JUGOS', name: 'Mango', price: 50.00 },
    { id: 'menu-17', category: 'JUGOS', name: 'Friut Punch', price: 50.00 },
    { id: 'menu-18', category: 'JUGOS', name: 'Pera Piña', price: 50.00 },
];

export const seedOffers: Offer[] = [
    { 
        id: 'offer-1', 
        title: 'COMBO FAMILIAR', 
        description: '4 Empanadas, 4 Vasos de Jugo, 4 Postres en Vasitos, 2 Rikiskebabs, 2 Cafés en Vaso Comestible',
        price: 790,
        imageUrl: 'https://i.imgur.com/O613uA1.jpeg',
    },
    { 
        id: 'offer-2', 
        title: 'COMBO DÚO', 
        description: '2 Empanadas, 2 Vasos de Jugo, 2 Postres en Vasitos, 2 Cafés en Vaso Comestible',
        price: 375,
    },
    { 
        id: 'offer-3', 
        title: 'COMBO SALUDABLE', 
        description: '1 Rikiskebab, 1 Jugo, 1 Postre en Vasito, 1 Café en Vaso Comestible',
        price: 180,
    },
    { 
        id: 'offer-4', 
        title: 'COMBO MERIENDA', 
        description: '3 Empanadas, 1 Vaso de Jugo, 1 Postre en Vaso, 1 Café en Vaso Comestible',
        price: 295,
    },
];