import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  export const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache({
      addTypename: false
    })
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
export async function postNotes(data){
  const mutation = gql`
  mutation postNotes($data:[NoteinNotes]!){
    notes:createNotes(input:$data){
     id
     children{
       id 
       title
       visibility
     }
     title
     visibility
   }
   }
  `
  const {data:notes} = await client.mutate({mutation,variables:{data}})
  return notes
}
export async function getNotes(){
  const getnotesQuery = gql`
  query getNotes{
    notes{
      id
      children{
        id
        title
        visibility
      }
      title
      visibility
    }
  }
  `
  let {data} = await client.query({query:getnotesQuery})
  data = JSON.parse(JSON.stringify(data))
  if(data.notes){
    return data.notes
  }
  return []
}
export async function getAnalysis(){
  const getAnalysisquery = gql`
  query analysedWords{
    analysed{
      word
      sentence
    }
  }
  ` 
  let {data} = await client.query({query:getAnalysisquery})
  let {analysed} = data
  return analysed
}