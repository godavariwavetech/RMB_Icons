import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';


const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
