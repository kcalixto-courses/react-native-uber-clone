import "react-native-gesture-handler"
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from "@react-navigation/stack";
import { store } from './store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MapScreen from "./screens/MapScreen";
import EatsScreen from "./screens/EatsScreen";

export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider >
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen" component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapScreen" component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EatsScreen" component={EatsScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}