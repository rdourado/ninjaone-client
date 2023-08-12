import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import * as utils from '../DeviceRow.utils'; // Adjust the import path accordingly

describe('capitalize function', () => {
  it('should capitalize the first letter of a word', () => {
    const result = utils.capitalize('hello');
    expect(result).toBe('Hello');
  });

  it('should handle empty input', () => {
    const result = utils.capitalize('');
    expect(result).toBe('');
  });

  it('should handle already capitalized input', () => {
    const result = utils.capitalize('World');
    expect(result).toBe('World');
  });

  it('should handle mixed case input', () => {
    const result = utils.capitalize('gOOd MorNING');
    expect(result).toBe('Good morning');
  });
});

describe('getDeviceTypeIcon function', () => {
  it('should return the Windows icon for "WINDOWS"', () => {
    const icon = utils.getDeviceTypeIcon('WINDOWS');
    expect(icon).toEqual(faWindows);
  });

  it('should return the Linux icon for "LINUX"', () => {
    const icon = utils.getDeviceTypeIcon('LINUX');
    expect(icon).toEqual(faLinux);
  });

  it('should return the Apple icon for "MAC"', () => {
    const icon = utils.getDeviceTypeIcon('MAC');
    expect(icon).toEqual(faApple);
  });

  it('should return the Desktop icon for unknown device types', () => {
    const icon = utils.getDeviceTypeIcon('UNKNOWN');
    expect(icon).toEqual(faDesktop);
  });

  it('should be case-insensitive', () => {
    const icon = utils.getDeviceTypeIcon('linux');
    expect(icon).toEqual(faLinux);
  });
});
