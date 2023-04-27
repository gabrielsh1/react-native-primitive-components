import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';

const NativeStack = createStackNavigator();

export function Routes() {
  return (
    <NativeStack.Navigator initialRouteName="Home">
      <NativeStack.Screen
        name="Home"
        component={Home}
      />
    </NativeStack.Navigator>
  );
};