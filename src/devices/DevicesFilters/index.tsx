import { useCallback } from 'react';
import { Group, MultiSelect, Select, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useDeviceStore from '../DevicesView/DevicesView.store';
import * as utils from './DevicesFilters.utils';

const SORT_OPTIONS = [
  { label: 'System name (Ascending)', value: '+system_name' },
  { label: 'System name (Descending)', value: '-system_name' },
  { label: 'HDD Capacity (Ascending)', value: '+hdd_capacity' },
  { label: 'HDD Capacity (Descending)', value: '-hdd_capacity' },
];

function DevicesFilters() {
  const [deviceTypes, search, types, order, setSearch, setTypes, setOrder] = useDeviceStore(
    (store) => [
      utils.getDeviceTypes(store.devices),
      store.filters.search,
      store.filters.types,
      utils.parseOrder(store.filters.order),
      store.setSearch,
      store.setTypes,
      store.setOrder,
    ]
  );

  const renderIcon = useCallback(() => <FontAwesomeIcon icon={faMagnifyingGlass} />, []);

  return (
    <Group spacing="xs" mb="xl">
      <TextInput
        aria-label="Search"
        placeholder="Search"
        icon={renderIcon()}
        value={search}
        onChange={setSearch}
      />
      <MultiSelect
        aria-label="Device type"
        placeholder="Device type"
        clearable
        data={deviceTypes}
        value={types}
        onChange={setTypes}
      />
      <Select
        aria-label="Sort by"
        placeholder="Sort by"
        clearable
        data={SORT_OPTIONS}
        value={order}
        onChange={setOrder}
      />
    </Group>
  );
}

export default DevicesFilters;
