import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { cargarMovimientos, guardarMovimientos, } from "../services/movimientos.service";

export type Movimiento = {
  id: string;
  tipo: "entrada" | "salida";
  monto: number;
  fecha: Date;
  concepto: string;
};

type MoneyContextType = {
  movimientos: Movimiento[];
  cargando: boolean;
  saldo: number;
  totalEntradas: number;
  totalSalidas: number;
  agregarMovimiento: (
    tipo: "entrada" | "salida",
    monto: number,
    concepto: string
  ) => void;
  eliminarMovimiento: (id: string) => void;
  editarMovimiento: (
    id: string,
    nuevoMonto: number,
    nuevoConcepto: string
  ) => void;
};

const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

type MoneyProviderProps = {
  children: ReactNode;
};

export function MoneyProvider({ children }: MoneyProviderProps) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar movimientos guardados
  useEffect(() => {
    const cargarDatos = async () => {
      const movimientosGuardados = await cargarMovimientos();

      setMovimientos(movimientosGuardados);
      setCargando(false);
    };

    cargarDatos();
  }, []);

  // Guardar movimientos
  useEffect(() => {
    if (cargando) return;

    guardarMovimientos(movimientos);
  }, [movimientos, cargando]);

  // Calcular saldo
  const saldo = movimientos.reduce(
    (total, movimiento) =>
      movimiento.tipo === "entrada"
        ? total + movimiento.monto
        : total - movimiento.monto,
    0
  );

  // Total de entradas
  const totalEntradas = movimientos
    .filter((movimiento) => movimiento.tipo === "entrada")
    .reduce((total, movimiento) => total + movimiento.monto, 0);

  // Total de salidas
  const totalSalidas = movimientos
    .filter((movimiento) => movimiento.tipo === "salida")
    .reduce((total, movimiento) => total + movimiento.monto, 0);

  const agregarMovimiento = (
    tipo: "entrada" | "salida",
    monto: number,
    concepto: string
  ) => {
    setMovimientos((movimientosActuales) => [
      ...movimientosActuales,
      {
        id: Date.now().toString(),
        tipo,
        monto,
        concepto,
        fecha: new Date(),
      },
    ]);
  };

  const eliminarMovimiento = (id: string) => {
    setMovimientos((movimientosActuales) =>
      movimientosActuales.filter((movimiento) => movimiento.id !== id)
    );
  };

  const editarMovimiento = (
    id: string,
    nuevoMonto: number,
    nuevoConcepto: string
  ) => {
    setMovimientos((movimientosActuales) =>
      movimientosActuales.map((movimiento) =>
        movimiento.id === id
          ? {
              ...movimiento,
              monto: nuevoMonto,
              concepto: nuevoConcepto,
            }
          : movimiento
      )
    );
  };

  return (
    <MoneyContext.Provider
      value={{
        movimientos,
        cargando,
        saldo,
        totalEntradas,
        totalSalidas,
        agregarMovimiento,
        eliminarMovimiento,
        editarMovimiento,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
}

export function useMoney() {
  const context = useContext(MoneyContext);

  if (!context) {
    throw new Error("useMoney debe utilizarse dentro de MoneyProvider");
  }

  return context;
}
