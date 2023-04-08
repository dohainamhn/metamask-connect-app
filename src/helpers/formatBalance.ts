import BigNumber from 'bignumber.js';

export const formatBalance = (
  balance: string,
  maximumFractionDigits: number,
  minimumFractionDigits: number,
) => {
  return BigNumber(balance)
    .div(1e18)
    .toNumber()
    .toLocaleString('en-US', {
      maximumFractionDigits,
      minimumFractionDigits:
        maximumFractionDigits < minimumFractionDigits
          ? maximumFractionDigits
          : minimumFractionDigits,
    })
    .replace('/,/gm', '');
};
