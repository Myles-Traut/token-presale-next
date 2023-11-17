import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query/53386/token-ps-final/0.0.1'

const tokensQuery = `
  query {
    hubBought(id: "0xe6ba5Bb7238e7C38C7c5Ff5F0dA2223C50A466f8") {
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
})

const userData = client
  .query({
    query: gql(tokensQuery),
  })
  .then((data) => (data.data.hubBought.hubBought))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })


export default function UserData() {
    return (
        <>
            <h2>User Data</h2>
        </>
    )
}