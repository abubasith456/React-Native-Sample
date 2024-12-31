import { Provider } from 'react-redux'
import { store } from './core/state_management/store';
import { StackNagivation } from './router/StackNavigation';
import { NotificationService } from './services/NotificationService';


export default function App() {
  return (
    <Provider store={store}>
      <NotificationService />
      <StackNagivation />
    </Provider>
  );
}
