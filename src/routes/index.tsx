import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { Modalize } from '../pages/Modalize';

const NativeStack = createStackNavigator();

export function Routes() {
  return (
    <NativeStack.Navigator initialRouteName="Home">
      <NativeStack.Screen
        name="Home"
        component={Home}
      />
      
      <NativeStack.Screen
        name="Modalize"
        component={Modalize}
      />
    </NativeStack.Navigator>
  );
};