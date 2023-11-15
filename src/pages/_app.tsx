import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'

import { WagmiConfig, createConfig, configureChains, useAccount } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { useState } from "react";
 
const { chains, publicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: '0R20Qwh34mUfBv0mdMS_lJxrhH--egTt'}), publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  const [count, setcount] = useState(0);
  const add = () => setcount((prev) => prev + 1);
  return(
  <WagmiConfig config={config}>
    <Layout>
        <Component {...pageProps} counter={count} add={add}/>
    </Layout>
  </WagmiConfig>
  )
}
