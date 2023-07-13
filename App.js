import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Home from './src/Screens/Home';
import { colors } from './src/Global/Colors';
import Header from './src/Components/Header';
import ItemListCategory from './src/Screens/ItemListCategory';
import { useFonts } from 'expo-font';

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const [productSelected, setProductSelected] = useState("");

  const [fontsLoaded] = useFonts({
    'BROmega': require('./src/Assets/Fonts/BROmega/BROmega-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }
  //Acá se manejará el estado para seleccionar una category y un producto

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
