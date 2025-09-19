
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Customer, MenuItem, Offer } from '../types';
import { REWARD_THRESHOLD } from '../constants';
import { seedCustomers, seedMenu, seedOffers } from '../services/seedData';

type PurchaseResult = {
    success: boolean;
    message: string;
    customer: Customer | null;
}

interface DataContextType {
  customers: Customer[];
  menu: MenuItem[];
  offers: Offer[];
  getCustomerById: (id: string) => Customer | undefined;
  addCustomer: (customerData: Omit<Customer, 'id' | 'accumulatedValue' | 'hasRewardPending' | 'role' | 'name'> & { name: string }) => Customer;
  addPurchase: (customerId: string, amount: number) => PurchaseResult;
  redeemReward: (customerId: string) => PurchaseResult;
  updateMenu: (menu: MenuItem[]) => void;
  updateOffers: (offers: Offer[]) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const storedCustomers = localStorage.getItem('the_point_customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      setCustomers(seedCustomers);
      localStorage.setItem('the_point_customers', JSON.stringify(seedCustomers));
    }

    const storedMenu = localStorage.getItem('the_point_menu');
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    } else {
      setMenu(seedMenu);
      localStorage.setItem('the_point_menu', JSON.stringify(seedMenu));
    }
    
    const storedOffers = localStorage.getItem('the_point_offers');
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers));
    } else {
      setOffers(seedOffers);
      localStorage.setItem('the_point_offers', JSON.stringify(seedOffers));
    }
  }, []);

  const updateCustomersStateAndStorage = (newCustomers: Customer[]) => {
      setCustomers(newCustomers);
      localStorage.setItem('the_point_customers', JSON.stringify(newCustomers));
  }

  const getCustomerById = (id: string) => customers.find(c => c.id === id);

  const addCustomer = (customerData: Omit<Customer, 'id' | 'accumulatedValue' | 'hasRewardPending'| 'role'>) => {
    const newCustomer: Customer = {
        ...customerData,
        id: `CUST-${Date.now()}`,
        role: 'customer',
        accumulatedValue: 0,
        hasRewardPending: false,
    };
    const updatedCustomers = [...customers, newCustomer];
    updateCustomersStateAndStorage(updatedCustomers);
    return newCustomer;
  };
  
  const addPurchase = (customerId: string, amount: number): PurchaseResult => {
    const newCustomers = [...customers];
    const customerIndex = newCustomers.findIndex(c => c.id === customerId);
    if (customerIndex === -1) return { success: false, message: 'Cliente no encontrado.', customer: null };

    const customer = newCustomers[customerIndex];
    customer.accumulatedValue += amount;
    
    let message = `Compra de $${amount} registrada. Nuevo acumulado: $${customer.accumulatedValue.toFixed(2)}.`;

    if (!customer.hasRewardPending && customer.accumulatedValue >= REWARD_THRESHOLD) {
        customer.hasRewardPending = true;
        message += ' ¡Felicidades! El cliente ha ganado un producto gratis para su próxima compra.';
    }
    
    updateCustomersStateAndStorage(newCustomers);
    return { success: true, message, customer };
  };

  const redeemReward = (customerId: string): PurchaseResult => {
    const newCustomers = [...customers];
    const customerIndex = newCustomers.findIndex(c => c.id === customerId);
    if (customerIndex === -1) return { success: false, message: 'Cliente no encontrado.', customer: null };

    const customer = newCustomers[customerIndex];
    if (!customer.hasRewardPending) return { success: false, message: 'El cliente no tiene una recompensa pendiente.', customer };

    customer.accumulatedValue -= REWARD_THRESHOLD;
    customer.hasRewardPending = false;
    
    updateCustomersStateAndStorage(newCustomers);
    return { success: true, message: 'Recompensa canjeada. El acumulado se ha actualizado.', customer };
  };

  const updateMenu = (newMenu: MenuItem[]) => {
      setMenu(newMenu);
      localStorage.setItem('the_point_menu', JSON.stringify(newMenu));
  }

  const updateOffers = (newOffers: Offer[]) => {
      setOffers(newOffers);
      localStorage.setItem('the_point_offers', JSON.stringify(newOffers));
  }

  return (
    <DataContext.Provider value={{ customers, menu, offers, getCustomerById, addCustomer, addPurchase, redeemReward, updateMenu, updateOffers }}>
      {children}
    </DataContext.Provider>
  );
};
