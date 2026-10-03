import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, setCart] = useLocalStorage("s11d1", []);

  const addItem = useCallback(
    (item) => {
      const list = Array.isArray(cart) ? cart : [];
      const idx = list.findIndex((line) => line.id === item.id);
      let next;
      if (idx === -1) {
        next = [...list, { ...item, quantity: 1 }];
      } else {
        next = list.map((line, i) =>
          i === idx ? { ...line, quantity: (line.quantity ?? 1) + 1 } : line
        );
      }
      setCart(next);
    },
    [cart, setCart]
  );

  const removeItem = useCallback(
    (id) => {
      const list = Array.isArray(cart) ? cart : [];
      setCart(list.filter((line) => line.id !== id));
    },
    [cart, setCart]
  );

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
