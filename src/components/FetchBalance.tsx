import { useContractRead } from 'wagmi';
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

export default function FetchBalance({ address }: Props) {
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
        // THIS WILL FAIL TO RENER CORRECTLY OF USER HAS 0.0001 HUB
        // THINK OF FIX!!
        return output?.length === 1 ? (<div>{output} HUB</div>) : (<div>{output?.slice(0, -18)} HUB</div>);
}