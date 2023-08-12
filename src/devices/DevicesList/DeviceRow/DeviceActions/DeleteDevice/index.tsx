import { useCallback, useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import useDeviceStore from '../../../../DevicesView/DevicesView.store';
import { getNotifOptions } from '../../../../DevicesView/DevicesView.utils';
import * as Types from '../../../../DevicesView/DevicesView.types';

function DeleteDevice() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/delete/:id');

  const [device, setDevice] = useState<Types.Device | null>(null);
  const [fetchOne, deleteDevice] = useDeviceStore((store) => [store.fetchOne, store.deleteDevice]);

  const deviceId = params?.id || '';

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchOne(deviceId);
        setDevice(data);
      } catch (error) {
        notifications.show(getNotifOptions(error));
      }
    }
    if (deviceId) fetchData();
  }, [deviceId]);

  const goBack = useCallback(() => setLocation('/'), []);

  const submitData = useCallback(async () => {
    try {
      await deleteDevice(deviceId);
      goBack();
    } catch (error) {
      notifications.show(getNotifOptions(error));
    }
  }, [deviceId]);

  if (!device) return null;

  return (
    <Modal title="Delete device?" opened centered onClose={goBack}>
      <Stack spacing="sm">
        <Text component="p">
          You are about to delete the device{' '}
          <Text component="strong" weight="500">
            {device.system_name}
          </Text>
          . This action cannot be undone.
        </Text>

        <Group position="right" mt="lg">
          <Button variant="default" onClick={goBack}>
            Cancel
          </Button>
          <Button variant="filled" color="red" onClick={submitData}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default DeleteDevice;
