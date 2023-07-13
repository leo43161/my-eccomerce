import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Home from './src/Screens/Home';
import { colors } from './src/Global/Colors';
import Header from './src/Components/Header';
import ItemListCategory from './src/Screens/ItemListCategory';

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  return (
    <View style={styles.container}>
      <Header categorySelected={categorySelected} setCategorySelected={setCategorySelected}></Header>
      {
        categorySelected ?
          <ItemListCategory
            category={categorySelected}
            setCategory={setCategorySelected}
          />
          :
          <Home setCategorySelected={setCategorySelected} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOcean
  },
});
