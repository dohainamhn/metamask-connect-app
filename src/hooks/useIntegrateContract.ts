import { ethers } from 'ethers';
import { getAccount } from 'stores/selectors';
import { getEthereum } from 'stores/selectors/metamask/getEhereum';
import { useAppSelector } from 'stores/types';
import { EC20Abi } from '../abis';

export const useIntegrateContract = () => {
  const ethereum = useAppSelector(getEthereum);
  const account = useAppSelector(getAccount);

  const getAccountBalance = async (account: string | null) => {
    if (account) {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.blockpi.network/v1/rpc/public',
      );
      return await provider.getBalance(String(account));
    }
    return 0;
  };

  const getTokenBalance = async (
    walletAddress: string | null,
    tokenAddress: string,
  ) => {
    if (walletAddress) {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.blockpi.network/v1/rpc/public',
      );
      const contract = new ethers.Contract(tokenAddress, EC20Abi, provider);
      return await contract.balanceOf(String(walletAddress));
    }
    return 0;
  };
  const mintToken = async (tokenAddress: string, amount: string) => {
    let iface = new ethers.utils.Interface(EC20Abi);
    const tx = iface.encodeFunctionData('mint', [
      ethers.utils.parseEther(amount),
    ]);

    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: tokenAddress,
          data: tx,
        },
      ],
    });
    return txHash;
  };

  const transferToken = async (tokenAddress: string, amount: string, receiverAddress: string) => {
    let iface = new ethers.utils.Interface(EC20Abi);
    const tx = iface.encodeFunctionData('transfer', [
      receiverAddress,
      ethers.utils.parseEther(amount),
    ]);

    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: tokenAddress,
          data: tx,
        },
      ],
    });
    return txHash;
  };
  return {
    getAccountBalance,
    getTokenBalance,
    mintToken,
    transferToken
  };
};
