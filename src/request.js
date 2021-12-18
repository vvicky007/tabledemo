import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  export const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache()
  });

const getTableData = gql`
query getTableData($start:Int!,$end:Int!){
    tableData(start:$start,end:$end){
      providerid
      providername
      providergroupid
      providergroup
      providerphone
      level1status
      categoryofclosedcharts
      chartsopen
    }
  }
`
export async function getData(start,end){
    const {data} = await client.query({query:getTableData,variables:{start,end}})
    const {tableData} = data;
    return tableData
} 