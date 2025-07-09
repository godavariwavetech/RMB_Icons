import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setInitial} from '../../redux/reducers/auth';
import SplashScreenImg from './svgs/SplashScreenImg';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import commonStyles from '../../commonstyles/CommonStyles';

const SplashScreen = ({navigation}) => {
  const {userId} = useSelector(state => state.Auth);
  const { rehydrated } = useSelector(state => state.Auth._persist);

  const navigateToApp = () => {
    if (!userId) {
      navigation.replace('LoginPage');
    } else {
      navigation.replace('ProfileCard');
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (rehydrated) {
        navigateToApp();
      }
    };
    const timer = setTimeout(initialize, 1000);
    return () => clearTimeout(timer);
  }, [rehydrated]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/rmbSplash.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 45}}>
          <Image
            source={require('../../assets/rmbSplashLogo.png')}
            style={{width: 220, height: 200, resizeMode: 'contain'}}
          />
        </View>
      </ImageBackground>
      {/* <View style={{flex:1,backgroundColor:commonStyles.mainColor,justifyContent:'center',alignItems:'center'}}>
         <Image source={require('../../assets/rmbSplashLogo.png')} style={{ width: '80%', height: 240, resizeMode: 'contain' }} />
      </View> */}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center'
  },
  text1: {},
  bottomContainer: {
    flex: 1,
    backgroundColor: commonStyles.mainColor,
  },
});
