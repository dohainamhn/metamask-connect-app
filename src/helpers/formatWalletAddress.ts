export const formatWalletAddress = (tx: string, first = 5, last = 4): string =>
  `${tx.substring(0, first)}...${tx.substring(tx.length - last, tx.length)}`;
