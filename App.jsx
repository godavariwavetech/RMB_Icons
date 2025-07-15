import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {getFCMToken} from './src/services/NotificationsService';
import { checkNotifications, requestNotifications, RESULTS } from 'react-native-permissions';
import { Linking } from 'react-native';
import CustomModal2 from './src/components/common/CustomModal2';
import VersionCheck from 'react-native-version-check'

const App = () => {
  const [isOffline, setIsOffline] = useState(false); // Track network status
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial component load
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const checkAndRequestPermissions = async () => {
    try {
      const {status} = await checkNotifications();
      if (status !== RESULTS.GRANTED) {
        const {status: newStatus} = await requestNotifications([
          'alert',
          'sound',
        ]);
        console.log('Notification permission status:', newStatus);
      } else {
        console.log('Notification permission granted');
      }
    } catch (err) {
      console.warn('Notification permission error:', err);
    }
  };

  const getToken = async () => {
    await getFCMToken();
  };

  const handleUpdate = async () => {
    try {
      console.log("Open playstore")
      Linking.openURL("https://play.google.com/store/apps/details?id=com.rmbicons&pcampaignid=web_share")
    } catch (error) {
      console.log("Play Store link error:", error);
    } finally {
      setShowUpdateModal(false);
    }
  };

  const checkForUpdate = async () => {
    try {
      const res = await VersionCheck.needUpdate();
      console.log(res,"++++++++++++++rerpererp")
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
  useEffect(() => {
    checkForUpdate()
    SplashScreen.hide();
    // getToken();
    checkAndRequestPermissions();
  }, []);

  // Check network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = !state.isConnected;
      setIsOffline(offline);
      if (offline) {
        Toast.show({
          type: 'error',
          text1: 'No Network',
          text2: 'Please check your internet connection.',
          position: 'top',
          autoHide: false, // Keep Toast visible until hidden manually
          visibilityTime: 100000,
        });
      } else {
        Toast.hide(); // Hide the offline Toast when network is restored
        if (!isInitialLoad) {
          // Only show success Toast if this is not the initial load
          Toast.show({
            type: 'success',
            text1: 'Network Restored',
            text2: 'You are now connected to the internet.',
            position: 'top',
            visibilityTime: 3000,
          });
        } else {
          console.log('Skipping Network Restored Toast on initial load');
        }
      }
      setIsInitialLoad(false);
    });

    // Cleanup subscription on component unmount
    return () => {
      console.log('Cleaning up NetInfo subscription and hiding Toast');
      unsubscribe();
      Toast.hide(); // Ensure Toast is hidden when component unmounts
    };
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <Toast />
        <CustomModal2
            visible={showUpdateModal}
            title="Update Available"
            message="A new version of the app is available. Please update to continue using all features."
            confirmText="Update Now"
            onConfirm={handleUpdate}
            cancelText=''
          />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
