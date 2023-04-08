import React, { memo } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import styled, { useTheme } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const CustomIosView = styled(View)`
  flex: 1;
  background-color: ${p => p.theme.colors.background.main};
`;

const CustomAndroidView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${p => p.theme.colors.background.main};
`;

const Container = ({ children }: Props) => {
  if (Platform.OS === 'ios') {
    return <CustomIosView>{children}</CustomIosView>;
  } else {
    return <CustomAndroidView>{children}</CustomAndroidView>;
  }
};

export const ContainerScreen = memo(({ children }: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.background.black} />
      {children}
    </Container>
  );
});
