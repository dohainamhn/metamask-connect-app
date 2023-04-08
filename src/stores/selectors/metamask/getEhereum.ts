import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'stores/types';

export const getEthereum = createSelector(
  (state: RootState) => state.metamask.ethereum,
  ethereum => ethereum,
);
