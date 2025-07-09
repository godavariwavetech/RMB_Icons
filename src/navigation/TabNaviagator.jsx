import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, View } from "react-native";
// import BookingsScreen from "../screens/user/BookingsScreen";
import HomeScreen from "../screens/user/HomeScreen";
// import ProfileScreen from "../screens/user/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import commonStyles from "../commonstyles/CommonStyles";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserHome from "../screens/UserHome";
import { useEffect, useState } from "react";
// import MyEarningsScreen from "../screens/user/MyEarningsScreen";
// import IncentiveScreen from "../screens/user/IncentiveScreen";
// import HistoryScreen from "../screens/user/HistoryScreen";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  //This is for avoiding bottom tabs while opening text input
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    // <NavigationContainer>
    <KeyboardAvoidingView style={{ flex: 1 }}
      enabled
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarPressColor: "transparent", // Removes ripple effect
          tabBarPressOpacity: 1, // Ensures no dimming effect
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={null} // Disable ripple effect on Android
              style={({ pressed }) => [
                props.style,
                { opacity: pressed ? 1 : 1 }, // Set opacity to 1 to remove the press effect
              ]}
            />
          ),
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let IconComponent;

            if (route.name === "Home") {
              iconName = 'home';
              IconComponent = Entypo;
              // return <Entypo name='home' size={size} color={color} />
            }
             else if (route.name === "Home") {
              iconName = "wallet";
              IconComponent = Entypo;
            }
            //  else if (route.name === "IncentiveScreen") {
            //   iconName = "trophy";
            //   IconComponent = FontAwesome;
            // }
             else if (route.name === "Home") {
              iconName = "history";
              IconComponent = MaterialIcons;
            }

            // else if (route.name === "Bookings") {
            //   iconName = 'calendar-check-o';
            //   IconComponent = FontAwesome;
            //   // return <FontAwesome name='calendar-check-o' size={size} color={color} />
            // } 
            else if (route.name === "Home") {
              iconName = 'person-circle-outline';
              // IconComponent = Feather;
              IconComponent = Ionicons
              // return <Feather name='user' size={size} color={color} />
            }

            return (
              <View style={{ alignItems: 'center' }}>
                {focused && <View style={styles.activeTabLine} />}
                <IconComponent name={iconName} size={size} color={color} />
              </View>
            )
            // return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: commonStyles.mainColor,
          tabBarInactiveTintColor: "#64748B",
          tabBarStyle: isKeyboardVisible
            ? { display: "none" } // Hide tab bar when keyboard is visible
            : { backgroundColor: "#fff", paddingBottom: 5, height: 60, borderTopWidth: 1, borderColor: commonStyles.mainColor, },
          // tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5, height: 60 ,borderTopWidth:1,borderColor:commonStyles.mainColor},
          tabBarLabelStyle: { fontSize: 12, fontWeight: 400, marginTop: 4 },
        })}
      >
        <Tab.Screen name="Home" component={UserHome} options={{ headerShown: false }} />
        {/* <Tab.Screen name="Bookings" component={BookingsScreen} options={{headerShown:false}} /> */}
        <Tab.Screen name='Home' component={UserHome} options={{ headerShown: false, }} />
        {/* <Tab.Screen name='IncentiveScreen' component={IncentiveScreen} options={{ headerShown: false }} /> */}
        <Tab.Screen name='Home' component={UserHome} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={UserHome} options={{ headerShown: false,}} />              {/*tabBarShowLabel:false  */}
      </Tab.Navigator>
    </KeyboardAvoidingView>
    // </NavigationContainer>
  )
}


export default TabNavigator;

const styles = StyleSheet.create({
  activeTabLine: {
    width: 30,
    height: 3,
    backgroundColor: commonStyles.mainColor,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    position: "absolute",
    top: -7
  },
})



//gpt



// import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, View } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Entypo from "react-native-vector-icons/Entypo";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import UserHome from "../screens/UserHome";
// import BookingsScreen from "../screens/user/BookingsScreen";
// import ProfileScreen from "../screens/user/ProfileScreen";
// import { useEffect, useState } from "react";

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setIsKeyboardVisible(true);
//     });

//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setIsKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} enabled>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarShowLabel: false,
//           tabBarStyle: isKeyboardVisible
//             ? { display: "none" }
//             : styles.tabBar,
//           tabBarButton: (props) => (
//             <Pressable {...props} android_ripple={null} style={props.style} />
//           ),
//           tabBarIcon: ({ focused }) => {
//             let iconName;
//             let IconComponent;

//             if (route.name === "Home") {
//               iconName = "home";
//               IconComponent = Entypo;
//             } else if (route.name === "Bookings") {
//               iconName = "calendar-check-o";
//               IconComponent = FontAwesome;
//             } else if (route.name === "Profile") {
//               iconName = "user";
//               IconComponent = Feather;
//             }

//             return (
//               <View style={[styles.iconContainer, focused && styles.activeIcon]}>
//                 <IconComponent name={iconName} size={22} color={focused ? "#000" : "#fff"} />
//               </View>
//             );
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={UserHome} options={{ headerShown: false }} />
//         <Tab.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//       </Tab.Navigator>
//     </KeyboardAvoidingView>
//   );
// };

// export default TabNavigator;

// const styles = StyleSheet.create({
//   tabBar: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#2962ff",
//     flexDirection: "row",
//     // justifyContent: "space-around",
//     alignItems: "center",width:'70%',
//   },
//   iconContainer: {
//     padding: 10,
//     borderRadius: 50,
//   },
//   activeIcon: {
//     backgroundColor: "#fff",
//   },
// });



//3rd

// const User=()=><View><Text>User</Text></View>

// import React, { useEffect, useState } from "react";
// import { Dimensions, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, View, Text } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Entypo from "react-native-vector-icons/Entypo";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import Octicons from "react-native-vector-icons/Octicons";
// import UserHome from "../screens/UserHome";
// import BookingsScreen from "../screens/user/BookingsScreen";
// import ProfileScreen from "../screens/user/ProfileScreen";
// import { translate } from "../config/i18n";
// import commonStyles from "../commonstyles/CommonStyles";
// import MyEarningsScreen from "../screens/user/MyEarningsScreen";
// import IncentiveScreen from "../screens/user/IncentiveScreen";
// import HistoryScreen from "../screens/user/HistoryScreen";



// const Tab = createBottomTabNavigator();
// const { width } = Dimensions.get("window");
// const TabNavigator = () => {
//   // Hide bottom tab when keyboard is open
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'red' }} enabled>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarShowLabel: false, // Hide text labels
//           tabBarStyle: isKeyboardVisible
//             ? { display: "none" }
//             : styles.tabBarContainer,

//           tabBarButton: (props) => {
//             const isFirst = route.name === "Home";
//             const isLast = route.name === "Profile";
//             return (
//               <Pressable
//                 {...props}
//                 android_ripple={null} // Remove ripple effect on Android
//                 style={({ pressed }) => [props.style, { opacity: pressed ? 1 : 1 },
//                 isFirst && styles.firstTab,
//                 isLast && styles.lastTab,
//                 ]}
//               />)
//           },

//           tabBarIcon: ({ focused }) => {
//             let iconName;
//             let IconComponent;

//             if (route.name === "Home") {
//               iconName = "home";
//               IconComponent = Entypo;
//             }
//             //  else if (route.name === "Bookings") {
//             //   iconName = "calendar-check-o";
//             //   IconComponent = FontAwesome;
//             // }
//             else if (route.name === "MyEarningsScreen") {
//               iconName = "wallet";
//               IconComponent = Entypo;
//             }
//              else if (route.name === "IncentiveScreen") {
//               iconName = "trophy";
//               IconComponent = FontAwesome;
//             }
//              else if (route.name === "HistoryScreen") {
//               iconName = "history";
//               IconComponent = Octicons;
//             }
//              else if (route.name === "Profile") {
//               iconName = "user";
//               IconComponent = Feather;
//             }
//             // else if (route.name === "User") {
//             //   iconName = "user";
//             //   IconComponent = Feather;
//             // }

//             return (
//               <View style={[styles.iconWrapper, focused ? styles.activeTab : styles.inactiveTab]}>
//                 <IconComponent
//                   name={iconName}
//                   size={22}
//                   color={focused ? "#000" : "#FFF"}
//                 />
//               </View>
//             );
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={UserHome} options={{ headerShown: false }} />
//         {/* <Tab.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: false }} /> */}
//         <Tab.Screen name='MyEarningsScreen' component={MyEarningsScreen} options={{ headerShown: false }} />
//         <Tab.Screen name='IncentiveScreen' component={IncentiveScreen} options={{ headerShown: false }} />
//         <Tab.Screen name='HistoryScreen' component={HistoryScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//         {/* <Tab.Screen name="User" component={User} options={{ headerShown: false }} /> */}
//       </Tab.Navigator>
//     </KeyboardAvoidingView>
//   );
// };

// export default TabNavigator;

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     backgroundColor: commonStyles.mainColor,
//     position: "absolute",
//     bottom: 5,

//     height: 'auto',
//     paddingVertical: 'auto',
//     borderRadius: 50,
//     flexDirection: "row",
//     marginHorizontal: 'auto',
//     justifyContent: 'space-between',
//     alignItems: "center",
//     width: '70%',
//     // paddingBottom:30,
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingHorizontal: 10,
//     alignSelf: 'center',
//     transform: [{ translateX: (width * 0.15) }],
//   },
//   activeTab: {
//     backgroundColor: "#fff",
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     // margin:100
//   },
//   inactiveTab: {
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   firstTab: {
//     marginRight: 'auto'
//   }, lastTab: {
//     marginLeft: 'auto'
//   }
// });
