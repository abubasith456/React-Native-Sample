import { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './core/state_management/store';
import { StackNagivation } from './router/StackNavigation';
import { NotificationService } from './services/NotificationService';
import { View } from 'react-native';

export default function App() {
  useEffect(() => {
    enableScreens(false); // Ensure it takes effect after the app loads
  }, []);

  return (
    <Provider store={store}>
      <NotificationService />
      <View style={{ flex: 1 }}> 
        <StackNagivation />
      </View>
    </Provider>
  );
}
