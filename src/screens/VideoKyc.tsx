import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraDevice,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from "moment"
import commonStyles from '../commonstyles/CommonStyles';
import EscapyeAdventureLogo from './user/svgs/EscapyeAdventureLogo';

const screenWidth = Dimensions.get('window').width;

const VideoKyc: React.FC<{navigation: {goBack: () => void}}> = ({
  navigation,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [media, setMedia] = useState<{path: string; type: string} | null>(null);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'front',
  );
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const devices = useCameraDevice(cameraPosition);
  const cameraRef = useRef<Camera | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true)
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();

      setHasCameraPermission(cameraPermission === 'granted');
      setHasMicrophonePermission(microphonePermission === 'granted');

      if (cameraPermission !== 'granted' || microphonePermission !== 'granted') {
        setPermissionError(
          cameraPermission !== 'granted' && microphonePermission !== 'granted'
            ? 'Both camera and microphone permissions are denied.'
            : cameraPermission !== 'granted'
            ? 'Camera permission is denied.'
            : 'Microphone permission is denied.',
        );
      } else {
        setPermissionError(null);
      }

      setTimeout(() => {
        setIsCameraReady(true);
        setLoading(false)
      }, 500);
    };

    getPermissions();

    return () => {
      if (isRecording && cameraRef.current) {
        cameraRef.current.stopRecording();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handlePermissionDenied = () => {
    Alert.alert(
      'Permission Denied',
      'We need access to your camera and microphone to continue. Please enable them in your device settings.',
      [
        {
          text: 'Go to Settings',
          onPress: () => Linking.openSettings(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const startRecording = async () => {
    setRecordTime(0)
    try {
      if (cameraRef.current) {
        setIsRecording(true);
        setRecordTime(0);

        timerRef.current = setInterval(() => {
          setRecordTime(prev => prev + 1);
        }, 1000);

        cameraRef.current.startRecording({
          fileType: 'mp4',
          videoCodec: 'h264',
          onRecordingFinished: video => {
            setMedia({path: video.path, type: 'video'});
            setIsRecording(false);
            clearInterval(timerRef.current as NodeJS.Timeout);
          },
          onRecordingError: error => {
            setIsRecording(false);
            clearInterval(timerRef.current as NodeJS.Timeout);
          },
        });
      }
    } catch (err) {
      console.log('Error during recording:', err);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try{
        await cameraRef.current.stopRecording();

      }catch(e){
        console.log(e)
      }
      setIsRecording(false);
    }
  };

  const switchCamera = () => {
    setCameraPosition(cameraPosition === 'front' ? 'back' : 'front');
    
  };

  const handleRetake = () => {
    setRecordTime(0)
    setMedia(null);
  };

  if (permissionError) {
    return (
      <View style={{flex: 1,}}>
        <View style={{flexDirection: 'row', padding: 12, width: '100%'}}>
          <TouchableOpacity style={{padding: 6}} onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={25} color={'#333'} />
          </TouchableOpacity>
          <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../assets/appLogo.png')} style={styles.logo} />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.errorText}>{permissionError}</Text>
          <TouchableOpacity onPress={handlePermissionDenied} style={styles.button}>
            <Text style={styles.buttonText}>Grant Permissions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const formatTime = (seconds: number): string => {
    return moment.utc(seconds * 1000).format('mm:ss');
  };


  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={styles.header}>
          <TouchableOpacity style={{padding: 6}} onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={25} color={'#333'} />
          </TouchableOpacity>
          {/* <Image source={require('../assets/appLogo.png')} style={styles.logo} /> */}
          <View style={{flex:1,alignItems:'center',alignSelf:'center'}}>
            <EscapyeAdventureLogo />
          </View>
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}

      {hasCameraPermission && hasMicrophonePermission && devices && isCameraReady && !media?.path && (
        <View style={styles.cameraContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.instructionText}>Read aloud and show your ID clearly.</Text>
            <Text style={styles.sampleText}>
              In the heart of the forest, the sound of rustling leaves was the only noise that filled the air.
            </Text>
          </View>
          <Camera
            key={cameraPosition}
            style={styles.camera}
            device={devices}
            isActive={true}
            ref={cameraRef}
            videoStabilizationMode="auto"
            video={true}
            audio={true}
          />
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={!isRecording ? startRecording : stopRecording} style={styles.playButton}>
              <MaterialCommunityIcons name={!isRecording ? 'circle' : 'square-rounded'} size={!isRecording?75:55} color={'red'} />
              { isRecording && <Text style={styles.timerText}>{formatTime(recordTime)}</Text>}
            </TouchableOpacity>
           {!isRecording && <TouchableOpacity onPress={switchCamera} style={styles.switchButton}>
              <Ionicons name={'sync'} size={34} color={'#fff'} />
            </TouchableOpacity>}
          </View>
        </View>
      )}

      {media?.path && (
        <View style={styles.videoPlayerContainer}>
          <Video source={{uri: media.path}} style={styles.videoPlayer} controls={true} resizeMode="stretch" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRetake} style={[styles.submitButton, styles.retakeButton]}>
              <Text style={[styles.submitText, styles.retakeText]}>Re-Take</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  textContainer: {
    height: '17%',
    paddingHorizontal: 17,
    paddingVertical: 5,
    backgroundColor:'#f8fafc',
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  sampleText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    height: '25%',
    width: screenWidth,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  playButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  switchButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '15%',
  },
  videoPlayerContainer: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '7%',
  },
  submitButton: {
    width: '45%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  retakeButton: {
    backgroundColor: '#fff',
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  retakeText: {
    color: '#2563EB',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: { flexDirection: 'row', padding: 12, width: '100%',justifyContent:"center",alignItems:"center",backgroundColor:'#f8fafc' },
  logo: { width: 150, height: 40, alignSelf: 'center', resizeMode: 'contain',flex:1 },
  timerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 90,
  },
});

export default VideoKyc;
