import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

interface CartItem {
  id: string;
  productName: string;
  productDetails: any;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        loadCartFromDatabase(user.id);
      } else {
        loadCartFromLocalStorage();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        // User logged in - migrate local cart to database
        migrateLocalCartToDatabase(newUser.id);
      } else {
        // User logged out - clear cart
        setItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadCartFromDatabase = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const cartItems: CartItem[] = (data || []).map(item => ({
        id: item.id,
        productName: item.product_name,
        productDetails: item.product_details,
        quantity: item.quantity,
        price: parseFloat(item.price.toString())
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart from database:', error);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('truetone_cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };

  const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('truetone_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const migrateLocalCartToDatabase = async (userId: string) => {
    try {
      const savedCart = localStorage.getItem('truetone_cart');
      if (savedCart) {
        const localItems: CartItem[] = JSON.parse(savedCart);
        
        for (const item of localItems) {
          await supabase
            .from('cart_items')
            .insert({
              user_id: userId,
              product_name: item.productName,
              product_details: item.productDetails,
              quantity: item.quantity,
              price: item.price
            });
        }
        
        // Clear local storage after migration
        localStorage.removeItem('truetone_cart');
        
        // Reload cart from database
        loadCartFromDatabase(userId);
      }
    } catch (error) {
      console.error('Error migrating cart to database:', error);
    }
  };

  const addItem = async (newItem: Omit<CartItem, 'id'>) => {
    const tempId = Math.random().toString(36).substring(7);
    const itemWithId = { ...newItem, id: tempId };

    if (user) {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_name: newItem.productName,
            product_details: newItem.productDetails,
            quantity: newItem.quantity,
            price: newItem.price
          })
          .select()
          .single();

        if (error) throw error;

        const dbItem: CartItem = {
          id: data.id,
          productName: data.product_name,
          productDetails: data.product_details,
          quantity: data.quantity,
          price: parseFloat(data.price.toString())
        };

        setItems(prev => [...prev, dbItem]);
        toast.success('Item added to cart!');
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error('Failed to add item to cart');
      }
    } else {
      // Guest user - save to localStorage
      const updatedItems = [...items, itemWithId];
      setItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      toast.success('Item added to cart!');
    }
  };

  const removeItem = async (id: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setItems(prev => prev.filter(item => item.id !== id));
        toast.success('Item removed from cart');
      } catch (error) {
        console.error('Error removing item from cart:', error);
        toast.error('Failed to remove item from cart');
      }
    } else {
      // Guest user
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      toast.success('Item removed from cart');
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', id);

        if (error) throw error;

        setItems(prev =>
          prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        console.error('Error updating item quantity:', error);
        toast.error('Failed to update item quantity');
      }
    } else {
      // Guest user
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;

        setItems([]);
        toast.success('Cart cleared');
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart');
      }
    } else {
      // Guest user
      setItems([]);
      localStorage.removeItem('truetone_cart');
      toast.success('Cart cleared');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};