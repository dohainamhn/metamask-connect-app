import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'stores/types';

export const getAccount = createSelector(
  (state: RootState) => state.metamask.account,
  account => account,
);
