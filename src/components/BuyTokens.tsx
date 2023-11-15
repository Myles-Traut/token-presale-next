import { useAccount, useContractRead } from 'wagmi';
import { tokenSaleAbi } from "../../abis/TokenPresale"
import { ReactNode } from 'react';

type Props = {
    counter: number
    add: Function
}

type Args = {
    data: string | number | undefined
    isError: boolean
    isLoading: boolean
}

export default function BuyTokens({ counter, add }: Props) {

    const { address, isConnected } = useAccount();

    
    const { data, isError, isLoading }: Args = useContractRead({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'userHubBalance',
        args: ['0xe6ba5Bb7238e7C38C7c5Ff5F0dA2223C50A466f8'],
        suspense: true,
        onSuccess(data) {
            console.log('Success', data)},
      });
    const output = data?.toString();
    

    return (
        <>
            <div>
                <h1 className="text-center text-6xl my-8">Buy Tokens</h1>
            </div>
            <div>
            <h2 className="flex relative text-lg text-white text-center items-center justify-center mb-8 px-4">{isConnected ? `Connected to ${address}` : "You Are Not Connected"}</h2>
            </div>
            <div className="mt-5">
                {isConnected ? 
                <h2 className="mt-5 mb-5 text-center text-white text-2xl">Hub Tokens bought: {output}</h2> :
                <h2 className="mt-5 mb-5 text-center text-white text-2xl">Please connect Wallet</h2>}
            </div>
            <div className="flex relative">
                <div className="flex absolute bg-gray-50 text-center justify-center mt-8 w-screen">
                <button disabled={!isConnected}
                    className={isConnected ? 
                        "h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800" : 
                        "h-10 px-5 m-2 text-gray-700 transition-colors duration-150 bg-gray-400 rounded-lg focus:shadow-outline hover:bg-gray-500"}
                    onClick={() => {add()}}>Buy Tokens</button>
                </div>
            </div>
        </>
    );
};