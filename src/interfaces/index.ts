import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum Screens {
  Login = 'Login',
  Home = 'Home',
}

export type RootStackParams = {
  [Screens.Login]: undefined;
  [Screens.Home]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

export type RootStackNavigationProps<T extends keyof RootStackParams> =
  NativeStackNavigationProp<RootStackParams, T>;

export type RootStackRouteProps<T extends keyof RootStackParams> = RouteProp<
  RootStackParams,
  T
>;
