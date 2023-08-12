import { Route } from 'wouter';
import { ModalsProvider } from '@mantine/modals';
import DevicesView from './devices/DevicesView';
import DeleteDevice from './devices/DevicesList/DeviceRow/DeviceActions/DeleteDevice';
import DefaultView from './layout/DefaultView';
import EditDevice from './devices/DevicesHeader/EditDevice';

function App() {
  return (
    <ModalsProvider>
      <DefaultView>
        <DevicesView />
        <Route path="/add" component={EditDevice} />
        <Route path="/edit/:id" component={EditDevice} />
        <Route path="/delete/:id" component={DeleteDevice} />
      </DefaultView>
    </ModalsProvider>
  );
}

export default App;
