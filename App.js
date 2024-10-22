import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Feed from './components/Feed';
import Events from './components/Events';
import Profile from './components/Profile';
import ChatList from './components/ChatList';
import Wallet from './components/Wallet';
import { firebase } from '@react-native-firebase/app';

const Tab = createBottomTabNavigator();

const App = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Initialize Firebase
    const initializeFirebase = async () => {
      if (!firebase.apps.length) {
        await firebase.initializeApp();
      }
    };
    initializeFirebase();
  }, []);

  return (
    <>
      {/* Wrap adjacent JSX elements in a React Fragment */}
      <View>
        <Text>Firebase App Initialized</Text>
      </View>
      <NavigationContainer>
        <AuthProvider>
          {user ? (
            <Tab.Navigator>
              <Tab.Screen name="Feed" component={Feed} />
              <Tab.Screen name="Events" component={Events} />
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Chat" component={ChatList} />
              <Tab.Screen name="Wallet" component={Wallet} />
            </Tab.Navigator>
          ) : (
            // Show a login screen or redirect to Login component
            <View style={styles.centeredView}>
              <Text>Please login to continue</Text>
            </View>
          )}
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

