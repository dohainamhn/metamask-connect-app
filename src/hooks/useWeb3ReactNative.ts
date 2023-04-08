import { Errors } from 'consts/Errors';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAccount, setError } from 'stores/reducers';
import { getAccount, getEthereum } from 'stores/selectors';
import { getError } from 'stores/selectors/metamask/getError';
import { useAppSelector } from 'stores/types';

export const useWeb3ReactNative = () => {
  const account = useAppSelector(getAccount);
  const ethereum = useAppSelector(getEthereum);
  const error = useAppSelector(getError);

  const dispatch = useDispatch();

  const activate = useCallback(async () => {
    if (ethereum) {
      console.log('zoday');
      try {
        const response = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (response && response.length > 0) {
          dispatch(setAccount(response[0]));
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      dispatch(setError(Errors.MetamaskNotInstalled));
    }
  }, [ethereum]);

  const deactivate = useCallback(async () => {
    dispatch(setAccount(null));
  }, [ethereum]);

  return {
    activate,
    deactivate,
    account,
    error,
    ethereum,
  };
};
