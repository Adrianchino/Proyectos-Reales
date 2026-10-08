import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },

  content: {
    paddingBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },

  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
  },

  filterButtonActive: {
    backgroundColor: "#2563eb",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  filterTextActive: {
    color: "#ffffff",
  },

  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 8,
  },

  saldo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 18,
  },

  entrada: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
  },

  salida: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dc2626",
  },

  chartCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },

  chart: {
    height: 180,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  barContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 160,
  },

  bar: {
    width: 55,
    borderRadius: 8,
    minHeight: 5,
  },

  barEntrada: {
    backgroundColor: "#16a34a",
  },

  barSalida: {
    backgroundColor: "#dc2626",
  },

  barLabel: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748b",
  },

  barAmount: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 3,
  },

  movimientosCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
  },

  movimientosTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },

  movimientosTotal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
  },

  movimientosDetalle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  conceptosCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
  },

  conceptosTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 15,
  },

  conceptoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  conceptoNombre: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
  },

  conceptoMonto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
  },

  sinConceptos: {
    color: "#64748b",
    textAlign: "center",
    paddingVertical: 10,
  },

  mayorGastoCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
		marginBottom: 35,
  },

  mayorGastoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },

  mayorGastoConcepto: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
  },

  mayorGastoMonto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
    marginTop: 4,
  },
});
