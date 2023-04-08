import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'stores/types';

export const getError = createSelector(
  (state: RootState) => state.metamask.error,
  error => error,
);
