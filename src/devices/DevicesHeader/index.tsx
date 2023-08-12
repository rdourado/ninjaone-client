import { Link } from 'wouter';
import { Button, Group, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function DevicesHeader() {
  return (
    <Group position="apart" mt="xs" mb="xl">
      <Title order={1}>Devices</Title>
      <Link href="/add">
        <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Add device</Button>
      </Link>
    </Group>
  );
}

export default DevicesHeader;
