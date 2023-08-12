import * as Types from '../../DevicesView/DevicesView.types';
import * as utils from '../DevicesFilters.utils'; // Adjust the import path accordingly

describe('unique function', () => {
  const testData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Alice' },
    { id: 4, name: 'Charlie' },
    { id: 5, name: 'Bob' },
  ];

  it('should return an array with unique objects based on the specified property', () => {
    const uniqueArray = utils.unique(testData, 'name');
    expect(uniqueArray).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 4, name: 'Charlie' },
    ]);
  });

  it('should preserve the order of the original array', () => {
    const uniqueArray = utils.unique(testData, 'name');
    expect(uniqueArray).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 4, name: 'Charlie' },
    ]);
  });

  it('should handle an empty source array', () => {
    const emptyArray: any[] = [];
    const uniqueArray = utils.unique(emptyArray, 'name');
    expect(uniqueArray).toEqual([]);
  });

  it('should handle a source array with a single element', () => {
    const singleElementArray = [{ id: 1, name: 'Alice' }];
    const uniqueArray = utils.unique(singleElementArray, 'name');
    expect(uniqueArray).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('should handle a source array with non-object elements', () => {
    const nonObjectArray = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'];
    const uniqueArray = utils.unique(nonObjectArray, ''); // Property doesn't matter for non-objects
    expect(uniqueArray).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});

describe('getDeviceTypesAsOptions function', () => {
  const testData = [
    { id: '1', system_name: 'PC', type: 'desktop', hdd_capacity: 500 },
    { id: '2', system_name: 'Laptop', type: 'laptop', hdd_capacity: 1000 },
  ];

  it('should map device types to options', () => {
    const options = utils.getDeviceTypesAsOptions(testData);
    expect(options).toEqual([
      { label: 'Desktop', value: 'desktop' },
      { label: 'Laptop', value: 'laptop' },
    ]);
  });

  it('should handle an empty array', () => {
    const emptyArray: any[] = [];
    const options = utils.getDeviceTypesAsOptions(emptyArray);
    expect(options).toEqual([]);
  });

  it('should handle different capitalizations in device types', () => {
    const testDataWithMixedCase = [
      { id: '3', system_name: 'Server', type: 'SERVER', hdd_capacity: 2000 },
    ];
    const options = utils.getDeviceTypesAsOptions(testDataWithMixedCase);
    expect(options).toEqual([{ label: 'Server', value: 'SERVER' }]);
  });
});

describe('getDeviceTypes function', () => {
  it('should return unique device types as options', () => {
    const devices: Types.Device[] = [
      { id: '1', system_name: 'DESKTOP', type: 'MAC', hdd_capacity: 500 },
      { id: '2', system_name: 'LAPTOP', type: 'WINDOWS', hdd_capacity: 500 },
      { id: '3', system_name: 'TABLET', type: 'WINDOWS', hdd_capacity: 1000 },
      { id: '4', system_name: 'LAPTOP', type: 'LINUX', hdd_capacity: 500 },
    ];
    const options = utils.getDeviceTypes(devices);
    expect(options).toEqual([
      { label: 'Mac', value: 'MAC' },
      { label: 'Windows', value: 'WINDOWS' },
      { label: 'Linux', value: 'LINUX' },
    ]);
  });

  it('should handle an empty array', () => {
    const emptyArray: Types.Device[] = [];
    const options = utils.getDeviceTypes(emptyArray);
    expect(options).toEqual([]);
  });

  it('should handle an array with one device type', () => {
    const devices = [{ id: '1', system_name: 'DESKTOP', type: 'MAC', hdd_capacity: 500 }];
    const options = utils.getDeviceTypes(devices);
    expect(options).toEqual([{ label: 'Mac', value: 'MAC' }]);
  });
});

describe('parseOrder function', () => {
  it('should parse an ascending order', () => {
    const order = utils.parseOrder(['name', false]);
    expect(order).toBe('+name');
  });

  it('should parse a descending order', () => {
    const order = utils.parseOrder(['date', true]);
    expect(order).toBe('-date');
  });

  it('should handle null order', () => {
    const order = utils.parseOrder(null);
    expect(order).toBe(null);
  });
});
