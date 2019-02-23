/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OAuthTokenAuth
// ====================================================

export interface OAuthTokenAuth_oAuthTokenAuth {
  __typename: "OAuthTokenAuth";
  token: string | null;
}

export interface OAuthTokenAuth {
  oAuthTokenAuth: OAuthTokenAuth_oAuthTokenAuth | null;
}

export interface OAuthTokenAuthVariables {
  clientId: string;
  oauthType: string;
  code: string;
}
