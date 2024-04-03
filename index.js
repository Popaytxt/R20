import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import store from './cmp/Redux/store'; 
import MainNavigator from './cmp/Logics/MainNavigator';

const wrap = () =>(
<Provider store={store}>
    <MainNavigator />
</Provider>
);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(wrap);
