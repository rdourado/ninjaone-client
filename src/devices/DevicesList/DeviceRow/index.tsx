import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import * as Types from '../../DevicesView/DevicesView.types';
import DeviceActions from './DeviceActions';
import * as utils from './DeviceRow.utils';

interface Props {
  device: Types.Device;
}

function DeviceRow({ device }: Props) {
  const { hovered, ref } = useHover<HTMLTableRowElement>();

  return (
    <tr ref={ref}>
      <td>
        <Group spacing={5}>
          <FontAwesomeIcon icon={utils.getDeviceTypeIcon(device.type)} />
          <Text span weight="500">
            {device.system_name}
          </Text>
        </Group>
        <Text span size="xs" color="gray.6">
          {utils.capitalize(device.type)} workstation - {device.hdd_capacity} GB
        </Text>
      </td>
      <td align="right">
        <DeviceActions deviceId={device.id} opacity={hovered ? 1 : 0} />
      </td>
    </tr>
  );
}

export default DeviceRow;
