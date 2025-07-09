
import React, { useState,useEffect } from 'react';
import { View, Text, Switch, StyleSheet, StatusBar, Image , PermissionsAndroid, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import commonStyles from '../commonstyles/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
// import MapView, { Marker, Polyline } from 'react-native-maps';

// import { Image } from 'react-native-svg';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

const UserHome = () => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);


  const toggleSwitch = () => setIsOnDuty(previousState => !previousState);

  const fullName = "Veera venkata durga prasad kumar sharma";
  const truncatedName = truncateText(fullName, 26); // Truncate to 20 characters

  const iconColor = isOnDuty ? commonStyles.mainColor : '#8F8F8F';




  const getGreeting = () => {
    const currentHour = new Date().getHours();
    // const currentHour=21
    if (currentHour < 12) return "Good morning!";
    if (currentHour < 17) return "Good afternoon!";
    if (currentHour < 21) return "Good evening!";
    return "Good night!";
  };


  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs your location to show nearby vehicles.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setIsLocationEnabled(false);
      return;
    }

    try {
      


    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLocationEnabled(true);
        // dispatch(userLocation({ latitude, longitude }));
        console.log(latitude, longitude, "latitude,longitude");
      },
      error => {
        console.log("Location error:", error);
        setIsLocationEnabled(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000, // Reduced from 30000 to 10000 (10 seconds)
        maximumAge: 1000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
      
    );
        } catch (error) {
      console.log(error,"+++++++++++ERROR")
    }
  };

  useEffect(() => {
    // Request location in parallel
    getLocation();
  }, []);

  // useFocusEffect(useCallback(() => {
  //   // Only fetch vehicles when we have location
  //   if (isLocationEnabled && location.latitude && location.longitude) {
  //   }
  // }, [location, isLocationEnabled]));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor='transparent' />
      <View style={{ backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 2 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Text style={commonStyles.text3}>{getGreeting()}, </Text>
              <Text style={styles.headerText}>{truncatedName}</Text>
            </View>
            <Text style={styles.locationText}>Morampudi colony</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.iconContainer}>
              {/* <Icon name="location-pin" size={24} color="#fff" style={styles.iconBackground} /> */}
              <Image source={require('../assets/locationLogo.png')} style={{ width: 40, height: 40 }} resizeMode='contain' />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="notifications" size={22} color="#5E4AE3" style={styles.iconBackground} />
            </View>
          </View>
        </View>

        {/* Toggle Section */}
        {isOnDuty ? (
          <LinearGradient
            colors={['#5D4FE6', '#342C80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.toggleContainer}
          >
            <Text style={styles.statusText}>Current Status</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>ON DUTY</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={isOnDuty}
                trackColor={{ false: '#999', true: '#fff' }}
                thumbColor={isOnDuty ? '#5E4AE3' : '#fff'}
                ios_backgroundColor="#999"
              />
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.toggleContainer, { backgroundColor: '#8F8F8F' }]}>
            <Text style={styles.statusText}>Current Status</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>OFF DUTY</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={isOnDuty}
                trackColor={{ false: '#fff', true: '#fff' }}
                thumbColor={isOnDuty ? '#5E4AE3' : '#8F8F8F'}
                ios_backgroundColor="#999"
              />
            </View>
          </View>
        )}

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statRow}>
              <Entypo name="wallet" size={32} color={iconColor} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.statLabel}>Today's Earnings</Text>
                <Text style={styles.statValue}>₹2,450</Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.statBox}>
            <View style={styles.statRow}>
              <Icon name="directions-car" size={20} color="#5E4AE3" />
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <Text style={styles.statValue}>4</Text>
          </View> */}
          <View style={styles.statBox}>
            <View style={styles.statRow}>
              {/* <Icon name="directions-car" size={32} color="#5E4AE3" /> */}
              <FontAwesome5 name='car' size={30} color={iconColor} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.statLabel}>Total Rides</Text>
                <Text style={styles.statValue}>4</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* body */}
      {
        !isOnDuty && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/autoLogo.png')} style={{ width: 300, height: 200 }} />
          </View>
        )
      }

      {/* <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        moveOnMarkerPress={false}>
        {renderMarkers}
        {renderRoute}
      </MapView> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flex: 1,
    marginRight: 10, // Add margin to prevent overlap with icons
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  locationText: {
    fontSize: 14,
    color: '#7A7A7A',
    fontWeight: '400',
  },
  iconContainer: {
    marginLeft: 10,
  },
  locationImage: {
    width: 40,
    height: 40,
    backgroundColor: '#E6E6FA', // Fallback background in case image doesn't load
    borderRadius: 50,
  },
  iconBackground: {
    // backgroundColor: '#E6E6FA',
    borderRadius: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: commonStyles.mainColor
  },
  toggleContainer: {
    padding: 15,
    marginHorizontal: 16,
    // marginTop: 15,
    borderRadius: 8,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginTop: 16,
    marginBottom: 16
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    width: '47%',
    // alignItems: 'center',
    // elevation: 2,
    borderWidth: 0.5,
    borderColor: '#7A7A7A'
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statLabel: {
    fontSize: 12,
    color: '#3D3D3D',
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D3D3D',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default UserHome;