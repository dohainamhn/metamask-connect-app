import { Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';
import MetamaskIcon from 'assets/icons/metamask-icon.svg';
import { memo } from 'react';
const Container = styled(TouchableOpacity)`
  ${css(({ theme }) => ({
    alignItems: 'center',
    background: theme.colors.background.black,
    padding: '5px 10px',
    maxWidth: '150px',
    borderRadius: 5,
  }))}
`;

const CustomText = styled(Text)`
  ${css(({ theme }) => ({
    paddingHorizontal: 10,
    color: theme.colors.background.main,
    fontWeight: 600,
  }))}
`;

interface Props {
  onPress?: () => void;
}

export const LogoutButton = memo(({ onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <CustomText>Disconnect</CustomText>
    </Container>
  );
});
