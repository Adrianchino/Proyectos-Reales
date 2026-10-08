import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { Movimiento } from "../context/MoneyContext";

export const crearRespaldo = (movimientos: Movimiento[]) => {
  const respaldo = {
    fechaRespaldo: new Date().toISOString(),
    movimientos,
  };

  return JSON.stringify(respaldo, null, 2);
};

export const exportarRespaldo = async (movimientos: Movimiento[]) => {
  try {
    const contenido = crearRespaldo(movimientos);

    const fecha = new Date();

    const nombreArchivo = `respaldo-movimientos-${fecha
      .toISOString()
      .replace(/[:.]/g, "-")}.json`;

    const archivo = new File(Paths.cache, nombreArchivo);

    archivo.create();
    archivo.write(contenido);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(archivo.uri);
    }
  } catch (error) {
    console.log("Error al crear respaldo:", error);
  }
};

export const importarRespaldo = async () => {
  try {
    const resultado = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (resultado.canceled) {
      return null;
    }

    const { uri } = resultado.assets[0];

    const respuesta = await fetch(uri);

    const contenido = await respuesta.text();

    const respaldo = JSON.parse(contenido);

    if (!Array.isArray(respaldo.movimientos)) {
      return null;
    }

    const movimientos = respaldo.movimientos.map((movimiento: Movimiento) => ({
      ...movimiento,
      fecha: new Date(movimiento.fecha),
    }));

    return movimientos;
  } catch (error) {
    console.log("Error al importar respaldo:", error);
    return null;
  }
};
