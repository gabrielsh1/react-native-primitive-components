import 'react-native-gesture-handler';

import { Routes } from './src/routes';
import { StatusBar } from 'react-native';
import { ModalizeProvider } from './src/contexts/ModalizeContext';
import { NavigationContainer } from '@react-navigation/native';

import { getOS } from './src/global/utils/get-os-util';

import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ModalizeProvider>
          <Host>
            <Routes />

            <StatusBar barStyle={getOS === 'ios' ? 'dark-content' : 'light-content'} />
          </Host>
        </ModalizeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}