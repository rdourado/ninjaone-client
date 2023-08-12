import { Link } from 'wouter';
import { ActionIcon, Menu } from '@mantine/core';
import type { MantineStyleSystemProps } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface Props extends MantineStyleSystemProps {
  deviceId: string;
}

function DeviceActions({ deviceId, ...props }: Props) {
  return (
    <Menu {...props} width={120}>
      <Menu.Target>
        <ActionIcon>
          <FontAwesomeIcon icon={faEllipsis} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Link href={`/edit/${deviceId}`}>
          <Menu.Item>Edit</Menu.Item>
        </Link>
        <Link href={`/delete/${deviceId}`}>
          <Menu.Item color="red">Delete</Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DeviceActions;
