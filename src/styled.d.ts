import theme from './styles/theme';

export type ThemeInterfaces = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterfaces {}
}
