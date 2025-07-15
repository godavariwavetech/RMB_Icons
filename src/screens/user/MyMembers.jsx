
import { StyleSheet, Text, View, FlatList, Image, Alert, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';
import Loader from '../../components/loader';



const MyMembers = () => {
    const [allMembers, setAllMembers] = useState([]);
     const navigation = useNavigation();
     const [loading,setLoading] = useState(false)

    useEffect(() => {
        getAllMembers();
    }, []);

    const getAllMembers = async () => {
        try {
            setLoading(true);
            const resp = await api.get('gettotalregisterd');
            const data = resp.data.data || [];
            if (resp.data.status === 200) {
                setAllMembers(data);
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert("Error", "Something went wrong!");
        } finally{
            setLoading(false);
        }
    };

    // const renderMember = ({ item }) => (
    //     <View style={styles.card}>
    //         <Image
    //             source={{ uri: item.rnb_customer_photo }}
    //             style={styles.profileImage}
    //         />
    //         <View style={styles.infoContainer}>
    //             <Text style={styles.name}>{item.rnb_customer_name ?? 'N/A'}</Text>
    //             <Text style={styles.details}>{item.company_name ?? 'N/A'}</Text>
    //             <Text style={styles.details}>{item.designation ?? 'N/A'}</Text>
    //             <Text style={styles.phone}>{item.rnb_customer_phone_number ?? 'N/A'}</Text>
    //             <Text style={styles.category}>Category: {item.business_category ?? 'N/A'}</Text>
    //         </View>
    //     </View>
    // );

    const renderMember = ({ item }) => (
    <View style={styles.card}>
        <Image
            source={{ uri: item.rnb_customer_photo }}
            style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.rnb_customer_name ?? 'N/A'}</Text>
            <Text style={styles.designation}>{item.designation ?? 'N/A'}</Text>
            <Text style={styles.company}>{item.company_name ?? 'N/A'}</Text>
            <Text style={styles.phone}>{item.rnb_customer_phone_number ?? 'N/A'}</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.business_category ?? 'N/A'}</Text>
            </View>
        </View>
    </View>
);

    if(loading){
        return(
            <Loader size='large' color={commonStyles.mainColor} />
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" size={24} color={'#0A1F3C'} />
                            </TouchableOpacity>
                            <Text style={styles.headerLabel}>My Members</Text>
                        </View>
                        <View style={styles.hr} />

            <View style={{flex:1,paddingHorizontal:16}}>
            <FlatList
                data={allMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMember}
                contentContainerStyle={{ paddingBottom: 20,paddingTop:10}}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
    );
};

export default MyMembers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // padding: 16,
    },
        header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0A1F3C",
        flex: 1,
        textAlign: 'center'
    },
    hr: {
        height: 0.5,
        backgroundColor: "#ccc",
    },
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        // elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        borderWidth:1,
        borderColor:commonStyles.mainColor
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#ccc',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    phone: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    details: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    category: {
        fontSize: 13,
        color: '#999',
        marginTop: 2,
    },






   //latest
    
    card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
},

profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#eaeaea',
},

name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1c',
},

designation: {
    fontSize: 14,
    color: '#3b3b3b',
    marginTop: 2,
},

company: {
    fontSize: 13,
    color: '#6c6c6c',
    marginTop: 2,
},

phone: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
},

badge: {
    marginTop: 6,
    backgroundColor: '#E6F4F1',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
},

badgeText: {
    fontSize: 12,
    color: '#1F847E',
    fontWeight: '500',
},

});
