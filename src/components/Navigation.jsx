import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Navigation() {
  const { cart } = useContext(CartContext);
  const list = Array.isArray(cart) ? cart : [];
  const count = list.reduce((sum, line) => sum + (line.quantity ?? 1), 0);

  return (
    <header
      style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid #30363d",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <strong>Kitap Dünyası</strong>
      <span style={{ opacity: 0.9 }}>Sepet: {count} ürün</span>
    </header>
  );
}
