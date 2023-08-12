import { ReactNode, useCallback } from 'react';
import { AppShell, Header } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from '../ThemeProvider';
import NinjaOneLogo from './__assets__/ninja-one-logo.svg';

interface Props {
  children: ReactNode;
}

function DefaultView({ children }: Props) {
  const renderHeader = useCallback(
    () => (
      <Header height={50}>
        <img src={NinjaOneLogo} alt="NinjaOne logo" />
      </Header>
    ),
    []
  );

  return (
    <ThemeProvider>
      <Notifications position="top-center" />
      <AppShell header={renderHeader()}>{children}</AppShell>
    </ThemeProvider>
  );
}

export default DefaultView;
