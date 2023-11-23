import { useState } from'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent, useAccount } from 'wagmi'
import { useDebounce, DebouncedState } from 'use-Debounce'
import { tokenSaleAbi } from "../../abis/TokenPresale";
import { parseEther } from 'viem';
import * as dn from "dnum";

type Props = {
    userAddress: `0x${string}`,
    setBalance: any,
    previousBalance: bigint,
    isConnected: boolean,
}

export default function PurchaseTokenForm({ userAddress, isConnected, setBalance, previousBalance}: Props) {
    const [amount, setAmount] = useState('');
    const [bought, setBought] = useState(0n);
    const [quote, setQuote] = useState<string>('');
  
    // const debouncedAmount: [string, DebouncedState<(value: string) => void>] = useDebounce(amount, 500);

    console.log(amount.slice(-18));

    const {
        config, 
        error: prepareError,
        isError: isPrepareError, 
    } = usePrepareContractWrite({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        functionName: 'buyHub',
        args: [userAddress],
        enabled: true,
        value: parseEther(amount),
        onSuccess(data: any){
            setQuote(dn.format([data.result, 18],{ digits: 4, trailingZeros: true }));
        }
    });

    console.log(config.result);

    useContractEvent({
        address: '0xD055B32fd3136F1dCA638Cd8f4B2eAF4A10abAb3',
        abi: tokenSaleAbi,
        eventName: 'HubBought',
        listener(log) {
            if(log[0].args.hubBought === undefined){
                setBought(0n);
            }else{
                setBought(log[0].args.hubBought);
            }  
        },
      })

    const { data, write, error, isError } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction(
        {hash: data?.hash,
        onSuccess(data) {
                let total: bigint = bought + previousBalance;
                // console.log('Tx Success', bought + previousBalance)
                setBalance(dn.format([total, 18], { digits: 4, trailingZeros: true }));
              },}
    )

    return(
        <form onSubmit={(e) => {
            e.preventDefault()
            write?.()
        }}>
            <label htmlFor="Purchase" className="pr-4">Purchase Tokens</label>
            <input
                className="text-black pl-2"  
                id="1" 
                placeholder="0.001 ETH"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
            />
            <p hidden={!amount} className="text-center mt-3 py-3">You are about to buy: {quote} hub</p>
            <div className="items-center pl-28">
                <button 
                    disabled={!write || isLoading || !amount } 
                    className={isConnected && !isLoading && amount ? 
                            "h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800" : 
                            "h-10 px-5 m-2 text-gray-700 transition-colors duration-150 bg-gray-400 rounded-lg focus:shadow-outline hover:bg-gray-500"}>
                    {isLoading ? "Tx in progress" : "Buy Tokens"}
                </button>
            </div>
            {isSuccess && (<div>Success!
                <div><a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a></div>
            </div>)}
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </form>
    )
}
