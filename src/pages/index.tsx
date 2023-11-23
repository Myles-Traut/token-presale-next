import Link from 'next/link'
import { Inter } from 'next/font/google'
import PurchaseTokenForm from '@/components/PurchaseTokenForm'
import { useAccount, useContractRead } from 'wagmi';
import { useState } from 'react';
import { tokenSaleAbi } from "../../abis/TokenPresale";
import * as dn from "dnum";

const inter = Inter({ subsets: ['latin'] })

type Args = {
  data: bigint | undefined
  isError: boolean
  isLoading: boolean
}

export default function Home() {
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
      suspense: true,
      enabled: Boolean(address),
      onSuccess(data) {
          setBalance(dn.format([data, 18],{ digits: 4, trailingZeros: true }));
      },
  });

  console.log(balance);
  
  if(data === undefined){
      data = 0n;
  }

  return (
    <>
    <div className="flex realtive flex-col items-center justify-between p-24 mt-1">
      <div className="flex absolute bg-green-800">
          <h2 className="text-lg text-white text-center items-center justify-center px-4">{isConnected ? `Connected to ${address}` : "You Are Not Connected"}</h2>
      </div>
    </div>
    <div className="flex realtive flex-col items-center justify-between mt-1 mb-5">
      <div className="flex absolute mt-5 mb-8 bg-blue-500 w-screen justify-center">
          {isConnected ? 
          <h2 className="text-center text-white text-2xl">Claimable HUB Balance: {balance}</h2> :
          <h2 className="text-center text-white text-2xl">Please connect Wallet</h2>}
      </div>
    </div>
    
      </>
      
    
  )
}
