import { useContext } from "react";
import Card from "../Components/Card";
import { ProductoContext } from "../Context/ProductoContext";
import { CarritoContext } from "../Context/CarritoContext";

const ComprasPage = () => {
  const { productos } = useContext(ProductoContext);

  const {
    agregarCompra,
    eliminarCompra,
  } = useContext(CarritoContext);

 const handleAgregar = (Compra) => {
    agregarCompra(Compra);
 }
 const handleQuitar = (id) => {
    eliminarCompra(id);
 } 
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <>
      <h1>Compras</h1>
      <hr />

      {productos.map((producto) => (
        <Card
          key={producto.id}
          imagen={producto.image}
          titulo={producto.title}
          descripcion={producto.description}
          precio={producto.price}
          handleAgregar={() => handleAgregar(producto)}
          handleQuitar={() => handleQuitar(producto.id)}

        ></Card>
      ))}
    </>
  );
};

export default ComprasPage;
