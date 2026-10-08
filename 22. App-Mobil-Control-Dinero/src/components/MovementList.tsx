import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../styles/MovementList.styles";

type Movimiento = {
  id: string;
  tipo: "entrada" | "salida";
  monto: number;
  concepto: string;
  fecha: Date;
};

type MovementListProps = {
  movimientos: Movimiento[];
  eliminarMovimiento: (id: string) => void;
  iniciarEdicion: (movimiento: Movimiento) => void;
};

export default function MovementList({
  movimientos,
  eliminarMovimiento,
  iniciarEdicion,
}: MovementListProps) {
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState<
    string | null
  >(null);

  return (
    <View style={styles.history}>
      <Text style={styles.historyTitle}>Movimientos</Text>

      <ScrollView
        style={styles.historyScroll}
        showsVerticalScrollIndicator={true}
      >
        {movimientos.length === 0 ? (
          <Text style={styles.emptyText}>🔎 No se encontraron movimientos</Text>
        ) : (
          movimientos.map((movimiento) => {
            const fechaMovimiento = new Date(movimiento.fecha);

            return (
              <View key={movimiento.id}>
                <Pressable
                  style={styles.movement}
                  onPress={() =>
                    setMovimientoSeleccionado(
                      movimientoSeleccionado === movimiento.id
                        ? null
                        : movimiento.id
                    )
                  }
                >
                  <View>
                    <Text>
                      {movimiento.tipo === "entrada"
                        ? "➕ Agregado"
                        : "➖ Retirado"}
                    </Text>

                    <Text style={styles.concepto}>{movimiento.concepto}</Text>

                    <Text style={styles.date}>
                      {fechaMovimiento.toLocaleDateString()} •{" "}
                      {fechaMovimiento.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>

                  <Text
                    style={
                      movimiento.tipo === "entrada"
                        ? styles.entrada
                        : styles.salida
                    }
                  >
                    {movimiento.tipo === "entrada" ? "+" : "-"} S/{" "}
                    {movimiento.monto}
                  </Text>
                </Pressable>

                {movimientoSeleccionado === movimiento.id && (
                  <View style={styles.actions}>
                    <Pressable
                      onPress={() => {
                        iniciarEdicion(movimiento);
                        setMovimientoSeleccionado(null);
                      }}
                    >
                      <Text>✏️ Editar</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => eliminarMovimiento(movimiento.id)}
                    >
                      <Text>🗑️ Eliminar</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
