import { useIsFocused } from '@react-navigation/native';
import { ActionButton } from 'components/Buttons/ActionButton';
import { LogoutButton } from 'components/Buttons/LogoutButton';
import { LoadingModal } from 'components/Modal/LoadingModal';
import { TransferTokenModal } from 'components/Modal/TransferTokenModal';
import { WrongNetworkModal } from 'components/Modal/WrongNetworkModal';
import { DAI_ADDRESS, GOERLI_RPC } from 'consts';
import { Errors } from 'consts/Errors';
import { ethers } from 'ethers';
import { formatWalletAddress } from 'helpers';
import { formatBalance } from 'helpers/formatBalance';
import { useIntegrateContract } from 'hooks/useIntegrateContract';
import { useWeb3ReactNative } from 'hooks/useWeb3ReactNative';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import styled, { css } from 'styled-components';

const Container = styled(View)`
  ${css(({ theme }) => ({
    padding: 5,
  }))}
`;

const Header = styled(View)`
  ${css(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }))}
`;

const Body = styled(View)`
  ${css(({ theme }) => ({
    padding: 5,
  }))}
`;

const BodyHeader = styled(View)`
  ${css(({ theme }) => ({
    padding: '20px 10px',
    alignItems: 'center',
  }))}
`;

const BodyTitle = styled(Text)`
  ${css(({ theme }) => ({
    padding: '20px 10px',
    fontWeight: 600,
    fontSize: 20,
  }))}
`;

const BodyActionsWrapper = styled(View)`
  ${css(({ theme }) => ({
    padding: '20px 10px',
    alignItems: 'center',
  }))}
`;

export const Home = () => {
  const isFocused = useIsFocused();
  const { account, ethereum, deactivate, error } = useWeb3ReactNative();
  const [balance, setBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { getAccountBalance, getTokenBalance, mintToken } =
    useIntegrateContract();

  const handleGetBalance = useCallback(async () => {
    setBalanceLoading(true);
    try {
      const balance = await getAccountBalance(account);
      setBalance(balance.toString());
    } catch (error) {
      setBalance('0');
    }
    setBalanceLoading(false);
  }, [account]);

  const handleGetDaiBalance = useCallback(async () => {
    setTokenBalanceLoading(true);
    try {
      const daiBalance = await getTokenBalance(account, DAI_ADDRESS);
      setTokenBalance(daiBalance.toString());
    } catch (error) {
      setTokenBalance('0');
    }
    setTokenBalanceLoading(false);
  }, [account]);

  const handleRefreshData = useCallback(async () => {
    handleGetDaiBalance();
    handleGetBalance();
  }, [ethereum]);
  const handleMint = useCallback(async () => {
    try {
      const response = await mintToken(DAI_ADDRESS, '10');
      if (response) {
        setActionLoading(true);
        const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC);
        await provider.waitForTransaction(response);
        handleGetDaiBalance();
        handleGetBalance();
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
    setActionLoading(false);
  }, [ethereum]);

  useEffect(() => {
    if (ethereum) {
      handleGetBalance();
      handleGetDaiBalance();
    }
  }, [isFocused, ethereum, account]);

  return (
    <Container>
      <Header>
        <View>
          <Text>Account: {formatWalletAddress(account || '')}</Text>
          <Text>
            Balance:{' '}
            {!balanceLoading ? formatBalance(balance, 3, 0) : 'Loading...'} ETH
          </Text>
        </View>
        <LogoutButton onPress={deactivate} />
      </Header>
      <Body>
        <BodyHeader>
          <Text>
            Balance:{' '}
            {!tokenBalanceLoading
              ? formatBalance(tokenBalance, 3, 0)
              : 'Loading...'}{' '}
            DAI
          </Text>
          <BodyTitle>Actions</BodyTitle>
        </BodyHeader>
        <BodyActionsWrapper>
          <ActionButton onPress={handleMint} title="Mint Dai Token" />
          <ActionButton
            backgroundColor="#0f46bd"
            onPress={() => {
              setModalVisible(true);
            }}
            maxWidth={200}
            title="Transfer Dai Token"
          />
        </BodyActionsWrapper>
      </Body>

      <TransferTokenModal
        refreshData={handleRefreshData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <LoadingModal
        modalVisible={actionLoading}
        setModalVisible={setActionLoading}
      />

      <WrongNetworkModal modalVisible={error === Errors.WrongNetwork} />
    </Container>
  );
};
