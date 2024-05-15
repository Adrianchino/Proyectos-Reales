import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import CarritoPage from "./Pages/CarritoPage";
import ComprasPage from "./Pages/ComprasPage";
import ProductoProvider from "./Context/ProductoProvider";
import CarritoProvider from "./Context/CarritoProvider";

const CarritoApp = () => {
  return (
    <ProductoProvider>
      <CarritoProvider>
        <NavBar></NavBar>
        <div className="container">
          <Routes>
            <Route path="/" element={<ComprasPage></ComprasPage>}></Route>
            <Route
              path="/carrito"
              element={<CarritoPage></CarritoPage>}
            ></Route>
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
        </div>
      </CarritoProvider>
    </ProductoProvider>
  );
};

export default CarritoApp;
