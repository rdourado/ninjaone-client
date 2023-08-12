import { ChangeEvent } from 'react';
import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import * as utils from './DevicesView.utils';
import * as Types from './DevicesView.types';

type State = {
  devices: Types.Device[];
  filters: {
    search: string;
    types: string[];
    order: [string, boolean] | null;
  };
};

type Actions = {
  fetchAll: () => Promise<void>;
  fetchOne: (deviceId: string) => Promise<Types.Device>;

  setSearch: (eventOrText: ChangeEvent<HTMLInputElement> | string) => void;
  setTypes: (types: string[]) => void;
  setOrder: (order: string) => void;

  getDevices: () => Types.Device[];
  editDevice: (device: Types.NewDevice | Types.Device) => Promise<void>;
  deleteDevice: (deviceId: string) => Promise<void>;
};

/* eslint-disable no-param-reassign -- Incompatible with Immer */
const useDeviceStore = create<State & Actions>()(
  devtools(
    immer(
      subscribeWithSelector(
        persist(
          (set, get) => ({
            devices: [],
            filters: {
              search: '',
              types: [],
              order: null,
            },

            fetchAll: async () => {
              const { data } = await axios.get<Types.Device[]>('/devices', {
                transformResponse: utils.transformDevices,
              });
              set((state) => {
                state.devices = data;
              });
            },

            fetchOne: async (deviceId) => {
              const { data } = await axios.get<Types.Device>(`/devices/${deviceId}`, {
                transformResponse: utils.transformDevice,
              });
              return data;
            },

            setSearch: (value) => {
              set((state) => {
                if (typeof value === 'string') {
                  state.filters.search = value;
                } else {
                  state.filters.search = value.currentTarget.value;
                }
              });
            },

            setTypes: (types) => {
              set((state) => {
                state.filters.types = types;
              });
            },

            setOrder: (order) => {
              set((state) => {
                if (order) {
                  const key = order.slice(1);
                  const inverse = order.charAt(0) === '-';
                  state.filters.order = [key, inverse];
                } else {
                  state.filters.order = null;
                }
              });
            },

            getDevices: () => {
              const { devices, filters } = get();
              const [keyToFind, inverse] = filters.order || [];
              const search = filters.search.toLowerCase();

              const filtered = devices.filter(
                (device) =>
                  utils.findInObject(device, search) &&
                  utils.findInArray(filters.types, device.type)
              );

              if (keyToFind) return utils.sortBy(filtered, keyToFind, inverse);

              return filtered;
            },

            editDevice: async ({ id, ...device }) => {
              if (id) {
                // Edit device
                await axios.put<Types.Device>(`/devices/${id}`, device);
                set((state) => {
                  const index = state.devices.findIndex((payload) => payload.id === id);
                  if (index > -1) {
                    state.devices[index] = utils.transformDevice({ id, ...device });
                  }
                });
              } else {
                // Create device
                const { data } = await axios.post<Types.Device>('/devices', device, {
                  transformResponse: utils.transformDevice,
                });
                set((state) => {
                  state.devices.unshift(data);
                });
              }
            },

            deleteDevice: async (deviceId) => {
              await axios.delete(`/devices/${deviceId}`);
              set((state) => {
                const index = state.devices.findIndex(({ id }) => id === deviceId);
                if (index > -1) state.devices.splice(index, 1);
              });
            },
          }),
          { name: 'device-storage' }
        )
      )
    )
  )
);

export default useDeviceStore;
