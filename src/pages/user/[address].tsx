import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { readContract } from '@wagmi/core';
import { tokenSaleAbi } from "../../../abis/TokenPresale"
import { useContractRead } from 'wagmi';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

type Args = {
  data: string | number | undefined | ReactNode
  isError: boolean
  isLoading: boolean
}

export async function getServerSideProps(context: any) {
  console.log(context.params);
  const { address } = context.params;

  const APIURL = 'https://api.studio.thegraph.com/query/53386/token-ps-final/0.0.1'

  const tokensQuery = `
    query {
      hubBought(id: "${address}") {
          buyer
          ethSpent
          hubBought
          id
    }
  }
  `

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  let userData = await client
    .query({
      query: gql(tokensQuery),
    })
    .then((data) => (data.data.hubBought.hubBought))
    .catch((err) => {
      console.log('Error fetching data: ', err)
    })

  if(userData === undefined){
    userData = null;
  }

  // let result: number = userData?.toString() ?? undefined
  return {
      props: { userData }, // will be passed to the page component as props
  }
}

type Props = {
  result : ReactNode,
  userData: any
}
export default function UserData({userData}: Props) {
  console.log(userData);
  
    return (
        <>
            <h2>User Data:</h2>
            <p>Just Bought:{userData}</p>
        </>
    )
}