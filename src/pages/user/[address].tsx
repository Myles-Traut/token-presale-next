import { ApolloClient, ApolloQueryResult, InMemoryCache, gql } from '@apollo/client'
import { ReactNode } from 'react';
import * as dn from "dnum";

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

  const userData = await client
    .query({
      query: gql(tokensQuery),
    })
    .then((data) => {return data})
      // amountBought = data.data.hubBought.hubBought, 
      // amountSpent = data.data.hubBought.ethSpent,
      // userId = data.data.hubBought.id,
      // buyer = data.data.hubBought.buyer

    .catch((err) => {
      console.log('Error fetching data: ', err)
  });

  return {
      props: { userData }, // will be passed to the page component as props
  }
}

type Props = {
  userData: void | ApolloQueryResult<any>;
}
export default function UserData({ userData }: Props) {
    let amountBought: string = userData.data.hubBought?.hubBought;
    let bigAmount: bigint;
    let parsedAmount:string
    
    if(amountBought !== undefined){
      bigAmount = BigInt(amountBought);
      parsedAmount= dn.format([bigAmount, 18], { digits: 4, trailingZeros: true });
    } else {
      parsedAmount = "no Data";
    }

    return (
        <>
            <h2>User Data:</h2>
            <p>HUB Bought:   {parsedAmount} HUB</p>
            <div>ETH Spent:   {}</div>
            <div>UserId:  {}</div>
            <div>Buyer:   {}</div>
        </>
    )
}