import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import DevicesFilters from '../DevicesFilters';
import DevicesHeader from '../DevicesHeader';
import DevicesList from '../DevicesList';
import useDeviceStore from './DevicesView.store';
import { getNotifOptions } from './DevicesView.utils';

function DevicesView() {
  const fetchAll = useDeviceStore((store) => store.fetchAll);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchAll();
      } catch (error) {
        notifications.show(getNotifOptions(error));
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <DevicesHeader />
      <DevicesFilters />
      <DevicesList />
    </>
  );
}

export default DevicesView;
