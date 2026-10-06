import { useState } from "react";
import { Alert, View } from "react-native";

import MovementForm from "../components/MovementForm";
import MovementList from "../components/MovementList";
import { Movimiento, useMoney } from "../context/MoneyContext";

export default function Movimientos() {
  const { movimientos, saldo, eliminarMovimiento, editarMovimiento } =
    useMoney();

  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [error, setError] = useState("");
  const [movimientoEditando, setMovimientoEditando] =
    useState<Movimiento | null>(null);

  const iniciarEdicion = (movimiento: Movimiento) => {
    setMovimientoEditando(movimiento);
    setMonto(movimiento.monto.toString());
    setConcepto(movimiento.concepto);
    setError("");
  };

  const cancelarEdicion = () => {
    setMovimientoEditando(null);
    setMonto("");
    setConcepto("");
    setError("");
  };

  const guardarEdicion = () => {
    const cantidad = Number(monto);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    if (!movimientoEditando) return;

    if (movimientoEditando.tipo === "salida") {
      const saldoSinMovimiento = saldo + movimientoEditando.monto;

      if (cantidad > saldoSinMovimiento) {
        setError("No cuentas con saldo suficiente");
        return;
      }
    }

    editarMovimiento(movimientoEditando.id, cantidad, concepto);

    cancelarEdicion();
  };

  const confirmarEliminar = (id: string) => {
    Alert.alert(
      "Eliminar movimiento",
      "¿Estás seguro de que quieres eliminar este movimiento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarMovimiento(id),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 15 }}>
      {movimientoEditando && (
        <MovementForm
          monto={monto}
          setMonto={setMonto}
          concepto={concepto}
          setConcepto={setConcepto}
          error={error}
          onAgregar={() => {}}
          onRetirar={() => {}}
          editando={true}
          onGuardarEdicion={guardarEdicion}
          onCancelarEdicion={cancelarEdicion}
        />
      )}

      <MovementList
        movimientos={movimientos}
        eliminarMovimiento={confirmarEliminar}
        iniciarEdicion={iniciarEdicion}
      />
    </View>
  );
}
