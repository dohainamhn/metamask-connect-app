import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components';
import MetamaskIcon from 'assets/icons/metamask-icon.svg';
import { memo } from 'react';
const Container = styled(TouchableOpacity)<
  TouchableOpacityProps & {
    backgroundColor?: string;
    maxWidth?: number;
  }
>`
  ${css(({ theme }) => ({
    alignItems: 'center',
    padding: '5px 10px',
    borderRadius: 5,
    marginVertical: 10,
  }))}
  background: ${p => p.backgroundColor || p.theme.colors.background.black},
  max-width: ${p => p.maxWidth || 150}px
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
  title: string;
  backgroundColor?: string;
  maxWidth?: number;
  loading?: boolean;
}

export const ActionButton = memo(
  ({ onPress, title, backgroundColor, maxWidth, loading }: Props) => {
    return (
      <Container
        disabled={loading}
        maxWidth={maxWidth}
        backgroundColor={backgroundColor}
        onPress={onPress}>
        <CustomText>{loading ? 'Confirming...' : title}</CustomText>
      </Container>
    );
  },
);
