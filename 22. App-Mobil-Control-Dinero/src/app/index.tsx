import { useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { useMoney } from "../context/MoneyContext";

import MovementForm from "../components/MovementForm";
import Summary from "../components/Summary";

import { styles } from "../styles/index.styles";

export default function Index() {
  const { saldo, totalEntradas, totalSalidas, agregarMovimiento } = useMoney();

  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [error, setError] = useState("");

  const agregarDinero = () => {
    const cantidad = Number(monto);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    agregarMovimiento("entrada", cantidad, concepto);

    setMonto("");
    setConcepto("");
    setError("");
  };

  const retirarDinero = () => {
    const cantidad = Number(monto);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    if (cantidad > saldo) {
      setError("No cuentas con saldo suficiente");
      return;
    }
    agregarMovimiento("salida", cantidad, concepto);

    setMonto("");
    setConcepto("");
    setError("");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.content} onPress={Keyboard.dismiss}>
        <Text style={styles.title}>CAJA FUERTE</Text>

        <Summary
          saldo={saldo}
          totalEntradas={totalEntradas}
          totalSalidas={totalSalidas}
        />

        <MovementForm
          monto={monto}
          setMonto={setMonto}
          concepto={concepto}
          setConcepto={setConcepto}
          error={error}
          onAgregar={agregarDinero}
          onRetirar={retirarDinero}
          editando={false}
          onGuardarEdicion={() => {}}
          onCancelarEdicion={() => {}}
        />
      </Pressable>
    </View>
  );
}
