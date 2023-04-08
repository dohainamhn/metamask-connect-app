import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonStates {
  account: null | string;
}

const initialState: CommonStates = {
  account: null,
};

export const commonSlice = createSlice({
  name: 'commons',
  initialState,
  reducers: {
    // setAccount: (state, actions: PayloadAction<string | null>) => {
    //   state.account = actions.payload;
    // },
  },
});

export const {  } = commonSlice.actions;

export const commonsReducer = commonSlice.reducer;
