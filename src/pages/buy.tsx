import { useContractRead } from 'wagmi'

import BuyTokens from "@/components/BuyTokens";
import { ReactNode } from 'react';
import { tokenSaleAbi } from "../../abis/TokenPresale"

type Props = {
    counter: number
    add: Function
}

type Args = {
    data: ReactNode
    isError: boolean
    isLoading: boolean
}

export default function Buy({ counter, add }: Props) {
    const { data, isError, isLoading }: Args = useContractRead({
              address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
              abi: tokenSaleAbi,
              functionName: 'owner',
              suspense: true
            });
    return (
        <>
            <BuyTokens counter={counter} add={add}/>
            <p>Contract Owner: {data}</p>
        </>)
}