import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { getEthereum } from 'stores/selectors';
import { useAppSelector } from 'stores/types';

export const useGetAppCurrentState = () => {
  const appState = useRef(false);
  const [active, setActive] = useState(false);
  const ethereum = useAppSelector(getEthereum);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      console.log('nextAppState123',nextAppState)
      if(nextAppState === 'active'){
        appState.current = true
        try {
          // console.log('zoday1')
          // const connected = await ethereum.isConnected()
          // console.log('connected',connected)
          // console.log('connected', connected);
          // if (!connected) {
          //   console.log('zoday11')
          //   // dispatch(setAccount(null));
          // }
        } catch (error) {
          console.log('error',error)
          // dispatch(setAccount(null));
        }
      }
      else if(nextAppState === 'background'){
        appState.current = false
      }
      // if (
      //   appState.current.match(/inactive|background/) &&
      //   nextAppState === 'active'
      // ) {
      //   console.log('active');

      //   setActive(true);
      // } else if (
      //   appState.current.match(/active|background/) &&
      //   nextAppState === 'background'
      // ) {
      //   console.log('inactive');

      //   setActive(false);
      // }
      // appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [ethereum]);
  useEffect(()=>{
    console.log('appState',appState)
  },[appState.current])
  return appState.current;
};
