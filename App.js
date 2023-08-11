import { useFonts } from 'expo-font';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/Store/store';
import { init } from './src/SQLite';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    init().then( async(result) => {
      console.log("Db initialized/dropped");
      console.log(result);
    })
      .catch(err => {
        console.log("Initialization DB failed:");
        console.log(err.message);
      })
  }, [])

  const [fontsLoaded] = useFonts({
    'BROmega': require('./src/Assets/Fonts/BROmega/BROmega-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }
  //Acá se manejará el estado para seleccionar una category y un producto

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
