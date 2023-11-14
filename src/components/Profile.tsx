import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <>
      <div className="flex relative justify-between items-center" >
        <div className="flex absolute right-32 text-base text-black text-center mr-64 px-4">Connected to {address}</div>
        
        <button 
        className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={() => disconnect()}>Disconnect</button>
      </div>
      </>
    )
  return (
    <div className="flex relative items-center">
        <div className="flex absolute right-32 text-base text-black text-center mr-52 px-4 w-96">You are not connected</div>
        <button className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={() => connect()}>Connect Wallet</button>
    </div>
  )
}