import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useMetamaskSdk } from 'hooks/useMetamaskSdk';
import { RootStackParams, Screens } from 'interfaces';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Home, Login } from 'screens';
import { setAccount } from 'stores/reducers';
import { getAccount } from 'stores/selectors';
import { getEthereum } from 'stores/selectors/metamask/getEhereum';
import { useAppSelector } from 'stores/types';

const Stack = createStackNavigator<RootStackParams>();

export const AppNavigation = React.memo(() => {
  const dispatch = useDispatch();
  useMetamaskSdk();
  const ethereum = useAppSelector(getEthereum);
  const account = useAppSelector(getAccount);
  const handleAuth = useCallback(async () => {
    if (account && ethereum) {
      try {
        const connected = await ethereum.isConnected();
        if (!connected) {
          dispatch(setAccount(null));
        }
      } catch (error) {
        dispatch(setAccount(null));
      }
    }
  }, [ethereum, account]);
  useEffect(() => {
    handleAuth();
  }, [ethereum, account]);

  return (
    <Stack.Navigator
      initialRouteName={Screens.Home}
      screenOptions={{
        headerShown: false,
      }}>
      {account ? (
        <Stack.Screen name={Screens.Home} component={Home} />
      ) : (
        <Stack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={Screens.Login}
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
});
