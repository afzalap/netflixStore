import * as React from 'react';

import { StatusBar, } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//bringing in screens
import Home from './screens/Home'
import Edit from './screens/Edit'
import Add from './screens/Add'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#242424"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: "#242424"
              },
              title: "LCO Netflix App",
              headerTitleStyle: {
                color: "#00b7c7",
                textAlign: 'center',
              },
            }}
          >
          </Stack.Screen>
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerStyle: {
                backgroundColor: "#242424"
              },
              title: "LCO Netflix App",
              headerTitleStyle: {
                color: "#00b7c7",
                textAlign: 'center',
              },
              headerTintColor: "#fff",
            }}

          >
          </Stack.Screen>
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerStyle: {
                backgroundColor: "#242424"
              },
              title: "LCO Netflix App",
              headerTitleStyle: {
                color: "#00b7c7",
                textAlign: 'center',
              }
            }}

          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;