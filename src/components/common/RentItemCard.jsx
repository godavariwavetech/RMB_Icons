import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import commonStyles from '../../commonstyles/CommonStyles';

export default function RentItemCard({rentItem,handleProfileDetails,cardStyle={},imgStyle={}}) {
  return (
    <View style={[styles.card2,cardStyle]}>
        {/* <View style={styles.image}> */}
      <Image
        source={{uri: rentItem?.image}}
        resizeMode={"stretch"}
        style={[styles.image,imgStyle]}
        />
        {/* </View> */}
      <View style={[styles.textContainer,{justifyContent:'space-between'}]}>
        <Text style={[commonStyles.label,{fontSize:14}]} numberOfLines={2}>
          {rentItem.title}
        </Text>
        <Text style={[commonStyles.text4,{color:commonStyles.lightColor}]}>From {rentItem.price}</Text>
      </View>
      <TouchableOpacity onPress={handleProfileDetails} style={[styles.rentBUtton]}>
        <Text style={[styles.rentBtnTxt]}>Rent Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  // card: {
  //   width: responsiveWidth(38),
  //   height: responsiveHeight(25),
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   paddingHorizontal: 7,
  //   marginHorizontal: 5,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   shadowOffset: {width: 0, height: 2},
  //   elevation: 3,
  //   marginVertical: 3,
  // },

  card2: {
    backgroundColor: '#FFF',
    borderWidth:0.8,
    borderColor:commonStyles.strokeLines,
    borderRadius: 8,
    alignItems: 'center',
    width: 141,
    height:202,
    marginLeft: 12,
    paddingHorizontal:10,
    gap:6
  },
  image: {
    width: 140,
    height: 96,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  // title: {
  //   fontSize: 14,
  //   fontWeight: '700',
  //   textAlign: 'center',
  //   marginVertical: 5,
  // },
  // price: {
  //   fontSize: 12,
  //   color: '#64748B',
  //   fontWeight:"400"
  // },
  textContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: 'center',gap:6
  },

  rentBUtton: {
    width: 117,
    height:26,
    backgroundColor: commonStyles.blueColor,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  rentBtnTxt: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
