import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

export function capitalize(word: string = '') {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getDeviceTypeIcon(deviceType: string) {
  switch (deviceType.toUpperCase()) {
    case 'WINDOWS':
      return faWindows;
    case 'LINUX':
      return faLinux;
    case 'MAC':
      return faApple;
    default:
      return faDesktop;
  }
}
