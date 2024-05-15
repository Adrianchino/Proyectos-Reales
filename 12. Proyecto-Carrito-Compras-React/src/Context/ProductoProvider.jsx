import React, { useEffect, useState } from "react";
import { ProductoContext } from "./ProductoContext";

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductoContext.Provider value={{productos}}>
      {children}
    </ProductoContext.Provider>
  );
};

export default ProductoProvider;
