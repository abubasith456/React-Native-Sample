import { Provider } from 'react-redux';
import { store } from './core/state_management/store';
import { StackNagivation } from './router/StackNavigation';
import { NotificationService } from './services/NotificationService';
import { StatusBar } from 'react-native';
import { theme, GlobalStyle } from './constants/styles';
import { useEffect } from 'react';
import { loadCartFromStorage } from './core/state_management/screen_slice/CartSlice';
import { Provider as PaperProvider } from 'react-native-paper';



export default function App() {

  useEffect(() => {
    loadCartFromStorage()
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NotificationService />
        <StatusBar barStyle="dark-content" backgroundColor={GlobalStyle.primaryColor} />
        <StackNagivation />
      </Provider>
    </PaperProvider>
  );
}
