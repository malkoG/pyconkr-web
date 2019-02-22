import 'isomorphic-unfetch'
import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://dev.pycon.kr/api/graphql'
})