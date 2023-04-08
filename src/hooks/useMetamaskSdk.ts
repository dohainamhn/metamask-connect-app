import MetaMaskSDK from '@metamask/sdk';
import BigNumber from 'bignumber.js';
import { Errors } from 'consts/Errors';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch } from 'react-redux';
import { setAccount, setError, setEthereum } from 'stores/reducers';

export const useMetamaskSdk = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const MMSDK = new MetaMaskSDK({
      openDeeplink: link => {
        Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
      },
      timer: BackgroundTimer, // To keep the app alive once it goes to background
      dappMetadata: {
        name: 'My App', // The name of your application
        url: 'https://myapp.com', // The url of your website
      },
    });
    const ethereum = MMSDK.getProvider();

    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('accounts',accounts)
        if (accounts && accounts.length > 0) {
          dispatch(setAccount(accounts[0]));
        } else {
          dispatch(setAccount(null));
        }
      });
      ethereum.on('chainChanged', (chainId: number) => {
        console.log('chainId',BigNumber(chainId).toNumber())
        if (BigNumber(chainId).toNumber() !== 5) {
          dispatch(setError(Errors.WrongNetwork));
        } else {
          dispatch(setError(''));
        }
      });
    }

    dispatch(setEthereum(ethereum));
  }, []);
};
