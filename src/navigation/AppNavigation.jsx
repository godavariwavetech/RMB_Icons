import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/user/SplashScreen';
import LoginPage from '../screens/user/LoginPage';
import OTPVerificationScreen from '../screens/user/OTPVerificationScreen';
import TabNavigator from './TabNaviagator';
import RegistrationForm from '../screens/user/RegistrationForm';
import RegistrationSubmittedScreen from '../screens/user/RegistrationSubmittedScreen';
import ProfileCard from '../screens/user/ProfileCard';
import MeetingScreen from '../screens/user/MeetingScreen';
import MemberProfile from '../screens/user/MemberProfile';
import LeadsGivenScreen from '../screens/user/LeadsGivenScreen';
import AccountSettingsScreen from '../screens/user/AccountSettingsScreen';
import MyLinksScreen from '../screens/user/MyLinksScreen';
import ThankYouNoteScreen from '../screens/user/ThankYouNoteScreen';
import UsernamePasswordScreen from '../screens/user/UsernamePasswordScreen';
import MyMeetings from '../screens/user/MyMeetings';
import ReferralScreen from '../screens/user/ReferralScreen';
import NotificationsScreen from '../screens/user/NotificationsScreen';
import AttendanceScreen from '../screens/user/AttendanceScreen';
import ReferralSlipScreen from '../screens/user/ReferralSlipScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { isLogged } = useSelector((state) => state.Auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Splashscreen"}>
      <Stack.Screen name="Splashscreen" component={SplashScreen} />
      <Stack.Screen name='LoginPage' component={LoginPage} />
      <Stack.Screen name='OTPVerificationScreen' component={OTPVerificationScreen} />
      <Stack.Screen name='RegistrationForm' component={RegistrationForm} />
      <Stack.Screen name='RegistrationSubmittedScreen' component={RegistrationSubmittedScreen} />
      <Stack.Screen name='ProfileCard' component={ProfileCard} />
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name='MeetingScreen' component={MeetingScreen} />
      <Stack.Screen name='MemberProfile' component={MemberProfile} />
      <Stack.Screen name='LeadsGivenScreen' component={LeadsGivenScreen} />
      <Stack.Screen name='AccountSettingsScreen' component={AccountSettingsScreen} />
      <Stack.Screen name='MyLinksScreen' component={MyLinksScreen} />
      <Stack.Screen name='ThankYouNoteScreen' component={ThankYouNoteScreen} />
      <Stack.Screen name='UsernamePasswordScreen' component={UsernamePasswordScreen} />
      <Stack.Screen name='MyMeetings' component={MyMeetings} />
      <Stack.Screen name='ReferralScreen' component={ReferralScreen} />
      <Stack.Screen name='NotificationsScreen' component={NotificationsScreen} />
      <Stack.Screen name='AttendanceScreen' component={AttendanceScreen} />
      <Stack.Screen name='ReferralSlipScreen' component={ReferralSlipScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
