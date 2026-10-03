import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart() {
  const { cart } = useContext(CartContext);
  const list = Array.isArray(cart) ? cart : [];

  return (
    <aside
      style={{
        width: 320,
        maxWidth: "100%",
        borderLeft: "1px solid #30363d",
        padding: "1rem",
        background: "#161b22",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Sepet</h2>
      {list.length === 0 ? (
        <p style={{ opacity: 0.75 }}>Sepet boş.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {list.map((line) => (
            <ShoppingCartItem key={line.id} item={line} />
          ))}
        </ul>
      )}
    </aside>
  );
}
