import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Success from "./components/Success.jsx";
import Navigation from "./components/Navigation.jsx";
import Products from "./components/Products.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { CartContextProvider } from "./contexts/CartContext.jsx";

function ShopPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />
      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        <Products />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartContextProvider>
    </ProductContextProvider>
  );
}
