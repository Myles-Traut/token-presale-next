import { useAccount } from 'wagmi'

type Props = {
    counter: number
    add: Function
}

export default function BuyTokens({ counter, add }: Props) {

    const { isConnected } = useAccount();

    return (
        <>
            <div>
                <h1 className="text-center text-6xl my-8">Buy Tokens</h1>
            </div>
            <div>
                <h2 className="mt-5 mb-5 text-center text-2xl">Tokens bought: {counter}</h2>
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