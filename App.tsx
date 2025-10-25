import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ARViewScreen from './src/screens/ARViewScreen';
import MoleculeLibraryScreen from './src/screens/MoleculeLibraryScreen';

export type RootStackParamList = {
  Home: undefined;
  ARView: {moleculeId?: string};
  Library: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1a1a2e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Molecular AR Viewer'}}
            />
            <Stack.Screen
              name="ARView"
              component={ARViewScreen}
              options={{title: 'AR View'}}
            />
            <Stack.Screen
              name="Library"
              component={MoleculeLibraryScreen}
              options={{title: 'Molecule Library'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
