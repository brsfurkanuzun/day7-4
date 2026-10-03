import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

export default function Products() {
  const { products } = useContext(ProductContext);
  const { addItem } = useContext(CartContext);

  return (
    <section style={{ flex: 1, padding: "1rem" }}>
      <h2 style={{ marginTop: 0 }}>Kitaplar</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {(products ?? []).map((p) => (
          <li
            key={p.id}
            style={{
              padding: "0.75rem 0",
              borderBottom: "1px solid #21262d",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                {p.author} — {p.price} ₺
              </div>
            </div>
            <button
              type="button"
              onClick={() => addItem(p)}
              style={{
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
                borderRadius: 6,
                border: "1px solid #388bfd",
                background: "#1f6feb22",
                color: "#e6edf3",
              }}
            >
              Sepete ekle
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
