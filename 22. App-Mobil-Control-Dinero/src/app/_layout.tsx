import { Tabs } from "expo-router";
import { MoneyProvider } from "../context/MoneyContext";

export default function Layout() {
  return (
    <MoneyProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarLabel: "Inicio",
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="movimientos"
          options={{
            title: "Movimientos",
            tabBarLabel: "Movimientos",
            headerShown: false,
          }}
        />
      </Tabs>
    </MoneyProvider>
  );
}
