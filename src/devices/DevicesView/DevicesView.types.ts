export interface Device extends Record<string, any> {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: number;
}

export interface RawDevice {
  id?: string;
  system_name?: string;
  type?: string;
  hdd_capacity?: string | number;
}

export interface NewDevice extends Record<string, any> {
  system_name: string;
  type: string;
  hdd_capacity: number;
}
