import { useCallback, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button, Group, Modal, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { isInRange, isNotEmpty, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDeviceTypeIcon } from '../../DevicesList/DeviceRow/DeviceRow.utils';
import { getNotifOptions } from '../../DevicesView/DevicesView.utils';
import useDeviceStore from '../../DevicesView/DevicesView.store';
import * as Types from '../../DevicesView/DevicesView.types';

const DEVICE_TYPES = [
  { label: 'Windows', value: 'WINDOWS' },
  { label: 'Apple', value: 'MAC' },
  { label: 'Linux', value: 'LINUX' },
];

type FormValues = Types.NewDevice | Types.Device;

function AddDeviceModal() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/edit/:id');
  const [fetchOne, editDevice] = useDeviceStore((store) => [store.fetchOne, store.editDevice]);

  const form = useForm<FormValues>({
    initialValues: {
      system_name: '',
      type: '',
      hdd_capacity: 0,
    },
    validate: {
      system_name: matches(/^[\w-]{2,63}$/, 'Please type a valid name'),
      type: isNotEmpty('Please select a device type'),
      hdd_capacity: isInRange({ min: 1, max: 99999 }, 'Please type a positive number'),
    },
  });

  const deviceId = params?.id || '';

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchOne(deviceId);
        form.setValues(data);
        form.resetDirty(data);
      } catch (error) {
        notifications.show(getNotifOptions(error));
      }
    }
    if (deviceId) fetchData();
  }, [deviceId]);

  const renderIcon = useCallback(() => {
    const icon = getDeviceTypeIcon(form.values.type);
    return icon ? <FontAwesomeIcon icon={icon} /> : undefined;
  }, [form.values.type]);

  const goBack = useCallback(() => setLocation('/'), []);

  const submitForm = useCallback(async (newDevice: FormValues) => {
    try {
      await editDevice(newDevice);
      goBack();
    } catch (error) {
      notifications.show(getNotifOptions(error));
    }
  }, []);

  return (
    <Modal title={deviceId ? 'Edit device' : 'Add device'} opened onClose={goBack}>
      <form onSubmit={form.onSubmit(submitForm)}>
        <Stack spacing="sm">
          <TextInput
            label="System name"
            withAsterisk
            autoFocus
            maxLength={63}
            {...form.getInputProps('system_name')}
          />
          <Select
            label="Device type"
            placeholder="Select type"
            withAsterisk
            data={DEVICE_TYPES}
            icon={renderIcon()}
            {...form.getInputProps('type')}
          />
          <NumberInput
            label="HDD capacity (GB)"
            type="number"
            withAsterisk
            maxLength={5}
            {...form.getInputProps('hdd_capacity')}
          />

          <Group position="right" mt="lg">
            <Button variant="default" onClick={goBack}>
              Cancel
            </Button>
            <Button variant="filled" type="submit">
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AddDeviceModal;
