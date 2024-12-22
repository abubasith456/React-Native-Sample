import { Provider } from 'react-redux'
import { store } from './core/state_management/store';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNagivation } from './router/StackNavigation';

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <StackNagivation />
    </Provider>
  );
}
