import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function ShoppingCartItem({ item }) {
  const { removeItem } = useContext(CartContext);
  const qty = item.quantity ?? 1;

  return (
    <li
      style={{
        padding: "0.6rem 0",
        borderBottom: "1px solid #21262d",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      <div>
        <div style={{ fontWeight: 500 }}>{item.title}</div>
        <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          {qty} × {item.price} ₺
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        style={{
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
          borderRadius: 4,
          border: "1px solid #f85149",
          background: "transparent",
          color: "#f85149",
        }}
      >
        Kaldır
      </button>
    </li>
  );
}
