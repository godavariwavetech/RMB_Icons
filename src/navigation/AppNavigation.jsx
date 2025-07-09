import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import UserNavigation from './UserNavigation';
// import RentalNavigation from './RentalNavigation';
// import FreelancerNavigation from './FreelancerNavigation';
import SplashScreen from '../screens/user/SplashScreen';
// import GetStartedScreen from '../screens/user/GetStartedScreen';
// import LoginSignUpPage from '../screens/user/LoginSignUpPage';
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
// import ReferralSlipScreen from '../screens/user/ReferralSlipScreen';
// import RegistrationForm from '../screens/user/RegistrationForm';
// import DriverRegistrationScreen from '../screens/user/DriverRegistrationScreen';
// import VehicleRegistrationScreen from '../screens/user/VehicleRegistrationScreen';
// import RideHistoryDetailsScreen from '../screens/user/RideHistoryDetailsScreen';
const Stack = createStackNavigator();

const AppNavigation = () => {
  const { isLogged } = useSelector((state) => state.Auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ "Splashscreen"}>
      <Stack.Screen name="Splashscreen" component={SplashScreen} />
      {/* <Stack.Screen name="GetStartedScreen" component={GetStartedScreen}  /> */}
      {/* <Stack.Screen name="LoginSignUpPage" component={LoginSignUpPage} /> */}
      <Stack.Screen name='LoginPage' component={LoginPage} />
      <Stack.Screen name='OTPVerificationScreen' component={OTPVerificationScreen} />
      <Stack.Screen name='RegistrationForm' component={RegistrationForm} />
      {/* dummy */}
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
      <Stack.Screen  name='MyMeetings' component={MyMeetings} />
      <Stack.Screen name='ReferralScreen' component={ReferralScreen} />
      <Stack.Screen name='NotificationsScreen' component={NotificationsScreen} />
      <Stack.Screen name='AttendanceScreen' component={AttendanceScreen} />
      <Stack.Screen name='ReferralSlipScreen' component={ReferralSlipScreen} />
      {/* <Stack.Screen name='RefrralSlipScreen' component={ReferralSlipScreen} /> */}
      {/* <Stack.Screen name='DriverRegistrationScreen' component={DriverRegistrationScreen} />
      <Stack.Screen name='VehicleRegistrationScreen' component={VehicleRegistrationScreen} />
      <Stack.Screen name='RideHistoryDetailsScreen' component={RideHistoryDetailsScreen} /> */}

    </Stack.Navigator>
  );
};

// const MainNavigation = ({ userRole }) => {
//   {
//     switch (userRole) {
//       case 1:
//         return <UserNavigation />;
//       case 2:
//         return <RentalNavigation />;
//       case 3:
//         return <FreelancerNavigation />;
//       default:
//         return <></>;
//     }
//   }
// };

// const AppNavigation = () => {
//   const { token, userRole } = useSelector((state) => state.Auth);
//   return token ? <MainNavigation userRole={userRole} /> : <AuthNavigation />;

// };

export default AppNavigation;
