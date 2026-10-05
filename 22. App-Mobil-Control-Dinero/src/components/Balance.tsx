import { Text, View } from 'react-native';
import { styles } from '../styles/Balance.styles';

type BalanceProps = {
  saldo: number;
};

export default function Balance({ saldo }: BalanceProps) {
  return (
    <View>
      <Text style={styles.label}>
        Saldo actual
      </Text>

      <Text style={styles.balance}>
        S/ {saldo.toFixed(2)}
      </Text>
    </View>
  );
}