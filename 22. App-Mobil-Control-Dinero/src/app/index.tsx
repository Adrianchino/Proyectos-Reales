import { useState } from "react";
import { Alert, Keyboard, Pressable, Text, View } from "react-native";
import { useMoney } from "../context/MoneyContext";

import MovementForm from "../components/MovementForm";
import Summary from "../components/Summary";

import {
  exportarRespaldo,
  importarRespaldo,
} from "../services/respaldo.service";
import { styles } from "../styles/index.styles";

export default function Index() {
  const {
    movimientos,
    saldo,
    totalEntradas,
    totalSalidas,
    agregarMovimiento,
    restaurarMovimientos,
  } = useMoney();

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

  const crearRespaldo = async () => {
    await exportarRespaldo(movimientos);
  };

  const restaurarRespaldo = async () => {
    const movimientosImportados = await importarRespaldo();

    if (!movimientosImportados) {
      return;
    }

    Alert.alert(
      "Restaurar respaldo",
      "Esto reemplazará los movimientos actuales por los del respaldo. ¿Deseas continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Restaurar",
          style: "destructive",
          onPress: () => {
            restaurarMovimientos(movimientosImportados);
          },
        },
      ]
    );
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

        <Pressable style={styles.backupButton} onPress={crearRespaldo}>
          <Text style={styles.backupButtonText}>💾 Crear respaldo</Text>
        </Pressable>

        <Pressable style={styles.backupButton} onPress={restaurarRespaldo}>
          <Text style={styles.backupButtonText}>📂 Restaurar respaldo</Text>
        </Pressable>
      </Pressable>
    </View>
  );
}
