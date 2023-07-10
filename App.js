import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Home from './src/Screens/Home';
import { colors } from './src/Global/Colors';
import Header from './src/Components/Header';
import ItemListCategory from './src/Screens/ItemListCategory';

export default function App() {
  const [categorySelected, setCategorySelected] = useState("smartphones");
  return (
    <View style={styles.container}>
      <Header></Header>
      {/* <Home setCategorySelected={setCategorySelected} /> */}
      <ItemListCategory category={categorySelected}></ItemListCategory>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOcean
  },
});
