import { isValidElement } from 'react';
import * as utils from '../DevicesView.utils';

describe('findInObject function', () => {
  const testObject = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
    },
  };

  it('should find a keyword in the object', () => {
    const result = utils.findInObject(testObject, 'John');
    expect(result).toBe(true);
  });

  it('should not find a non-existent keyword', () => {
    const result = utils.findInObject(testObject, 'Alice');
    expect(result).toBe(false);
  });

  it('should be case-insensitive', () => {
    const result = utils.findInObject(testObject, 'ANYTOWN');
    expect(result).toBe(true);
  });

  it('should handle nested objects', () => {
    const result = utils.findInObject(testObject, '123 Main');
    expect(result).toBe(true);
  });

  it('should handle deep nested objects', () => {
    const result = utils.findInObject(testObject, '123');
    expect(result).toBe(true);
  });
});

describe('findInArray function', () => {
  it('should find an item in the array', () => {
    const arr = ['apple', 'banana', 'orange'];
    const result = utils.findInArray(arr, 'banana');
    expect(result).toBe(true);
  });

  it('should not find a non-existent item', () => {
    const arr = ['apple', 'banana', 'orange'];
    const result = utils.findInArray(arr, 'grape');
    expect(result).toBe(false);
  });

  it('should return true for an empty array', () => {
    const arr: any[] = [];
    const result = utils.findInArray(arr, 'anything');
    expect(result).toBe(true);
  });

  it('should handle different data types in the array', () => {
    const arr = ['apple', 42, { name: 'John' }];
    const result = utils.findInArray(arr, 42);
    expect(result).toBe(true);
  });
});

describe('sortBy function', () => {
  const testData = [
    { id: 3, name: 'Alice' },
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Charlie' },
  ];

  it('should sort an array by the specified key', () => {
    const sortedArray = utils.sortBy(testData, 'id');
    expect(sortedArray).toEqual([
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Charlie' },
      { id: 3, name: 'Alice' },
    ]);
  });

  it('should handle reverse sorting', () => {
    const sortedArray = utils.sortBy(testData, 'id', true);
    expect(sortedArray).toEqual([
      { id: 3, name: 'Alice' },
      { id: 2, name: 'Charlie' },
      { id: 1, name: 'Bob' },
    ]);
  });

  it('should handle sorting strings', () => {
    const nameData = [
      { id: 2, name: 'Banana' },
      { id: 1, name: 'apple' },
      { id: 3, name: 'cherry' },
    ];
    const sortedArray = utils.sortBy(nameData, 'name');
    expect(sortedArray).toEqual([
      { id: 1, name: 'apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'cherry' },
    ]);
  });

  it('should handle sorting with numeric values', () => {
    const numericData = [
      { id: 5, value: 10 },
      { id: 3, value: 5 },
      { id: 1, value: 20 },
    ];
    const sortedArray = utils.sortBy(numericData, 'value');
    expect(sortedArray).toEqual([
      { id: 3, value: 5 },
      { id: 5, value: 10 },
      { id: 1, value: 20 },
    ]);
  });
});

describe('transformDevice function', () => {
  it('should transform raw string data to a device object', () => {
    const rawString =
      '{"id": "123", "hdd_capacity": "500", "system_name": "pc", "type": "Desktop"}';
    const transformedDevice = utils.transformDevice(rawString);
    expect(transformedDevice).toEqual({
      id: '123',
      hdd_capacity: 500,
      system_name: 'PC',
      type: 'Desktop',
    });
  });

  it('should transform raw object data to a device object', () => {
    const rawObject = {
      id: '456',
      hdd_capacity: '1000',
      system_name: 'laptop',
      type: 'Laptop',
    };
    const transformedDevice = utils.transformDevice(rawObject);
    expect(transformedDevice).toEqual({
      id: '456',
      hdd_capacity: 1000,
      system_name: 'LAPTOP',
      type: 'Laptop',
    });
  });

  it('should handle missing properties', () => {
    const rawObject = {
      id: '789',
    };
    const transformedDevice = utils.transformDevice(rawObject);
    expect(transformedDevice).toEqual({
      id: '789',
      hdd_capacity: 0,
      system_name: '--',
      type: 'UNKNOWN',
    });
  });

  it('should return input as-is if parsing fails', () => {
    const invalidData = 'invalid json data';
    const transformedDevice = utils.transformDevice(invalidData);
    expect(transformedDevice).toBe(invalidData);
  });
});

describe('transformDevices function', () => {
  it('should transform raw string data to an array of device objects', () => {
    const rawString =
      '[{"id": "123", "hdd_capacity": "500", "system_name": "pc", "type": "Desktop"}]';
    const transformedDevices = utils.transformDevices(rawString);
    expect(transformedDevices).toEqual([
      {
        id: '123',
        hdd_capacity: 500,
        system_name: 'PC',
        type: 'Desktop',
      },
    ]);
  });

  it('should handle an array of raw objects', () => {
    const rawArray = [
      {
        id: '456',
        hdd_capacity: '1000',
        system_name: 'laptop',
        type: 'Laptop',
      },
      {
        id: '789',
        hdd_capacity: '2000',
        system_name: 'desktop',
        type: 'Desktop',
      },
    ];
    const transformedDevices = utils.transformDevices(JSON.stringify(rawArray));
    expect(transformedDevices).toEqual([
      {
        id: '456',
        hdd_capacity: 1000,
        system_name: 'LAPTOP',
        type: 'Laptop',
      },
      {
        id: '789',
        hdd_capacity: 2000,
        system_name: 'DESKTOP',
        type: 'Desktop',
      },
    ]);
  });

  it('should return input as-is if parsing fails', () => {
    const invalidData = 'invalid json data';
    const transformedDevices = utils.transformDevices(invalidData);
    expect(transformedDevices).toBe(invalidData);
  });
});

describe('getNotifOptions function', () => {
  it('should return notification options for an Error object', () => {
    const error = new Error('Something went wrong');
    const options = utils.getNotifOptions(error);
    expect(isValidElement(options.icon)).toBe(true);
    expect(options).toEqual({
      title: 'Error',
      color: 'red',
      message: 'Something went wrong',
      icon: expect.any(Object), // You might want to compare this more specifically
    });
  });

  it('should return notification options for a string', () => {
    const errorMessage = 'Another error occurred';
    const options = utils.getNotifOptions(errorMessage);
    expect(isValidElement(options.icon)).toBe(true);
    expect(options).toEqual({
      title: 'Error',
      color: 'red',
      message: 'Another error occurred',
      icon: expect.any(Object), // You might want to compare this more specifically
    });
  });

  it('should handle non-Error objects', () => {
    const nonErrorObject = { message: 'Not an Error' };
    const options = utils.getNotifOptions(nonErrorObject);
    expect(isValidElement(options.icon)).toBe(true);
    expect(options).toEqual({
      title: 'Error',
      color: 'red',
      message: '[object Object]',
      icon: expect.any(Object), // You might want to compare this more specifically
    });
  });
});
