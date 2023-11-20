import {
    usePrepareContractWrite, 
    useContractWrite, 
    useWaitForTransaction, 
    useContractRead } from 'wagmi';

import { tokenSaleAbi } from "../../abis/TokenPresale";

import { parseEther } from 'viem';
import { ReactNode } from 'react';

type Props = {
    address: `0x${string}` | undefined,
    isConnected: boolean,
    setBalance: any,
    contractData: ReactNode
}

type BuyArgs = {
    buyData: string | number | undefined | ReactNode,
}

export default function BuyTokens({ address, isConnected, setBalance, contractData }: Props) {
    console.log(contractData);
    const { config } = usePrepareContractWrite({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'buyHub',
        args: [address],
        value: parseEther('0.002'),
    });

    const { buyData }: BuyArgs = useContractRead({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'getHubQuote',
        args: [parseEther('0.002')],
        suspense: true,
        onSuccess(data) {
            console.log('Success', data)},
        });

    const { data, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log('Success', (Number(contractData) + Number(buyData))),
            setBalance((Number(contractData) + Number(buyData)).toString());
          },
    });

    return (
        <>
            <div className="flex relative">
                <div className="flex absolute bg-gray-50 text-center justify-center mt-8 w-screen">
                <button disabled={isLoading || !isConnected }
                    className={isConnected && !isLoading ? 
                        "h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800" : 
                        "h-10 px-5 m-2 text-gray-700 transition-colors duration-150 bg-gray-400 rounded-lg focus:shadow-outline hover:bg-gray-500"}
                    onClick={() => write?.()}>{isLoading ? 'Transaction in progress' : 'Buy HUB'}</button>
                {isSuccess && (
                    <div className="text-black">
                        Successfully purchased HUB!
                        <div>
                            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};