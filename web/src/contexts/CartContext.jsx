import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('biblioteca-secrata-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('biblioteca-secrata-cart', JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.bookId === item.bookId && i.type === item.type
      );
      if (existing) {
        return prev.map((i) =>
          i.bookId === item.bookId && i.type === item.type
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(bookId, type) {
    setItems((prev) => prev.filter((i) => !(i.bookId === bookId && i.type === type)));
  }

  function updateItem(bookId, type, updates) {
    setItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId && i.type === type ? { ...i, ...updates } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => {
    const price = item.type === 'rent' ? item.price * (item.days || 7) : item.price;
    return sum + price * (item.quantity || 1);
  }, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
