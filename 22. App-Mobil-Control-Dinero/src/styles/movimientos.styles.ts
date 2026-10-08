import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  searchInput: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
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

  dateFilters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  dateFilterButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
  },

  dateFilterButtonActive: {
    backgroundColor: "#2563eb",
  },

  dateFilterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },

  dateFilterTextActive: {
    color: "#ffffff",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  filterTextActive: {
    color: "#ffffff",
  },
});
