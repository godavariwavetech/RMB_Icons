
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../commonstyles/CommonStyles';
import {scale, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from '../../components/common/StarRating';
const {width} = Dimensions.get('window');

const itineraries = [
  {
    id: '1',
    title: 'Jaipur Heritage Walk',
    location: 'Rajasthan',
    days: '4 Days',
    price: '5500',
    image: require('../../assets/Goa.png'),
  },
  {
    id: '2',
    title: 'Charminar Hyderabad',
    location: 'Hyderabad',
    days: '4 Days',
    price: '5500',
    image: require('../../assets/Hyderabad.png'),
  },
  {
    id: '3',
    title: 'Kerala Backwaters Tour',
    location: 'Kerala',
    days: '4 Days',
    price: '5500',
    image: require('../../assets/Kerala.png'),
  },
  {
    id: '4',
    title: 'Goa Beach Tour',
    location: 'Goa',
    days: '4 Days',
    price: '5500',
    image: require('../../assets/Goa.png'),
  },
];
// revies
const reviews = [
  {
    user_id: 1,
    img_url: require('../../assets/profile.png'),
    rating: 3.5,
    text: 'Amazing experience with Alex. He is very friendly and knowledgeable. He is very punctual and takes care of all the needs of the group. He is very professional and has a good sense of humor. I would recommend him to everyone.',
  },
  {
    user_id: 2,
    img_url: require('../../assets/profile2.png'),
    rating: 3,
    text: 'Amazing experience with Alex. He is very friendly and knowledgeable. He is very punctual and takes care of all the needs of the group. He is very professional and has a good sense of humor. I would recommend him to everyone.',
  },
  {
    user_id: 3,
    img_url: require('../../assets/profile.png'),
    rating: 4,
    text: 'Amazing experience with Alex. He is very friendly and knowledgeable. He is very punctual and takes care of all the needs of the group. He is very professional and has a good sense of humor. I would recommend him to everyone.',
  },
  {
    user_id: 4,
    img_url: require('../../assets/profile2.png'),
    rating: 4.5,
    text: 'Amazing experience with Alex. He is very friendly and knowledgeable. He is very punctual and takes care of all the needs of the group. He is very professional and has a good sense of humor. I would recommend him to everyone.',
  },
];

// Profile Section
const ProfileSection = () => (
  <View style={styles.profileContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={{uri: 'https://randomuser.me/api/portraits/women/44.jpg'}}
        style={styles.profileImage}
      />
      <MaterialCommunityIcons
        name="check-decagram"
        size={20}
        color="#009EF7"
        style={styles.verifiedBadge}
      />
    </View>

    <Text style={styles.name}>Sarah Thompson</Text>
    <Text style={styles.title}>Expert Tour Guide</Text>

    <View style={styles.ratingContainer}>
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <FontAwesome key={index} name="star" size={16} color="#FFD700" />
        ))}
      </View>
      <Text style={styles.ratingText}>4.9 (127 reviews)</Text>
    </View>

    <View style={styles.languages}>
      <MaterialCommunityIcons name="translate" size={18} color="#555" />
      <Text style={styles.languageText}> English, Hindi, Telugu</Text>
    </View>
  </View>
);

const ItineraryCard = ({item,handleNavigation}) => (
  <View style={styles.card}>
    <View
      style={[{flexDirection: 'row', alignItems: 'center'}, commonStyles.mb12]}>
      <View style={{flex: 1}}>
        <Text
          style={[commonStyles.heading2, {color: '#18202E', lineHeight: 18}]}>
          {item.title}
        </Text>
      </View>
    </View>

    <View style={{flexDirection: 'row', gap: 12}}>
      <View style={{flex: 1}}>
        <Image
          source={item.image || require('../../assets/coverPic.png')}
          style={styles.image}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingRight: 12,
        }}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Ionicons name="calendar-outline" size={14} color="#64748B" />
          <Text style={[commonStyles.text3, {color: commonStyles.lightColor}]}>
            {item.days}
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Ionicons name="location-sharp" size={16} color="#64748B" />
          <Text
            style={[commonStyles.text3, {color: commonStyles.lightColor}]}
            numberOfLines={2}>
            {item.location}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[commonStyles.label, {color: commonStyles.mainColor}]}>
            ₹ {item.price}
          </Text>
          <Text style={[commonStyles.text3, {color: commonStyles.lightColor}]}>
            {' '}
            /person
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.editButton} onPress={handleNavigation}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text
        style={[
          commonStyles.text3,
          { color: '#FFF', lineHeight: 18, textAlign: 'center' },
        ]}
      >
        View Details
      </Text>
      <AntDesign name="arrowright" size={20} color={'#fff'} />
    </View>
  </TouchableOpacity>
</View>

  </View>
);

const FreelancerProfile = () => {
  const navigation = useNavigation();

  const handleNavigation = () =>{
    navigation.navigate('TourProfileScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={commonStyles.bgColor} barStyle={'dark-content'}
      />

      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={'#333'} />
        </TouchableOpacity>
        {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/appLogo.png')}
            style={styles.logo}
          />
        </View> */}
      </View>

      {/* Profile Section */}
      
        {/* Profile Section */}
        <ProfileSection />
        <View style={[commonStyles.hr,commonStyles.mt24, { width: '100%', marginBottom: 24 }]}></View>
        <ScrollView 
        contentContainerStyle={{ paddingBottom: 20 }} 
        showsVerticalScrollIndicator={false} bounces={false} style={{backgroundColor:commonStyles.bgColor,flex:1}}
      >
       

        {/* About Section */}
        <View style={{ marginBottom: 16 }}>
          <Text style={[commonStyles.mb16, commonStyles.text6]}>About Me</Text>
          <Text style={[{ lineHeight: 20 }, commonStyles.text3]}>
            Passionate tour guide with 8+ years of experience showcasing India's
            rich cultural heritage. Specialized in historical tours and authentic
            local experiences.
          </Text>
        </View>

        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            commonStyles.mt16,
            commonStyles.mb12,
          ]}>
          <Text style={commonStyles.label}> Available Tours</Text>
        </View>

        {/* Itinerary List */}
        <FlatList
          data={itineraries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItineraryCard item={item} handleNavigation={handleNavigation} />}
          showsVerticalScrollIndicator={false}
        />
         <View style={{marginBottom:16}}>
          <Text
            style={[
              commonStyles.heading2,
              {paddingVertical: 12, paddingLeft: 16},
            ]}>
           Latest Reviews
          </Text>

          <FlatList
            data={reviews}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingLeft: 16, paddingRight: 0}}
            renderItem={({item}) => (
              <View style={styles.reviewCard}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={item.img_url} style={styles.reviewImage} />
                  <StarRating rating={item.rating} width={20} gap={6} />
                </View>
                <Text
                  style={[
                    commonStyles.text3,
                    {marginLeft: 44, color: commonStyles.lightColor},
                  ]}
                  numberOfLines={7}>
                  {item.text}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: commonStyles.bgColor,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: commonStyles.strokeLines,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    width: wp(87),
    marginRight: 12,
    height: 180,
  },

  reviewImage: {
    width: 34,
    height: 34,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: commonStyles.mainColor,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  profileContainer: {
    alignItems: 'center',
    // paddingVertical: 20,
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 12,
    // marginTop: moderateScale(15),
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(5),
    backgroundColor: '#FFF',
    borderRadius: moderateScale(15),
    padding: scale(2),
  },
  name: {fontSize: 20, fontWeight: 'bold'},
  title: {fontSize: 14, color: '#777', marginBottom: 12},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  stars: {flexDirection: 'row', gap: 5},
  ratingText: {fontSize: 14, color: '#444'},
  languages: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  languageText: {fontSize: 14, color: '#555', marginLeft: 5},
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: commonStyles.strokeLines,
  },
  image: {width: '100%', height: 76, borderRadius: 8, resizeMode: 'cover'},
  buttonContainer: {flexDirection: 'row', marginTop: 10, gap: 12},
  editButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default FreelancerProfile;
