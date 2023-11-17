import { ApolloClient, InMemoryCache, gql } from '@apollo/client'


export default function UserData() {
    const APIURL = 'https://api.studio.thegraph.com/query/53386/token-ps-final/0.0.1'

    const tokensQuery = `
        query {
            hubBought(id: "0xe6ba5Bb7238e7C38C7c5Ff5F0dA2223C50A466f8") {
                buyer
                ethSpent
                hubBought
                id
            }
        }`

    const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
    })

    let amountBought;

    client.query({
        query: gql(tokensQuery),
    })
    .then((data) => amountBought = data.data.hubBought.buyer)
    .catch((err) => {
        console.log('Error fetching data: ', err)
    });

    return (
        <>
            <h2 className="text-white">{amountBought}</h2>
        </>
    )
}