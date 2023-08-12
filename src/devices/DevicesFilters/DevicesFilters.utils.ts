import { capitalize } from '../DevicesList/DeviceRow/DeviceRow.utils';
import * as Types from '../DevicesView/DevicesView.types';

// Adapted from: https://stackoverflow.com/a/46219650
export function unique(source: any[], prop: string) {
  return source.filter(
    (a, index) => source.findIndex((b) => (b[prop] || b) === (a[prop] || a)) === index
  );
}

export function getDeviceTypesAsOptions(devices: Types.Device[]) {
  return devices.map((device) => ({
    label: capitalize(device.type),
    value: device.type,
  }));
}

export function getDeviceTypes(devices: Types.Device[]) {
  const uniqueTypes = unique(devices, 'type');
  const options = getDeviceTypesAsOptions(uniqueTypes);
  return options;
}

export function parseOrder(order: [string, boolean] | null) {
  if (!order) return null;
  const [key, inverse] = order;
  return (inverse ? '-' : '+') + key;
}
