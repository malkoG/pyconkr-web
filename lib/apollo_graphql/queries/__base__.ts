import {
  ApolloClient,
  DocumentNode,
} from 'apollo-boost'
import { ModifiableWatchQueryOptions } from 'apollo-client/core/watchQueryOptions';

export type QueryDefinitionType<
  QueryResult,
  QueryVars,
> = {
  _type: '__QUERY_DEFINITION_TYPE';
  resultTYPEHOLDER: QueryResult;
  varsTYPEHOLDER: QueryVars;
  query: DocumentNode;
}
export function createQueryDefinition<QueryResult, QueryVars> (
  query: DocumentNode,
): QueryDefinitionType<QueryResult, QueryVars> {
  return {
    _type: '__QUERY_DEFINITION_TYPE',
    resultTYPEHOLDER: undefined as any,
    varsTYPEHOLDER: undefined as any,
    query,
  }
}

export function sendQuery<
  QueryResult,
  QueryVars,
> (
  queryDefinition: QueryDefinitionType<QueryResult, QueryVars>
) {
  return (apolloClient: ApolloClient<any>) => {
    return (variables: QueryVars) =>
      apolloClient.query<QueryResult, QueryVars>({
        query: queryDefinition.query,
        variables,
        // context: {
        //   headers: {
        //     Authorization: getAuthorization(),
        //   }
        // }
      })
  }
}

export function watchQuery<
  QueryResult,
  QueryVars,
> (
  queryDefinition: QueryDefinitionType<QueryResult, QueryVars>,
) {
  return (apolloClient: ApolloClient<any>) => {
    return (
      variables: QueryVars,
      watchOptions?: ModifiableWatchQueryOptions<QueryVars>,
    ) =>
      apolloClient.watchQuery<QueryResult, QueryVars>({
        ...watchOptions,
        query: queryDefinition.query,
        variables,
      })
  }
}

// const storage = sessionStorage
// const getAuthorization = (data: any) => {
//   const session = storage.getSession()
//   if (!data && !session) return

//   const email = (data && data.email) || session.token
//   const password = (data && data.password) || ''
//   // Wrap with Base64 format basically like this -> Base64(email:password)
//   const payload = Buffer.from(`${email}:${password}`).toString('base64')
//   return `Basic ${payload}`
// }