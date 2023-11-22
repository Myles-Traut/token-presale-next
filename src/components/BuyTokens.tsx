import {
    usePrepareContractWrite, 
    useContractWrite, 
    useWaitForTransaction, 
    useContractEvent,
    useFeeData } from 'wagmi';

import { tokenSaleAbi } from "../../abis/TokenPresale";

import { parseEther } from 'viem';
import { useState } from 'react';

type Props = {
    address: `0x${string}` | undefined,
    isConnected: boolean,
    setBalance: any,
    previousBalance: bigint
}

export default function BuyTokens({ address, isConnected, setBalance, previousBalance }: Props) {
    const [bought, setBought] = useState(0n);

    const { config, error, isError } = usePrepareContractWrite({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'buyHub',
        args: [address],
        value: parseEther('0.001'),
    });

    const { data: feeData } = useFeeData({
        onSuccess(data) {
            console.log('Success', data)
          },
    });


    console.log(config)

    useContractEvent({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        eventName: 'HubBought',
        listener(log) {
          setBought(log[0].args.hubBought);
        },
      })

    const { data, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            // console.log('Tx Success', bought + previousBalance)
            setBalance((bought + previousBalance).toString());
          },
    });

    return (
        <>
            <div className="flex relative">
                <div className="flex absolute bg-green-700">Fee data: {JSON.stringify(feeData?.formatted)}</div>

                <div className="flex absolute bg-gray-50 text-center justify-center mt-8 w-screen">
                <button disabled={!write }
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
                {isError && <div className='flex absolute bg-green-700 mt-8 text-black'>Error: insufficient funds for gas * price + value</div>}
                </div>
            </div>
        </>
    );
};