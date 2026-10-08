import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movimiento } from "../context/MoneyContext";

const MOVIMIENTOS_KEY = "movimientos";

export const cargarMovimientos = async (): Promise<Movimiento[]> => {
  try {
    const movimientosGuardados = await AsyncStorage.getItem(MOVIMIENTOS_KEY);

    if (!movimientosGuardados) {
      return [];
    }

    const movimientosParseados = JSON.parse(movimientosGuardados);

    return movimientosParseados.map((movimiento: Movimiento) => ({
      ...movimiento,
      fecha: new Date(movimiento.fecha),
    }));
  } catch (error) {
    console.log("Error al cargar movimientos:", error);
    return [];
  }
};

export const guardarMovimientos = async (
  movimientos: Movimiento[]
): Promise<void> => {
  try {
    await AsyncStorage.setItem(MOVIMIENTOS_KEY, JSON.stringify(movimientos));
  } catch (error) {
    console.log("Error al guardar movimientos:", error);
  }
};
