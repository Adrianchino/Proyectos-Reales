import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/MovementForm.styles";

type MovementFormProps = {
  monto: string;
  setMonto: (valor: string) => void;
  concepto: string;
  setConcepto: (valor: string) => void;
  error: string;
  onAgregar: () => void;
  onRetirar: () => void;
  editando: boolean;
  onGuardarEdicion: () => void;
  onCancelarEdicion: () => void;
};

export default function MovementForm({
  monto,
  setMonto,
  concepto,
  setConcepto,
  error,
  onAgregar,
  onRetirar,
  editando,
  onGuardarEdicion,
  onCancelarEdicion,
}: MovementFormProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Concepto"
        value={concepto}
        onChangeText={setConcepto}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {editando ? (
        <>
          <TouchableOpacity style={styles.button} onPress={onGuardarEdicion}>
            <Text style={styles.buttonText}>💾 Guardar cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onCancelarEdicion}>
            <Text style={styles.buttonText}>❌ Cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={onAgregar}>
            <Text style={styles.buttonText}>+ Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onRetirar}>
            <Text style={styles.buttonText}>- Retirar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
