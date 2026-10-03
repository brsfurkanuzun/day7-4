import { createContext, useState } from "react";

export const ProductContext = createContext(null);

const initialProducts = [
  { id: "1", title: "Suç ve Ceza", author: "Dostoyevski", price: 120 },
  { id: "2", title: "1984", author: "George Orwell", price: 95 },
  { id: "3", title: "Simyacı", author: "Paulo Coelho", price: 85 },
];

export function ProductContextProvider({ children }) {
  const [products] = useState(initialProducts);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
