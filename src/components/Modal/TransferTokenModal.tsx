import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import styled, { css } from 'styled-components';
import CloseIc from 'assets/icons/close-ic.svg';
import { ActionButton } from 'components/Buttons/ActionButton';
import { useCallback, useState } from 'react';
import { useIntegrateContract } from 'hooks/useIntegrateContract';
import { DAI_ADDRESS, GOERLI_RPC } from 'consts';
import { ethers } from 'ethers';
interface Props {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  refreshData: () => void;
}

const Body = styled(View)`
  ${css(({ theme }) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }))}
`;

const Wrapper = styled(View)`
  ${css(({ theme }) => ({
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '20px 35px',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    height: 200,
    maxWidth: '250px',
    position: 'relative',
  }))}
`;

const CustomTextInput = styled(TextInput)`
  ${css(({ theme }) => ({
    height: 40,
    borderWidth: 1,
    width: 200,
    borderRadius: 5,
    padding: '0 10px',
    marginVertical: 10,
  }))}
`;

const Header = styled(TouchableOpacity)`
  ${css(({ theme }) => ({
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 10,
  }))}
`;

export const TransferTokenModal = ({
  modalVisible,
  setModalVisible,
  refreshData,
}: Props) => {
  const { transferToken } = useIntegrateContract();
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleCloseModal = useCallback(() => {
    if (!loading) {
      setModalVisible(!modalVisible);
    }
  }, [modalVisible, loading]);

  const handleWalletChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setWalletAddress(e.nativeEvent.text);
    },
    [],
  );

  const handleAmountChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setTokenAmount(e.nativeEvent.text);
    },
    [],
  );

  const handleTransfer = async () => {
    try {
      const response = await transferToken(
        DAI_ADDRESS,
        tokenAmount,
        walletAddress,
      );
      if (response) {
        setLoading(true);
        const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC);
        await provider.waitForTransaction(response);
        refreshData();
        handleCloseModal();
      }
      console.log('response', response);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <Body>
        <Wrapper>
          <Header onPress={handleCloseModal}>
            <CloseIc width={15} height={15} />
          </Header>
          <CustomTextInput
            editable={!loading}
            value={walletAddress}
            onChange={handleWalletChange}
            placeholder="Wallet address"
          />
          <CustomTextInput
            editable={!loading}
            value={tokenAmount}
            onChange={handleAmountChange}
            placeholder="Token amount"
          />
          <ActionButton
            onPress={handleTransfer}
            loading={loading}
            backgroundColor="#2b067a"
            title="Send"
          />
        </Wrapper>
      </Body>
    </Modal>
  );
};
