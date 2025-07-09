import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView
} from "react-native";
import commonStyles from "../../commonstyles/CommonStyles";

const screenWidth = Dimensions.get("window").width;
if (typeof global !== 'undefined' && global) {
  global.parentScrollRef = null;
}

const ScrollableTabs = ({ tabs = [], screens = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);
  const tabScrollRef = useRef(null);
  useEffect(() => {
    if (typeof global !== 'undefined' && global) {
      global.parentScrollRef = scrollRef;
    }
    
    // Clean up when component unmounts
    return () => {
      if (typeof global !== 'undefined' && global) {
        global.parentScrollRef = null;
      }
    };
  }, []);

  const handleTabPress = (index) => {
    setSelectedIndex(index);
    scrollRef.current?.scrollTo({ x: screenWidth * index, animated: true });
     tabScrollRef.current?.scrollTo({ 
      x: index * 100 - screenWidth / 2 + 50, // Adjust as needed
      animated: true 
    });
     const tabWidth = 100; // Approximate width of each tab
    const centerPosition = index * tabWidth - (screenWidth / 2) + (tabWidth / 2);
    tabScrollRef.current?.scrollTo({ 
      x: Math.max(0, centerPosition),
      animated: true 
    });
  };

  const handleScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setSelectedIndex(index);
      const tabWidth = 100; // Approximate width of each tab
    const centerPosition = index * tabWidth - (screenWidth / 2) + (tabWidth / 2);
    tabScrollRef.current?.scrollTo({ 
      x: Math.max(0, centerPosition),
      animated: true 
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Tabs */}
      {/* <View style={styles.tabBarcontainer}> */}
        {/* <ScrollView
        ref={tabScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      > */}
        <View style={styles.tabBar}>

      {/* <View style={styles.tabBar}> */}
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => handleTabPress(index)}>
            <View style={[styles.tabcontainer]}>
            <Text style={selectedIndex == index ? styles.activeTab : styles.inactiveTab}>
              {tab}
            </Text>
            {selectedIndex == index && <View style={styles.underline} />}
            </View>

          </TouchableOpacity>
        ))}
        </View>

      {/* </View> */}
      {/* </ScrollView> */}
      {/* </View> */}
                <View style={styles.horizontalRuler} />

      {/* Scrollable Screens */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {screens.map((Component, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <Component isActive={selectedIndex === index} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 tabBar: {
  flexDirection: "row",
  paddingVertical: 12,
  paddingHorizontal: 8,
//   backgroundColor: "#ffffff"
},
  tabBar: {
    flexDirection: "row",
    // paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
        // backgroundColor: "#F8FAFC",
        // paddingBottom:5
    // color:'#000'
  },
  activeTab: {
       fontFamily: "HankenGroteskBold",
    color: commonStyles.mainColor,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.15,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 0,
    fontSize:16,
    fontWeight:'700'
  },
  inactiveTab: {
     fontSize: 16,
    color: commonStyles.lightColor,
    // marginHorizontal: 20,
    fontFamily: "HankenGroteskSemiBold",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontWeight: '600'
  },
   horizontalRuler: {
    height: 1, // Thickness of the ruler
    backgroundColor: "#ddd", // Color of the ruler
    // marginTop: -10, // Space between the tabs and the ruler
    width: "100%", // Full-width ruler
    // marginTop:4
  },
 tabcontainer: {
  alignItems: "center",
  justifyContent:'space-between',
  paddingHorizontal: 8,
//   paddingVertical: 6,
paddingTop:8,
  marginHorizontal: 4,
}
, underline: {
    width: "100%",
    height: 2,
    backgroundColor: commonStyles.mainColor,
    marginTop: 7,
    borderRadius: 20
  },
    underline: {
      marginTop: 12,
      borderWidth:1,
      width:'95%',
      borderColor:commonStyles.mainColor,
      borderTopLeftRadius:3,
      borderTopRightRadius:3
    },
});

export default ScrollableTabs;
