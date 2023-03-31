import { StripeProvider } from "@stripe/stripe-react-native";
import { StyleSheet, Text, View } from "react-native";
import Payment from "./components/Payment";

export default function App() {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51MM9UrH6FoiALPvQKQEPiGH41j17Urmt6zH3TIarKn8h2ovpxfa4qEAQR2H4KGFAJkcalQ8oQP2u6UAPLVsucln600oAV3HBIT">
        <Payment />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
