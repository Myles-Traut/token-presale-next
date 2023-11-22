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

  let amountBought: any;
  let amountSpent: any;
  let userId: any;
  let buyer: any;

  await client
    .query({
      query: gql(tokensQuery),
    })
    .then((data) => (
      amountBought = data.data.hubBought.hubBought, 
      amountSpent = data.data.hubBought.ethSpent,
      userId = data.data.hubBought.id,
      buyer = data.data.hubBought.buyer
      ))
    .catch((err) => {
      console.log('Error fetching data: ', err)
  })

  if(amountBought === undefined){
    amountBought = "No Info";
  }

  if(amountSpent === undefined){
    amountSpent = "No Info";
  }

  if(userId === undefined){
    userId = "No Info";
  }

  if(buyer === undefined){
    buyer = "No Info";
  }

  // let result: number = userData?.toString() ?? undefined
  return {
      props: { amountBought, amountSpent, userId, buyer }, // will be passed to the page component as props
  }
}

type Props = {
  result : ReactNode,
  amountBought: any,
  amountSpent: any,
  userId: any,
  buyer: any,
}
export default function UserData({amountBought, amountSpent, userId, buyer}: Props) {
    return (
        <>
            <h2>User Data:</h2>
            <p>HUB Bought:   {amountBought} HUB</p>
            <div>ETH Spent:   {amountSpent}</div>
            <div>UserId:  {userId}</div>
            <div>Buyer:   {buyer}</div>
        </>
    )
}