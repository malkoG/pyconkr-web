import {
  ApolloClient,
  DocumentNode,
} from 'apollo-boost'

export type MutationDefinitionType<
  MutationResult,
  MutationVars,
> = {
  _type: '__MUTATION_DEFINITION_TYPE';
  resultTYPEHOLDER: MutationResult;
  varsTYPEHOLDER: MutationVars;
  mutation: DocumentNode;
}

export function createMutationDefinition<
  MutationResult,
  MutationVars,
> (
  mutation: DocumentNode,
): MutationDefinitionType<MutationResult, MutationVars> {
  return {
    _type: '__MUTATION_DEFINITION_TYPE',
    resultTYPEHOLDER: undefined as any,
    varsTYPEHOLDER: undefined as any,
    mutation,
  }
}

export function sendMutation<
  MutationResult,
  MutationVars,
> (
  mutationDefinition: MutationDefinitionType<
    MutationResult, MutationVars
  >,
) {
  return (apolloClient: ApolloClient<any>) => {
    return (variables: MutationVars) =>
      apolloClient.mutate<MutationResult, MutationVars>({
        mutation: mutationDefinition.mutation,
        variables,
      })
  }
}

export function createMutation<MutationResult, MutationVars> (
  mutation: DocumentNode,
) {
  return (apolloClient: ApolloClient<any>) => {
    return (variables: MutationVars) =>
      apolloClient.mutate<MutationResult, MutationVars>({
        mutation,
        variables,
      })
  }
}
