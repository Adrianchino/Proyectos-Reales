import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Pressable, Text, View } from "react-native";

import Balance from "../components/Balance";
import MovementForm from "../components/MovementForm";
import MovementList from "../components/MovementList";

import { styles } from "../styles/index.styles";

export default function Index() {
  type Movimiento = {
    id: string;
    tipo: "entrada" | "salida";
    monto: number;
    fecha: Date;
    concepto: string;
  };

  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [error, setError] = useState("");

  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [movimientoEditando, setMovimientoEditando] = useState<string | null>(
    null
  );

  const saldo = movimientos.reduce(
    (total, movimiento) =>
      movimiento.tipo === "entrada"
        ? total + movimiento.monto
        : total - movimiento.monto,
    0
  );

  useEffect(() => {
    if (cargando) return;

    const guardarMovimientos = async () => {
      try {
        await AsyncStorage.setItem("movimientos", JSON.stringify(movimientos));
      } catch (error) {
        console.log("Error al guardar movimientos:", error);
      }
    };

    guardarMovimientos();
  }, [movimientos, cargando]);

  useEffect(() => {
    const cargarMovimientos = async () => {
      try {
        const movimientosGuardados = await AsyncStorage.getItem("movimientos");

        if (movimientosGuardados) {
          const movimientosParseados = JSON.parse(movimientosGuardados);

          const movimientosConFecha = movimientosParseados.map(
            (movimiento: Movimiento) => ({
              ...movimiento,
              fecha: new Date(movimiento.fecha),
            })
          );

          setMovimientos(movimientosConFecha);
        }
      } catch (error) {
        console.log("Error al cargar movimientos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarMovimientos();
  }, []);

  const agregarDinero = () => {
    const cantidad = Number(monto);

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    setMovimientos([
      ...movimientos,
      {
        id: Date.now().toString(),
        tipo: "entrada",
        monto: cantidad,
        concepto: concepto,
        fecha: new Date(),
      },
    ]);

    setMonto("");
    setConcepto("");
    setError("");
  };

  const retirarDinero = () => {
    const cantidad = Number(monto);

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    if (cantidad > saldo) {
      setError("No cuentas con saldo suficiente");
      return;
    }
    setMovimientos([
      ...movimientos,
      {
        id: Date.now().toString(),
        tipo: "salida",
        monto: cantidad,
        concepto: concepto,
        fecha: new Date(),
      },
    ]);

    setMonto("");
    setConcepto("");
    setError("");
  };

  const eliminarMovimiento = (id: string) => {
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
          onPress: () => {
            setMovimientos(
              movimientos.filter((movimiento) => movimiento.id !== id)
            );
          },
        },
      ]
    );
  };

  const editarMovimiento = (
    id: string,
    nuevoMonto: number,
    nuevoConcepto: string
  ) => {
    setMovimientos(
      movimientos.map((movimiento) =>
        movimiento.id === id
          ? {
              ...movimiento,
              monto: nuevoMonto,
              concepto: nuevoConcepto,
            }
          : movimiento
      )
    );
  };

  const guardarEdicion = () => {
    const cantidad = Number(monto);

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    if (!movimientoEditando) {
      return;
    }

    const movimiento = movimientos.find(
      (movimiento) => movimiento.id === movimientoEditando
    );

    if (!movimiento) {
      return;
    }

    // Si estamos editando una salida,
    // calculamos cuánto saldo tendríamos después del cambio.
    if (movimiento.tipo === "salida") {
      const saldoSinMovimiento = saldo + movimiento.monto;

      if (cantidad > saldoSinMovimiento) {
        setError("No cuentas con saldo suficiente");
        return;
      }
    }

    editarMovimiento(movimientoEditando, cantidad, concepto);

    setMovimientoEditando(null);
    setMonto("");
    setConcepto("");
    setError("");
  };

  const iniciarEdicion = (movimiento: Movimiento) => {
    setMovimientoEditando(movimiento.id);
    setMonto(movimiento.monto.toString());
    setConcepto(movimiento.concepto);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.content} onPress={Keyboard.dismiss}>
        <Text style={styles.title}>CAJA FUERTE</Text>

        <Balance saldo={saldo} />

        <MovementForm
          monto={monto}
          setMonto={setMonto}
          concepto={concepto}
          setConcepto={setConcepto}
          error={error}
          onAgregar={agregarDinero}
          onRetirar={retirarDinero}
          editando={movimientoEditando !== null}
          onGuardarEdicion={guardarEdicion}
          onCancelarEdicion={() => {
            setMovimientoEditando(null);
            setMonto("");
            setConcepto("");
            setError("");
          }}
        />
      </Pressable>

      <MovementList
        movimientos={movimientos}
        eliminarMovimiento={eliminarMovimiento}
        editarMovimiento={editarMovimiento}
        iniciarEdicion={iniciarEdicion}
      />
    </View>
  );
}
