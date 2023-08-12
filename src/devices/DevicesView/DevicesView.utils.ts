import { createElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import type { NotificationProps } from '@mantine/notifications';
import * as Types from './DevicesView.types';

export function findInObject(obj: Record<string, any>, keyword: string) {
  return JSON.stringify(obj).toLowerCase().includes(keyword.toLowerCase());
}

export function findInArray(arr: any[], item: any) {
  if (!arr.length) return true;
  return arr.includes(item);
}

export function sortBy(source: any[], key: string, inverse?: boolean) {
  if (!source.length) return source;

  const order = inverse ? -1 : 1;
  const options: Intl.CollatorOptions = {
    numeric: Boolean(parseFloat(`${source[0][key]}`)),
  };

  return [...source].sort((a, b) => {
    const aKey = String(a[key]) || '';
    const bKey = String(b[key]) || '';
    return aKey.localeCompare(bKey, undefined, options) * order;
  });
}

export function transformDevice(rawData: string): Types.Device | string;
export function transformDevice(rawData: Types.RawDevice): Types.Device;
export function transformDevice(rawData: any) {
  let device = rawData;
  if (typeof rawData === 'string') {
    try {
      device = JSON.parse(rawData) as Types.RawDevice;
    } catch (error) {
      return rawData;
    }
  }

  return {
    hdd_capacity: parseInt(`${device.hdd_capacity}`, 10) || 0,
    id: device.id || '',
    system_name: device.system_name?.toUpperCase() || '--',
    type: device.type || 'UNKNOWN',
  };
}

export function transformDevices(rawData: string): Types.Device[] | string {
  try {
    const data: Types.RawDevice[] = JSON.parse(rawData);
    return data.map(transformDevice);
  } catch (error) {
    return rawData;
  }
}

export function getNotifOptions(error: unknown): NotificationProps {
  const message = error instanceof Error ? error.message : String(error);
  const icon = createElement(FontAwesomeIcon, { icon: faExclamation });
  return { title: 'Error', color: 'red', message, icon };
}
