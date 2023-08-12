import { MantineThemeOverride, rem } from '@mantine/core';

const theme: MantineThemeOverride = {
  globalStyles: ({ colors }) => ({
    body: {
      color: colors.gray[7],
    },
  }),

  colors: {
    blue: [
      '#337AB7',
      '#337AB7',
      '#337AB7',
      '#337AB7',
      '#337AB7',
      '#337AB7',
      '#337AB7',
      '#3BA1C4',
      '#002A42',
      '#002A42',
    ],
  },

  spacing: {
    xs: rem(8),
  },

  fontFamily: 'Inter, sans-serif',
  fontSizes: {
    xl: rem(24),
  },
  headings: {
    fontWeight: 500,
    sizes: {
      h1: {
        fontSize: rem(20),
      },
    },
  },

  components: {
    AppShell: {
      defaultProps: {
        padding: 'xl',
      },
    },
    Header: {
      defaultProps: {
        bg: 'blue.9',
        pl: 'xl',
        pr: 'xl',
      },
      styles: {
        root: {
          alignItems: 'center',
          display: 'flex',
        },
      },
    },
    Button: {
      defaultProps: {
        size: 'md',
      },
      styles: ({ fontSizes }, __, { size }) => ({
        label: {
          fontSize: size === 'md' ? fontSizes.sm : undefined,
          fontWeight: 500,
        },
      }),
    },
    Menu: {
      defaultProps: {
        closeDelay: 400,
        offset: 0,
        openDelay: 100,
        position: 'bottom-end',
        shadow: 'xs',
        withArrow: true,
      },
    },
    TextInput: {
      styles: ({ breakpoints }) => ({
        root: {
          minWidth: 260,
          [`@media (max-width: ${breakpoints.xs})`]: {
            width: '100%',
          },
        },
      }),
    },
    Select: {
      styles: ({ breakpoints }) => ({
        root: {
          minWidth: 240,
          [`@media (max-width: ${breakpoints.xs})`]: {
            width: '100%',
          },
        },
      }),
    },
    MultiSelect: {
      styles: ({ breakpoints }) => ({
        root: {
          minWidth: 220,
          maxWidth: '100%',
          [`@media (max-width: ${breakpoints.xs})`]: {
            width: '100%',
          },
        },
      }),
    },
    Table: {
      defaultProps: {
        horizontalSpacing: 'xs',
        verticalSpacing: 4,
      },
      styles: ({ colors }) => ({
        root: {
          color: colors.gray[7],
        },
      }),
    },
    Modal: {
      defaultProps: {
        centered: true,
        padding: 'xl',
        size: 'lg',
      },
      styles: ({ fontSizes }) => ({
        title: {
          fontSize: fontSizes.xl,
        },
      }),
    },
  },
};

export default theme;
