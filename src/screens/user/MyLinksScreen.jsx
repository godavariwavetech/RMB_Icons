// import React, { useState } from 'react';
// import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const linksData = [
//   {
//     label: 'Personal Website',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'www.rajianani.com',
//   },
//   {
//     label: 'LinkedIn',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'linkedin.com/in/rajianani',
//   },
//   {
//     label: 'Facebook',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'facebook.com/rajianani.official',
//   },
//   {
//     label: 'Instagram',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'instagram.com/rajianani',
//   },
//   {
//     label: 'Twitter/X',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'twitter.com/rajianani',
//   },
//   {
//     label: 'YouTube',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'youtube.com/@rajianani',
//   },
// ];

// export default function MyLinksScreen() {
//   const [customLinks, setCustomLinks] = useState([]);
//   const [links, setLinks] = useState(linksData);

//   const handleAddCustomLink = () => {
//     setCustomLinks([...customLinks, { label: '', url: '' }]);
//   };

//   const handleCustomChange = (index, value) => {
//     const newLinks = [...customLinks];
//     newLinks[index].url = value;
//     setCustomLinks(newLinks);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Links</Text>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {links.map((item, index) => (
//           <View key={index} style={styles.linkBox}>
//             <View style={styles.labelContainer}>
//               <Image source={item.icon} style={styles.icon} />
//               <Text style={styles.label}>{item.label}</Text>
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder={item.placeholder}
//               defaultValue={item.placeholder}
//             />
//           </View>
//         ))}

//         {customLinks.map((item, index) => (
//           <View key={index} style={styles.linkBox}>
//             <Text style={styles.label}>Custom Label + URL Field</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter custom URL"
//               value={item.url}
//               onChangeText={(value) => handleCustomChange(index, value)}
//             />
//           </View>
//         ))}

//         <TouchableOpacity onPress={handleAddCustomLink} style={styles.addNew}>
//           <Icon name="link" size={16} color="#007aff" />
//           <Text style={styles.addText}> [Add New +]</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   linkBox: {
//     marginTop: 16,
//     borderColor: '#cfd8dc',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//   },
//   labelContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 6,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   input: {
//     borderColor: '#e0e0e0',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 10,
//     fontSize: 14,
//   },
//   addNew: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     paddingLeft: 4,
//   },
//   addText: {
//     color: '#007aff',
//     fontSize: 14,
//   },
//   updateButton: {
//     backgroundColor: '#003D91',
//     padding: 14,
//     marginTop: 30,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const defaultLinks = [
//   {
//     label: 'Personal Website',
//     // icon: require('./assets/web.png'),
//     placeholder: 'www.rajianani.com',
//   },
//   {
//     label: 'LinkedIn',
//     // icon: require('./assets/linkedin.png'),
//     placeholder: 'linkedin.com/in/rajianani',
//   },
//   {
//     label: 'Facebook',
//     // icon: require('./assets/facebook.png'),
//     placeholder: 'facebook.com/rajianani.official',
//   },
//   {
//     label: 'Instagram',
//     // icon: require('./assets/instagram.png'),
//     placeholder: 'instagram.com/rajianani',
//   },
//   {
//     label: 'Twitter/X',
//     // icon: require('./assets/twitterx.png'),
//     placeholder: 'twitter.com/rajianani',
//   },
//   {
//     label: 'YouTube',
//     // icon: require('./assets/youtube.png'),
//     placeholder: 'youtube.com/@rajianani',
//   },
// ];

// const MyLinksScreen = () => {
//   const [customLinks, setCustomLinks] = useState([]);
//   const [links, setLinks] = useState(defaultLinks);

//   const handleAddCustomLink = () => {
//     setCustomLinks([...customLinks, { label: 'Custom Link', url: '' }]);
//   };

//   const handleCustomChange = (index, value) => {
//     const updated = [...customLinks];
//     updated[index].url = value;
//     setCustomLinks(updated);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Links</Text>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* {[...links, ...customLinks].map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               {item.icon && (
//                 <Image source={item.icon} style={styles.icon} />
//               )}
//               <Text style={styles.labelText}>{item.label}</Text>
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter URL"
//               value={item.url || item.placeholder}
//               onChangeText={(text) =>
//                 item.placeholder
//                   ? null
//                   : handleCustomChange(index - links.length, text)
//               }
//               editable={!item.placeholder}
//             />
//           </View>
//         ))} */}

//         {customLinks.map((item, index) => (
//   <View key={index} style={styles.card}>
//     <View style={styles.labelRow}>
//       <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
//       <Text style={styles.labelText}>{item.label}</Text>
//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={() => {
//           const updated = [...customLinks];
//           updated.splice(index, 1);
//           setCustomLinks(updated);
//         }}
//       >
//         <Icon name="trash-2" size={18} color="#FF3B30" />
//       </TouchableOpacity>
//     </View>
//     <TextInput
//       style={styles.input}
//       placeholder="Enter custom URL"
//       value={item.url}
//       onChangeText={(text) => handleCustomChange(index, text)}
//     />
//   </View>
// ))}


//         <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
//           <Icon name="plus-circle" size={18} color="#007AFF" />
//           <Text style={styles.addText}> Add New</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default MyLinksScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f7fb',
//   },
//   scroll: {
//     padding: 20,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginVertical: 16,
//     color: '#1c1c1e',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   labelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     marginRight: 8,
//   },
//   labelText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   input: {
//     backgroundColor: '#f0f2f5',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 14,
//     color: '#333',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   addText: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   updateButton: {
//     backgroundColor: '#003D91',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   deleteButton: {
//   marginLeft: 'auto',
//   padding: 4,
// },

// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const defaultLinks = [
//   {
//     label: 'Personal Website',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'www.rajianani.com',
//   },
//   {
//     label: 'LinkedIn',
//     // icon: require('./assets/linkedin.png'),
//     placeholder: 'linkedin.com/in/rajianani',
//   },
//   {
//     label: 'Facebook',
//     // icon: require('./assets/facebook.png'),
//     placeholder: 'facebook.com/rajianani.official',
//   },
//   {
//     label: 'Instagram',
//     // icon: require('./assets/instagram.png'),
//     placeholder: 'instagram.com/rajianani',
//   },
//   {
//     label: 'Twitter/X',
//     // icon: require('./assets/twitterx.png'),
//     placeholder: 'twitter.com/rajianani',
//   },
//   {
//     label: 'YouTube',
//     // icon: require('./assets/youtube.png'),
//     placeholder: 'youtube.com/@rajianani',
//   },
// ];

// const MyLinksScreen = () => {
//   const [customLinks, setCustomLinks] = useState([]);
//   const [links] = useState(defaultLinks);

//   const handleAddCustomLink = () => {
//     setCustomLinks([...customLinks, { label: 'Custom Link', url: '' }]);
//   };

//   const handleCustomChange = (index, value) => {
//     const updated = [...customLinks];
//     updated[index].url = value;
//     setCustomLinks(updated);
//   };

//   const handleDeleteCustomLink = (index) => {
//     const updated = [...customLinks];
//     updated.splice(index, 1);
//     setCustomLinks(updated);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Links</Text>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {links.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Image source={item.icon} style={styles.icon} />
//               <Text style={styles.labelText}>{item.label}</Text>
//             </View>
//             <TextInput
//               style={styles.input}
//               value={item.placeholder}
//               // editable={false}
//             />
//           </View>
//         ))}

//         {customLinks.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
//               <Text style={styles.labelText}>{item.label}</Text>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDeleteCustomLink(index)}
//               >
//                 <Icon name="trash-2" size={18} color="#FF3B30" />
//               </TouchableOpacity>
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter custom URL"
//               value={item.url}
//               onChangeText={(text) => handleCustomChange(index, text)}
//             />
//           </View>
//         ))}

//         <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
//           <Icon name="plus-circle" size={18} color="#007AFF" />
//           <Text style={styles.addText}> Add New</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default MyLinksScreen;





// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const defaultLinks = [
//   {
//     label: 'Personal Website',
//     icon: require('../../assets/bellIcon.png'),
//     placeholder: 'www.rajianani.com',
//   },
//   {
//     label: 'LinkedIn',
//     // icon: require('./assets/linkedin.png'),
//     placeholder: 'linkedin.com/in/rajianani',
//   },
//   {
//     label: 'Facebook',
//     // icon: require('./assets/facebook.png'),
//     placeholder: 'facebook.com/rajianani.official',
//   },
//   {
//     label: 'Instagram',
//     // icon: require('./assets/instagram.png'),
//     placeholder: 'instagram.com/rajianani',
//   },
//   {
//     label: 'Twitter/X',
//     // icon: require('./assets/twitterx.png'),
//     placeholder: 'twitter.com/rajianani',
//   },
//   {
//     label: 'YouTube',
//     // icon: require('./assets/youtube.png'),
//     placeholder: 'youtube.com/@rajianani',
//   },
// ];

// // ✅ Function to extract domain from URL and make it readable
// const getLabelFromUrl = (url) => {
//   try {
//     const hostname = new URL(url).hostname;
//     const parts = hostname.replace('www.', '').split('.');
//     return parts[0].charAt(0).toUpperCase() + parts[0].slice(1); // e.g., "youtube"
//   } catch (err) {
//     return 'Custom Link';
//   }
// };

// const MyLinksScreen = () => {
//   const [customLinks, setCustomLinks] = useState([]);
//   const [links] = useState(defaultLinks);

//   const handleAddCustomLink = () => {
//     setCustomLinks([...customLinks, { label: 'Custom Link', url: '' }]);
//   };

//   const handleCustomChange = (index, value) => {
//     const updated = [...customLinks];
//     updated[index].url = value;

//     const labelFromUrl = getLabelFromUrl(value);
//     updated[index].label = labelFromUrl;

//     setCustomLinks(updated);
//   };

//   const handleDeleteCustomLink = (index) => {
//     const updated = [...customLinks];
//     updated.splice(index, 1);
//     setCustomLinks(updated);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Links</Text>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {links.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Image source={item.icon} style={styles.icon} />
//               <Text style={styles.labelText}>{item.label}</Text>
//             </View>
//             <TextInput
//               style={styles.input}
//               value={item.placeholder}
//               editable={false}
//             />
//           </View>
//         ))}

//         {customLinks.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
//               <Text style={styles.labelText}>{item.label}</Text>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDeleteCustomLink(index)}
//               >
//                 <Icon name="trash-2" size={18} color="#FF3B30" />
//               </TouchableOpacity>
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter custom URL"
//               value={item.url}
//               onChangeText={(text) => handleCustomChange(index, text)}
//             />
//           </View>
//         ))}

//         <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
//           <Icon name="plus-circle" size={18} color="#007AFF" />
//           <Text style={styles.addText}> Add New</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default MyLinksScreen;





// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const defaultLinks = [
//   // {
//   //   label: 'Personal Website',
//   //   icon: require('../../assets/bellIcon.png'),
//   //   placeholder: 'www.rajianani.com',
//   // },
//   {
//     label: 'LinkedIn',
//     // icon: require('./assets/linkedin.png'),
//     placeholder: 'linkedin.com/in/rajianani',
//   },
//   {
//     label: 'Facebook',
//     // icon: require('./assets/facebook.png'),
//     placeholder: 'facebook.com/rajianani.official',
//   },
//   {
//     label: 'Instagram',
//     // icon: require('./assets/instagram.png'),
//     placeholder: 'instagram.com/rajianani',
//   },
//   {
//     label: 'Twitter/X',
//     // icon: require('./assets/twitterx.png'),
//     placeholder: 'twitter.com/rajianani',
//   },
//   {
//     label: 'YouTube',
//     // icon: require('./assets/youtube.png'),
//     placeholder: 'youtube.com/@rajianani',
//   },
// ];

// // ✅ Extract domain name from URL
// const getLabelFromUrl = (url) => {
//   try {
//     const hostname = new URL(url).hostname.replace('www.', '');
//     const name = hostname.split('.')[0];
//     return name.charAt(0).toUpperCase() + name.slice(1);
//   } catch {
//     return 'Custom Link';
//   }
// };

// const MyLinksScreen = () => {
//   const [customLinks, setCustomLinks] = useState([]);

//   //This is for update / submit
//   const handleAddCustomLink = () => {
//     setCustomLinks([...customLinks, { id: Date.now(), label: 'Custom Link', url: '' }]);
//   };

//   const handleCustomChange = (index, url) => {
//     const updatedLinks = [...customLinks];
//     updatedLinks[index] = {
//       ...updatedLinks[index],
//       url,
//       label: getLabelFromUrl(url),
//     };
//     setCustomLinks(updatedLinks);
//   };

//   //This is for  remove customized links

//   const handleDeleteCustomLink = (index) => {
//     const updatedLinks = [...customLinks];
//     updatedLinks.splice(index, 1);
//     setCustomLinks(updatedLinks);
//   };

//   const handleSubmit = () => {
//     const defaultLinkData = defaultLinks.map((item) => ({
//       label: item.label,
//       url: item.placeholder,
//       type: 'default',
//     }));

//     const customLinkData = customLinks.map((item) => ({
//       label: item.label,
//       url: item.url,
//       type: 'custom',
//     }));

//     const finalData = [...defaultLinkData, ...customLinkData];

//     console.log('Submitted Links:', finalData);
//   };



//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => { navigation.goBack() }}>
//           <Icon name='arrow-left' size={24} color={'#0A1F3C'} />
//         </TouchableOpacity>
//         <Text style={styles.headerLabel}>Member Profile</Text>
//       </View>
//       <View style={styles.hr} />
//       {/* <Text style={styles.title}>My Links</Text> */}
//       <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
//         {defaultLinks.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Image source={item.icon} style={styles.icon} />
//               <Text style={styles.labelText}>{item.label}</Text>
//             </View>
//             <TextInput
//               style={styles.input}
//               value={item.placeholder}
//               editable={false}
//             />
//           </View>
//         ))}

//         {customLinks.map((item, index) => (
//           <View key={item.id} style={styles.card}>
//             <View style={styles.labelRow}>
//               <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
//               <Text style={styles.labelText}>{item.label}</Text>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDeleteCustomLink(index)}
//               >
//                 <Icon name="trash-2" size={18} color="#FF3B30" />
//               </TouchableOpacity>
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter custom URL"
//               value={item.url}
//               onChangeText={(text) => handleCustomChange(index, text)}
//             />
//           </View>
//         ))}

//         <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
//           <Icon name="plus-circle" size={18} color="#007AFF" />
//           <Text style={styles.addText}> Add New</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
//           <Text style={styles.updateText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default MyLinksScreen;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scroll: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginVertical: 16,
//     color: '#1c1c1e',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   labelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     marginRight: 8,
//   },
//   labelText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   input: {
//     backgroundColor: '#f0f2f5',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 14,
//     color: '#333',
//   },
//   deleteButton: {
//     marginLeft: 'auto',
//     padding: 4,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   addText: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   updateButton: {
//     backgroundColor: '#003D91',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   header: {
//     // flex:1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     padding: 16,
//     alignItems: 'center'
//   },
//   headerLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#0A1F3C",
//     flex: 1,
//     textAlign: 'center'
//   },
//   hr: {
//     height: 0.5,
//     backgroundColor: "#7D7D7D",
//   },
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const defaultLinks = [
  {
    label: 'LinkedIn',
    placeholder: 'linkedin.com/in/rajianani',
  },
  {
    label: 'Facebook',
    placeholder: 'facebook.com/rajianani.official',
  },
  {
    label: 'Instagram',
    placeholder: 'instagram.com/rajianani',
  },
  {
    label: 'Twitter/X',
    placeholder: 'twitter.com/rajianani',
  },
  {
    label: 'YouTube',
    placeholder: 'youtube.com/@rajianani',
  },
];

// ✅ Extract domain name from URL
const getLabelFromUrl = (url) => {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const name = hostname.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Custom Link';
  }
};

const MyLinksScreen = ({ navigation }) => {
  const [customLinks, setCustomLinks] = useState([]);

  const handleAddCustomLink = () => {
    setCustomLinks([...customLinks, { id: Date.now(), label: 'Custom Link', url: '' }]);
  };

  const handleCustomChange = (index, url) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      url,
      label: getLabelFromUrl(url),
    };
    setCustomLinks(updatedLinks);
  };

  const handleDeleteCustomLink = (index) => {
    const updatedLinks = [...customLinks];
    updatedLinks.splice(index, 1);
    setCustomLinks(updatedLinks);
  };

  const handleSubmit = () => {
    const defaultLinkData = defaultLinks.map((item) => ({
      label: item.label,
      url: item.placeholder,
      type: 'default',
    }));

    const customLinkData = customLinks.map((item) => ({
      label: item.label,
      url: item.url,
      type: 'custom',
    }));

    const finalData = [...defaultLinkData, ...customLinkData];
    console.log('Submitted Links:', finalData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name='arrow-left' size={24} color={'#0A1F3C'} />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>My Links</Text>
      </View>
      <View style={styles.hr} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {defaultLinks.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.labelRow}>
              <Icon name="link" size={20} color="#666" style={{ marginRight: 8 }} />
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
            <TextInput
              style={styles.input}
              value={item.placeholder}
              editable={false}
            />
          </View>
        ))}

        {customLinks.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.labelRow}>
              <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
              <Text style={styles.labelText}>{item.label}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCustomLink(index)}>
                <Icon name="trash-2" size={18} color="#FF3B30" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter custom URL"
              value={item.url}
              onChangeText={(text) => handleCustomChange(index, text)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
          <Icon name="plus-circle" size={18} color="#007AFF" />
          <Text style={styles.addText}> Add New</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyLinksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0A1F3C',
  },
  input: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DADDE1',
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 4,
  },
  addText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 6,
  },
  updateButton: {
    backgroundColor: '#003D91',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DADADA',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A1F3C",
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  hr: {
    height: 0.5,
    backgroundColor: "#ccc",
  },
});
