import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Home from './src/Screens/Home';
import { colors } from './src/Global/Colors';
import Header from './src/Components/Header';

export default function App() {
  const [categorySelected, setCategorySelected] = useState("")
  return (
    <View style={styles.container}>
      <Header></Header>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOcean
  },
});
