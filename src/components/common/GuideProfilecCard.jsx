import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions"
import commonStyles from '../../commonstyles/CommonStyles';
import StarIcon from '../../screens/user/svgs/StarIcon';

const profileFallback = 'data:image/jpeg;base64,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'

const GuideProfilecCard = ({cardDetails,handleProfileDetails,cardStyle=[]}) => {
  return (
    <View style={[styles.card,cardStyle]}>
      <Image
        source={{ uri: cardDetails?.profileImage || profileFallback }}
        style={styles.profileImage}
      />
      <Text style={[commonStyles.label,{fontSize:14}]} numberOfLines={1}>{cardDetails?.name}</Text>
      <Text style={[commonStyles.text4,{color:commonStyles.lightColor}]} numberOfLines={1}>{cardDetails?.profiency}</Text>
      <View style={styles.ratingContainer}>
        {/* <Text style={styles.star}>⭐</Text> */}
        <StarIcon />
        <Text style={[commonStyles.label,{fontSize:12}]}>{cardDetails?.rating}</Text>
        <Text style={[commonStyles.text4,{color:commonStyles.lightColor}]}>({cardDetails?.toatlReview})</Text>
      </View>
      <Text style={[commonStyles.text4,{color:commonStyles.lightColor}]} numberOfLines={1}>{cardDetails?.location}</Text>
      <TouchableOpacity onPress={handleProfileDetails} style={[styles.button]}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth:0.8,
    borderColor:commonStyles.strokeLines,
    backgroundColor: 'FFF',
    borderRadius: 6,
    alignItems: 'center',
    width:141,
    height:216,
    justifyContent:"space-evenly",
    marginLeft:12,
    padding:12,
gap:4
  },
  profileImage: {
    width: 71.5,

    height: 71.5,
    borderRadius: 40,
  },
  // name: {
  //   fontSize: 14,
  //   fontWeight: '700',
  // },
  // category: {
  //   fontSize: 12,
  //   color: '#64748B',
  //   fontWeight:"400"
  // },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:3
  },
  star: {
    fontSize: 14,
  },
  // rating: {
  //   fontSize: 12,
  //   fontWeight: '700',
  //   color:"#000"
  // },
  // reviewCount: {
  //   fontSize: 14,
  //   color: 'gray',
  // },
  // location: {
  //   fontSize: 12,
  //   color: '#64748B',
  //   fontWeight:"400"
  // },
  button: {
    width:117,
    height:26,
    backgroundColor: '#2563EB',
    borderRadius: 5,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GuideProfilecCard;
