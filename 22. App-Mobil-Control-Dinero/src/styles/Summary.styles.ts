import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  saldoContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#1e293b",
    marginBottom: 12,
  },

  saldoLabel: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 5,
  },

  saldo: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },

  resumenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  item: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    minWidth: 140,
  },

  label: {
    fontSize: 17,
    color: "#64748b",
    marginBottom: 5,
  },

  entrada: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#16a34a",
  },

  salida: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#dc2626",
  },

  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  currency: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
