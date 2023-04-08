import { Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';
import MetamaskIcon from 'assets/icons/metamask-icon.svg';
import { memo } from 'react';
const Container = styled(TouchableOpacity)`
  ${css(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.colors.background.black,
    padding: '5px 10px',
    borderRadius: 3,
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

export const ConnectMetamaskBtn = memo(({ onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <MetamaskIcon width={30} height={30} />
      <CustomText>Connect With Metamask</CustomText>
    </Container>
  );
});
