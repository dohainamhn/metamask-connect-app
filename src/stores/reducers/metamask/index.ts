import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MetamaskStates {
  ethereum: any,
  account: string | null,
  error: string | null
}

const initialState: MetamaskStates = {
  ethereum: null,
  account: null,
  error: null
};

export const metamask = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    setEthereum: (state, actions: PayloadAction<any>) => {
      state.ethereum = actions.payload;
    },
    setAccount: (state, actions: PayloadAction<string | null>) => {
      state.account = actions.payload;
    },
    setError: (state, actions: PayloadAction<string | null>) => {
      state.error = actions.payload;
    },
  },
});

export const { setEthereum, setAccount, setError } = metamask.actions;

export const metamaskReducer = metamask.reducer;
