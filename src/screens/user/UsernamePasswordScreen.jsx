// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     StatusBar,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// const UsernamePasswordScreen = ({ navigation }) => {
//     const [currentUsername, setCurrentUsername] = useState('');
//     const [newUsername, setNewUsername] = useState('');
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     // Add these states:
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);


//     const handleUpdate = () => {
//         console.log({
//             currentUsername,
//             newUsername,
//             currentPassword,
//             newPassword,
//             confirmPassword,
//         });
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Feather name="arrow-left" size={24} color="#0A1F3C" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerText}>Username & Password</Text>
//                 <View style={{ width: 24 }} /> {/* For centering headerText */}
//             </View>

//             <View style={styles.divider} />
//             <View style={{ padding: 16 }}>

//                 {/* Username Section */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Username</Text>
//                     <TextInput
//                         placeholder="Current Username"
//                         style={styles.input}
//                         placeholderTextColor="#888"
//                         value={currentUsername}
//                         onChangeText={setCurrentUsername}
//                     />
//                     <TextInput
//                         placeholder="New Username"
//                         style={styles.input}
//                         placeholderTextColor="#888"
//                         value={newUsername}
//                         onChangeText={setNewUsername}
//                     />
//                 </View>

//                 {/* Password Section */}
//                 {/* <View style={styles.section}>
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           placeholder="Current Password"
//           style={styles.input}
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={currentPassword}
//           onChangeText={setCurrentPassword}
//         />
//         <TextInput
//           placeholder="New Password"
//           style={styles.input}
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={newPassword}
//           onChangeText={setNewPassword}
//         />
//         <TextInput
//           placeholder="Confirm New Password"
//           style={styles.input}
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />
//       </View> */}

//                 {/* Password Section */}
//                 <View style={styles.section}>
//                     <Text style={styles.label}>Password</Text>

//                     {/* Current Password */}
//                     <View style={styles.passwordWrapper}>
//                         <TextInput
//                             placeholder="Current Password"
//                             style={styles.input}
//                             placeholderTextColor="#888"
//                             secureTextEntry={!showCurrentPassword}
//                             value={currentPassword}
//                             onChangeText={setCurrentPassword}
//                         />
//                         <TouchableOpacity
//                             style={styles.eyeIcon}
//                             onPress={() => setShowCurrentPassword(!showCurrentPassword)}
//                         >
//                             <Feather
//                                 name={showCurrentPassword ? 'eye' : 'eye-off'}
//                                 size={20}
//                                 color="#888"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     {/* New Password */}
//                     <View style={styles.passwordWrapper}>
//                         <TextInput
//                             placeholder="New Password"
//                             style={styles.input}
//                             placeholderTextColor="#888"
//                             secureTextEntry={!showNewPassword}
//                             value={newPassword}
//                             onChangeText={setNewPassword}
//                         />
//                         <TouchableOpacity
//                             style={styles.eyeIcon}
//                             onPress={() => setShowNewPassword(!showNewPassword)}
//                         >
//                             <Feather
//                                 name={showNewPassword ? 'eye' : 'eye-off'}
//                                 size={20}
//                                 color="#888"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     {/* Confirm Password */}
//                     <View style={styles.passwordWrapper}>
//                         <TextInput
//                             placeholder="Confirm New Password"
//                             style={styles.input}
//                             placeholderTextColor="#888"
//                             secureTextEntry={!showConfirmPassword}
//                             value={confirmPassword}
//                             onChangeText={setConfirmPassword}
//                         />
//                         <TouchableOpacity
//                             style={styles.eyeIcon}
//                             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                         >
//                             <Feather
//                                 name={showConfirmPassword ? 'eye' : 'eye-off'}
//                                 size={20}
//                                 color="#888"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.passwordWrapper}>
//   <TextInput
//     placeholder="New Password"
//     style={styles.input}
//     placeholderTextColor="#888"
//     secureTextEntry={!showNewPassword}
//     value={newPassword}
//     onChangeText={setNewPassword}
//   />
//   <TouchableOpacity
//     style={styles.eyeIcon}
//     onPress={() => setShowNewPassword(!showNewPassword)}
//   >
//     <Feather
//       name={showNewPassword ? 'eye' : 'eye-off'}
//       size={20}
//       color="#888"
//     />
//   </TouchableOpacity>
// </View>

//                 </View>


//                 {/* Update Button */}
//                 <TouchableOpacity style={styles.button} onPress={handleUpdate}>
//                     <Text style={styles.buttonText}>Update</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default UsernamePasswordScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         // padding: 16,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 16,
//     },
//     headerText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#0A1F3C',
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#ccc',
//         marginBottom: 20,
//     },
//     section: {
//         marginBottom: 24,
//     },
//     label: {
//         fontWeight: 'bold',
//         fontSize: 14,
//         marginBottom: 8,
//         color: '#000',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#94ABCB',
//         borderRadius: 8,
//         padding: 12,
//         marginBottom: 12,
//         fontSize: 15,
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#17498F',
//         paddingVertical: 14,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     passwordWrapper: {
//   position: 'relative',
//   marginBottom: 12,
// },
// eyeIcon: {
//   position: 'absolute',
//   right: 10,
// // left:-30,
//   top: 14,
//   zIndex:10
// },

// });




import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';

const UsernamePasswordScreen = ({ navigation }) => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const storedUsername = 'Mahesh123';
  const storedPassword = 'Mahesh@99';

  const handleUpdate = () => {
    let newErrors = {};

    if (!currentUsername) newErrors.currentUsername = 'Current username is required';
    if (!newUsername) newErrors.newUsername = 'New username is required';
    if (!currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm new password';

    if (currentUsername && currentUsername !== storedUsername)
      newErrors.currentUsername = 'Incorrect current username';

    if (currentPassword && currentPassword !== storedPassword)
      newErrors.currentPassword = 'Incorrect current password';

    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (newPassword && newPassword.length < 6)
      newErrors.newPassword = 'Password must be at least 6 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Updated:', {
        newUsername,
        newPassword,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#0A1F3C" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Username & Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.divider} />
      <View style={{ padding: 16 }}>

        {/* Username Section */}
        <Text style={styles.label}>Username</Text>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Current Username"
            placeholderTextColor="#888"
            value={currentUsername}
            onChangeText={setCurrentUsername}
            style={styles.input}
          />
          {errors.currentUsername && <Text style={styles.errorText}>{errors.currentUsername}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="New Username"
            placeholderTextColor="#888"
            value={newUsername}
            onChangeText={setNewUsername}
            style={styles.input}
          />
          {errors.newUsername && <Text style={styles.errorText}>{errors.newUsername}</Text>}
        </View>

        {/* Password Section */}
        <Text style={styles.label}>Password</Text>

        {/* Current Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#888"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Feather
                name={showCurrentPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#888"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Feather
                name={showNewPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        {/* Update Button */}
        <TouchableOpacity style={commonStyles.blueButton} onPress={handleUpdate}>
          <Text style={commonStyles.blueButtonText}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default UsernamePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A1F3C',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#94ABCB',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 15,
    color: '#000',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 13,
  },
});

