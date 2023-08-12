import { useCallback, useEffect, useState } from 'react';
import { Table, Text } from '@mantine/core';
import useDeviceStore from '../DevicesView/DevicesView.store';
import * as Types from '../DevicesView/DevicesView.types';
import DeviceRow from './DeviceRow';

function DevicesList() {
  const [devices, setDevices] = useState<Types.Device[]>([]);
  const getDevices = useDeviceStore((store) => store.getDevices);

  const updateDevices = useCallback(() => setDevices(getDevices()), []);

  useEffect(() => {
    const unsubscribe = useDeviceStore.subscribe(
      (store) => [store.filters, store.devices],
      updateDevices
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Table highlightOnHover horizontalSpacing="xs" verticalSpacing={4} color="green">
      <thead>
        <tr>
          <th colSpan={2}>
            <Text span weight="500">
              Device
            </Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {devices.map((device) => (
          <DeviceRow key={device.id} device={device} />
        ))}
      </tbody>

      <tfoot aria-hidden>
        <tr>
          <th colSpan={2} />
        </tr>
      </tfoot>
    </Table>
  );
}

export default DevicesList;
