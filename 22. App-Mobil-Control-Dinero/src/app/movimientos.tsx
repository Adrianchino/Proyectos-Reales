import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MovementForm from "../components/MovementForm";
import MovementList from "../components/MovementList";
import { Movimiento, useMoney } from "../context/MoneyContext";
import { styles } from "../styles/movimientos.styles";

export default function Movimientos() {
  const { movimientos, saldo, eliminarMovimiento, editarMovimiento } =
    useMoney();

  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [error, setError] = useState("");
  const [movimientoEditando, setMovimientoEditando] =
    useState<Movimiento | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "entrada" | "salida">("todos");
  const [filtroFecha, setFiltroFecha] = useState<
    "todos" | "hoy" | "ayer" | "semana" | "mes"
  >("todos");

  const movimientosFiltrados = movimientos
    .filter((movimiento) => {
      const coincideBusqueda = String(movimiento.concepto ?? "")
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideFiltro = filtro === "todos" || movimiento.tipo === filtro;

      const ahora = new Date();
      const fechaMovimiento = new Date(movimiento.fecha);

      let coincideFecha = true;

      if (filtroFecha === "hoy") {
        coincideFecha =
          fechaMovimiento.getDate() === ahora.getDate() &&
          fechaMovimiento.getMonth() === ahora.getMonth() &&
          fechaMovimiento.getFullYear() === ahora.getFullYear();
      }

      if (filtroFecha === "ayer") {
        const ayer = new Date(ahora);
        ayer.setDate(ahora.getDate() - 1);

        coincideFecha =
          fechaMovimiento.getDate() === ayer.getDate() &&
          fechaMovimiento.getMonth() === ayer.getMonth() &&
          fechaMovimiento.getFullYear() === ayer.getFullYear();
      }

      if (filtroFecha === "semana") {
        const inicioSemana = new Date(ahora);
        inicioSemana.setDate(ahora.getDate() - ahora.getDay());
        inicioSemana.setHours(0, 0, 0, 0);

        coincideFecha = fechaMovimiento >= inicioSemana;
      }

      if (filtroFecha === "mes") {
        coincideFecha =
          fechaMovimiento.getMonth() === ahora.getMonth() &&
          fechaMovimiento.getFullYear() === ahora.getFullYear();
      }

      return coincideBusqueda && coincideFiltro && coincideFecha;
    })
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

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
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <TextInput
        placeholder="🔎 Buscar movimiento..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.searchInput}
      />

      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filtro === "todos" && styles.filterButtonActive,
          ]}
          onPress={() => setFiltro("todos")}
        >
          <Text
            style={[
              styles.filterText,
              filtro === "todos" && styles.filterTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filtro === "entrada" && styles.filterButtonActive,
          ]}
          onPress={() => setFiltro("entrada")}
        >
          <Text
            style={[
              styles.filterText,
              filtro === "entrada" && styles.filterTextActive,
            ]}
          >
            Entradas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filtro === "salida" && styles.filterButtonActive,
          ]}
          onPress={() => setFiltro("salida")}
        >
          <Text
            style={[
              styles.filterText,
              filtro === "salida" && styles.filterTextActive,
            ]}
          >
            Salidas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateFilters}>
        <TouchableOpacity
          style={[
            styles.dateFilterButton,
            filtroFecha === "todos" && styles.dateFilterButtonActive,
          ]}
          onPress={() => setFiltroFecha("todos")}
        >
          <Text
            style={[
              styles.dateFilterText,
              filtroFecha === "todos" && styles.dateFilterTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateFilterButton,
            filtroFecha === "hoy" && styles.dateFilterButtonActive,
          ]}
          onPress={() => setFiltroFecha("hoy")}
        >
          <Text
            style={[
              styles.dateFilterText,
              filtroFecha === "hoy" && styles.dateFilterTextActive,
            ]}
          >
            Hoy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateFilterButton,
            filtroFecha === "ayer" && styles.dateFilterButtonActive,
          ]}
          onPress={() => setFiltroFecha("ayer")}
        >
          <Text
            style={[
              styles.dateFilterText,
              filtroFecha === "ayer" && styles.dateFilterTextActive,
            ]}
          >
            Ayer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateFilterButton,
            filtroFecha === "semana" && styles.dateFilterButtonActive,
          ]}
          onPress={() => setFiltroFecha("semana")}
        >
          <Text
            style={[
              styles.dateFilterText,
              filtroFecha === "semana" && styles.dateFilterTextActive,
            ]}
          >
            Semana
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateFilterButton,
            filtroFecha === "mes" && styles.dateFilterButtonActive,
          ]}
          onPress={() => setFiltroFecha("mes")}
        >
          <Text
            style={[
              styles.dateFilterText,
              filtroFecha === "mes" && styles.dateFilterTextActive,
            ]}
          >
            Mes
          </Text>
        </TouchableOpacity>
      </View>

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
        movimientos={movimientosFiltrados}
        eliminarMovimiento={confirmarEliminar}
        iniciarEdicion={iniciarEdicion}
      />
    </Pressable>
  );
}
