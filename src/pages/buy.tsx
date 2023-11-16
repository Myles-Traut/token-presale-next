import BuyTokens from "@/components/BuyTokens";
import TokenBalance from '@/components/TokenBalance';
import { useAccount, useContractRead } from 'wagmi';
import { tokenSaleAbi } from "../../abis/TokenPresale"
import { ReactNode } from 'react';

type Args = {
    data: string | number | undefined | ReactNode
    isError: boolean
    isLoading: boolean
}

type Props = {
    address: `0x${string}` | undefined
}

// export default function FetchBalance({ address }: Props) {
    
//         // THIS WILL FAIL TO RENER CORRECTLY OF USER HAS 0.0001 HUB
//         // THINK OF FIX!!
//         return output?.length === 1 ? (<div>{output} HUB</div>) : (<div>{output?.slice(0, -18)} HUB</div>);
// }

export default function Buy() {
    const { address, isConnected } = useAccount();

    const userBalance = () => {
        const { data, isError, isLoading }: Args = useContractRead({
            address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
            abi: tokenSaleAbi,
            functionName: 'userHubBalance',
            args: [address],
            suspense: true,
            onSuccess(data) {
                console.log('Success', data)},
            });
            
            let output = data?.toString();
            return output;
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
                {isConnected ? 
                <h2 className="mt-5 mb-5 text-center text-white text-2xl ">Claimable Hub Token Balance: <TokenBalance address={address} /></h2> :
                <h2 className="mt-5 mb-5 text-center text-white text-2xl">Please connect Wallet</h2>}
            </div>
            <BuyTokens address={address} isConnected= {isConnected}/>
        </>
    )
}