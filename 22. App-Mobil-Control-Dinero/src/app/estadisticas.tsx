import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useMoney } from "../context/MoneyContext";
import { styles } from "../styles/estadisticas.styles";

export default function Estadisticas() {
  const { movimientos } = useMoney();

  const [periodo, setPeriodo] = useState<"hoy" | "semana" | "mes">("hoy");

  const ahora = new Date();

  const movimientosPeriodo = movimientos.filter((movimiento) => {
    const fecha = new Date(movimiento.fecha);

    if (periodo === "hoy") {
      return (
        fecha.getDate() === ahora.getDate() &&
        fecha.getMonth() === ahora.getMonth() &&
        fecha.getFullYear() === ahora.getFullYear()
      );
    }

    if (periodo === "semana") {
      const inicioSemana = new Date(ahora);
      inicioSemana.setDate(ahora.getDate() - ahora.getDay());
      inicioSemana.setHours(0, 0, 0, 0);

      return fecha >= inicioSemana;
    }

    if (periodo === "mes") {
      return (
        fecha.getMonth() === ahora.getMonth() &&
        fecha.getFullYear() === ahora.getFullYear()
      );
    }

    return true;
  });

  const entradasPeriodo = movimientosPeriodo
    .filter((movimiento) => movimiento.tipo === "entrada")
    .reduce((total, movimiento) => total + movimiento.monto, 0);

  const salidasPeriodo = movimientosPeriodo
    .filter((movimiento) => movimiento.tipo === "salida")
    .reduce((total, movimiento) => total + movimiento.monto, 0);

  const balancePeriodo = entradasPeriodo - salidasPeriodo;

  const cantidadMovimientos = movimientosPeriodo.length;

  const cantidadEntradas = movimientosPeriodo.filter(
    (movimiento) => movimiento.tipo === "entrada"
  ).length;

  const cantidadSalidas = movimientosPeriodo.filter(
    (movimiento) => movimiento.tipo === "salida"
  ).length;

  const salidasPorConcepto = movimientosPeriodo
    .filter((movimiento) => movimiento.tipo === "salida")
    .reduce(
      (acumulado, movimiento) => {
        const concepto = movimiento.concepto.trim() || "Sin concepto";

        acumulado[concepto] = (acumulado[concepto] || 0) + movimiento.monto;

        return acumulado;
      },
      {} as Record<string, number>
    );

  const conceptosOrdenados = Object.entries(salidasPorConcepto).sort(
    ([, montoA], [, montoB]) => montoB - montoA
  );

  const mayorGasto = conceptosOrdenados[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Estadísticas</Text>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            periodo === "hoy" && styles.filterButtonActive,
          ]}
          onPress={() => setPeriodo("hoy")}
        >
          <Text
            style={[
              styles.filterText,
              periodo === "hoy" && styles.filterTextActive,
            ]}
          >
            Hoy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            periodo === "semana" && styles.filterButtonActive,
          ]}
          onPress={() => setPeriodo("semana")}
        >
          <Text
            style={[
              styles.filterText,
              periodo === "semana" && styles.filterTextActive,
            ]}
          >
            Semana
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            periodo === "mes" && styles.filterButtonActive,
          ]}
          onPress={() => setPeriodo("mes")}
        >
          <Text
            style={[
              styles.filterText,
              periodo === "mes" && styles.filterTextActive,
            ]}
          >
            Mes
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Balance{" "}
          {periodo === "hoy"
            ? "de hoy"
            : periodo === "semana"
              ? "de la semana"
              : "del mes"}
        </Text>

        <Text style={styles.saldo}>S/ {balancePeriodo}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.label}>Entradas</Text>
          <Text style={styles.entrada}>S/ {entradasPeriodo}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.label}>Salidas</Text>
          <Text style={styles.salida}>S/ {salidasPeriodo}</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Entradas y Salidas</Text>

        <View style={styles.chart}>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                styles.barEntrada,
                {
                  height:
                    Math.max(entradasPeriodo, salidasPeriodo) > 0
                      ? (entradasPeriodo /
                          Math.max(entradasPeriodo, salidasPeriodo)) *
                        120
                      : 0,
                },
              ]}
            />
            <Text style={styles.barLabel}>Entradas</Text>
            <Text style={styles.barAmount}>S/ {entradasPeriodo}</Text>
          </View>

          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                styles.barSalida,
                {
                  height:
                    Math.max(entradasPeriodo, salidasPeriodo) > 0
                      ? (salidasPeriodo /
                          Math.max(entradasPeriodo, salidasPeriodo)) *
                        120
                      : 0,
                },
              ]}
            />
            <Text style={styles.barLabel}>Salidas</Text>
            <Text style={styles.barAmount}>S/ {salidasPeriodo}</Text>
          </View>
        </View>
      </View>

      <View style={styles.movimientosCard}>
        <Text style={styles.movimientosTitle}>Movimientos del período</Text>

        <Text style={styles.movimientosTotal}>
          {cantidadMovimientos} movimientos
        </Text>

        <View style={styles.movimientosDetalle}>
          <Text style={styles.entrada}>{cantidadEntradas} entradas</Text>

          <Text style={styles.salida}>{cantidadSalidas} salidas</Text>
        </View>
      </View>

      <View style={styles.conceptosCard}>
        <Text style={styles.conceptosTitle}>Gastos por concepto</Text>

        {conceptosOrdenados.length === 0 ? (
          <Text style={styles.sinConceptos}>
            No hay salidas en este período
          </Text>
        ) : (
          conceptosOrdenados.map(([concepto, monto]) => (
            <View style={styles.conceptoRow} key={concepto}>
              <Text style={styles.conceptoNombre}>{concepto}</Text>

              <Text style={styles.conceptoMonto}>S/ {monto}</Text>
            </View>
          ))
        )}
      </View>

      {mayorGasto && (
        <View style={styles.mayorGastoCard}>
          <Text style={styles.mayorGastoTitle}>🏆 Mayor gasto</Text>

          <Text style={styles.mayorGastoConcepto}>{mayorGasto[0]}</Text>

          <Text style={styles.mayorGastoMonto}>S/ {mayorGasto[1]}</Text>
        </View>
      )}
    </ScrollView>
  );
}
