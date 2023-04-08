import { ConnectMetamaskBtn } from 'components/Buttons/ConnectMetamaskBtn';
import { ContainerScreen } from 'components/layout/ContainerScreen';
import { useWeb3ReactNative } from 'hooks/useWeb3ReactNative';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAccount } from 'stores/reducers';
import { getEthereum } from 'stores/selectors/metamask/getEhereum';
import { useAppSelector } from 'stores/types';
import styled, { css } from 'styled-components';

const Container = styled(View)`
  ${css({
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  })}
`;

export const Login = () => {
  const dispatch = useDispatch();
  const ethereum = useAppSelector(getEthereum);
  const { activate } = useWeb3ReactNative();
  const handleLogin = async () => {
    await activate();
  };

  return (
    <ContainerScreen>
      <Container>
        <ConnectMetamaskBtn onPress={handleLogin} />
      </Container>
    </ContainerScreen>
  );
};
