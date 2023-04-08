import { ActionButton } from 'components/Buttons/ActionButton';
import { useCallback } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getEthereum } from 'stores/selectors';
import { useAppSelector } from 'stores/types';
import styled, { css } from 'styled-components';
interface Props {
  modalVisible: boolean;
  setModalVisible?: (bool: boolean) => void;
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
    shadowRadius: 4,
    height: 200,
    maxWidth: '250px',
    position: 'relative',
  }))}
`;

export const WrongNetworkModal = ({ modalVisible, setModalVisible }: Props) => {
  const ethereum = useAppSelector(getEthereum);
  const handleCloseModal = useCallback(() => {
    setModalVisible && setModalVisible(false);
  }, []);

  const handleChangeNetwork = async () => {
    return await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x5',
        },
      ],
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <Body>
        <Wrapper>
          <Text>Wrong network</Text>
          <ActionButton onPress={handleChangeNetwork} title="Change network" />
        </Wrapper>
      </Body>
    </Modal>
  );
};
