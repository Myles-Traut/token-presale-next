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
  userData: any;
}
export default function UserData({ userData }: Props) {
    let amountBought: string = userData.data.hubBought?.hubBought;
    let bigAmount: bigint;
    let parsedAmount:string

    let amountSpent: string = userData.data.hubBought?.ethSpent;
    let bigAmountSpent: bigint;
    let parsedAmountSpent:string

    let id: string = userData.data.hubBought?.id;
    let buyer: string = userData.data.hubBought?.buyer;
    
    if(amountBought !== undefined){
      bigAmount = BigInt(amountBought);
      parsedAmount= dn.format([bigAmount, 18]);
    } else {
      parsedAmount = "no Data";
    }

    if(amountSpent !== undefined){
      bigAmountSpent = BigInt(amountSpent);
      parsedAmountSpent= dn.format([bigAmountSpent, 18]);
    } else {
      parsedAmountSpent = "no Data";
    }

    if(id === undefined){
      id = "No Data";
    }
    if(buyer === undefined) {
      buyer = "No Data";
    } 

    return (
        <>
            <h2>User Data:</h2>
            <p>HUB Bought:   {parsedAmount} HUB</p>
            <div>ETH Spent:   {parsedAmountSpent} ETH</div>
            <div>UserId:  {id}</div>
            <div>Buyer:   {buyer}</div>
        </>
    )
}