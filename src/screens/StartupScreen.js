import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

//constants
import Colors from '../constants/Colors';

import { authenticate, setIsAl } from '../redux/actions/authAction'


const StartupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
     const getData = async () => {
       try {
           const userData = await AsyncStorage.getItem('userData');
           if (!userData) {
              //  navigation.navigate('Auth');
             dispatch(setIsAl())
               return;
           }
           const transformedUserData = JSON.parse(userData)
           const { token, userId, expiryDate } = transformedUserData
           const expirationDate = new Date(expiryDate)
           if (expirationDate <= new Date() || !token || !userId) {
              //  navigation.navigate('Auth');
             dispatch(setIsAl());
               return;
           }

         const expirationTime = expirationDate.getTime() - new Date().getTime();
           dispatch(authenticate(userId, token, expirationTime))
       } catch (e) {
         throw e
       }
     };
    
    useEffect(() => {
        getData()
    }, [getData])
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartupScreen
