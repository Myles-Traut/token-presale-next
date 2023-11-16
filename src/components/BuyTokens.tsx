import {
    usePrepareContractWrite, 
    useContractWrite, 
    useWaitForTransaction } from 'wagmi';

import { tokenSaleAbi } from "../../abis/TokenPresale"

import { parseEther } from 'viem';

type Props = {
    address: `0x${string}` | undefined,
    isConnected: boolean,
}

export default function BuyTokens({ address, isConnected }: Props) {
    
    // cd10d20c85e372c8697ae241a34de82d
    // https://api.studio.thegraph.com/query/53386/token-ps-final/version/latest
    // const SelectLabel: (label: string) => string = (label) => 

    const { config } = usePrepareContractWrite({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'buyHub',
        args: [address],
        value: parseEther('0.001'),
    });
    const { data, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
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