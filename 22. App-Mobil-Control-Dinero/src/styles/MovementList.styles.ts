import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  history: {
    width: "80%",
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
  },

  historyScroll: {
    flex: 1,
  },

  historyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
  },

  movement: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  concepto: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  entrada: {
    color: "#2e7d32",
    fontWeight: "bold",
  },

  salida: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    paddingVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    marginTop: 30,
  },
});
