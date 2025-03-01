import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './core/state_management/store';
import { StackNagivation } from './router/StackNavigation';
import { NotificationService } from './services/NotificationService';
import { GlobalStyle } from './constants/styles';
import { loadCartFromStorage } from './core/state_management/screen_slice/CartSlice';

function App() {
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return (
    <Provider store={store}>
      <NotificationService />
      <StatusBar barStyle="dark-content" backgroundColor={GlobalStyle.primaryColor} />
      <StackNagivation />
    </Provider>
  );
}

export default App;