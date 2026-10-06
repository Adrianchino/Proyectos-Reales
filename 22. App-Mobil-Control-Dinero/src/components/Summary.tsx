import { Text, View } from "react-native";
import styles from "../styles/Summary.styles";

interface SummaryProps {
  saldo: number;
  totalEntradas: number;
  totalSalidas: number;
}

export default function Summary({
  saldo,
  totalEntradas,
  totalSalidas,
}: SummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo actual</Text>
        <Text style={styles.saldo}>S/ {saldo}</Text>
      </View>

      <View style={styles.resumenContainer}>
        <View style={styles.item}>
          <Text style={styles.label}>Entradas</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currency}>S/</Text>
            <Text style={styles.entrada}>{totalEntradas}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Salidas</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currency}>S/</Text>
            <Text style={styles.salida}>{totalSalidas}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
