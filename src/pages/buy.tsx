import BuyTokens from "@/components/BuyTokens";
import { useAccount, useContractRead } from 'wagmi';
import { tokenSaleAbi } from "../../abis/TokenPresale"
import { ReactNode, useState } from 'react';
import PurchaseTokenForm from "@/components/PurchaseTokenForm";

type Args = {
    data: bigint | undefined
    isError: boolean
    isLoading: boolean
}

export default function Buy() {
    const { address, isConnected } = useAccount();

    let userAddr: `0x${string}` = '0x0000000000000000000000000000000000000000';
    if (address){
        userAddr = address;
    }

    const [balance, setBalance] = useState("0");

    let { data, isError, isLoading }: Args = useContractRead({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'userHubBalance',
        args: [userAddr],
        enabled: true,
        suspense: true,
        onSuccess(data) {
            setBalance(data?.toString().slice(0, -18))
            console.log('Success', data)},
        });
    
    if(data === undefined){
        data = 0n;
    }

    return (
        <>
            <div>
                <h1 className="text-center text-6xl my-8">Buy Tokens</h1>
            </div>
            <div>
                <h2 className="flex relative text-lg text-white text-center items-center justify-center mb-8 px-4">{isConnected ? `Connected to ${address}` : "You Are Not Connected"}</h2>
            </div>
            <div className="mt-5">
                <h2 className="mt-5 mb-5 text-center text-white text-xl ">Claimable Balance: {balance}</h2>
            </div>
            {/* <BuyTokens address={userAddr} isConnected= {isConnected} setBalance={setBalance} previousBalance={data}/> */}
            <div className="flex realtive flex-col items-center justify-between mt-36">
            <div className="flex absolute mt-8">
                <PurchaseTokenForm userAddress={userAddr} isConnected= {isConnected} setBalance={setBalance} previousBalance={data}/>
            </div>
    </div>
        </>
    )
}