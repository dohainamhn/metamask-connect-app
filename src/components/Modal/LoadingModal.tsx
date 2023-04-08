import { useCallback } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components';
interface Props {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
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
    height: 100,
    maxWidth: '250px',
    position: 'relative',
  }))}
`;

export const LoadingModal = ({ modalVisible, setModalVisible }: Props) => {
  const handleCloseModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <Body>
        <Wrapper>
          <Text>confirming...</Text>
        </Wrapper>
      </Body>
    </Modal>
  );
};
