import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import VersionCheck from 'react-native-version-check'; 
import { Linking } from 'react-native';
import UpdateModal from './src/components/common/UpdateModal';

const App = () => {

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const checkForUpdate = async () => {
    try {
      const res = await VersionCheck.needUpdate();
      if (res?.isNeeded) {
        console.log("first")
        setShowUpdateModal(true);
      }else{
        console.log("second")
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.log("Error checking for updates:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("Open playstore")
      Linking.openURL("https://play.google.com/store/apps/details?id=com.rmbicons&pcampaignid=web_share") // Open Play Store / App Store
    } catch (error) {
      console.log("Play Store link error:", error);
    }
  };

  useEffect(()=>{
    SplashScreen.hide();
    checkForUpdate();
  },[])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <Toast />
        <UpdateModal
          visible={showUpdateModal}
          onUpdatePress={() => {
            handleUpdate()
            setShowUpdateModal(false);
          }}
        />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
