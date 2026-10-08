import { Ionicons } from "@expo/vector-icons";
import { NavigationBar } from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { MoneyProvider } from "../context/MoneyContext";

export default function Layout() {
  return (
    <MoneyProvider>
      <NavigationBar hidden />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#64748b",
          tabBarStyle: {
            height: 65,
            paddingBottom: 8,
            paddingTop: 5,
            borderTopWidth: 1,
            borderTopColor: "#e2e8f0",
            backgroundColor: "#ffffff",
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarLabel: "Inicio",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="movimientos"
          options={{
            title: "Movimientos",
            tabBarLabel: "Movimientos",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="time-outline" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="estadisticas"
          options={{
            title: "Estadísticas",
            tabBarLabel: "Estadísticas",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </MoneyProvider>
  );
}
