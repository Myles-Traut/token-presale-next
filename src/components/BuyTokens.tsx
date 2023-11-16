import { useAccount } from 'wagmi';
import TokensBought from './TokensBought';

type Props = {
    counter: number
    add: Function
}

export default function BuyTokens({ counter, add }: Props) {

    const { address, isConnected } = useAccount();
    
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
                <h2 className="mt-5 mb-5 text-center text-white text-2xl ">Claimable Hub Token Balance: <TokensBought address={address}/></h2> :
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