# Authorize Apps with OAuth

OAuth is an open protocol that authorizes a client application to access data from a protected resource through the exchange of tokens. OAuth tokens are essentially permissions given to a client application.

| Required Editions                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Available in: both Salesforce Classic ([not available in all orgs](https://help.salesforce.com/s/articleView?id=sf.overview_edition_lex_only.htm)) and Lightning Experience |
| Available in: **All** Editions                                                                                                                                              |

The resource server can validate the tokens and allow the client application access to the defined protected resources. In Salesforce, you can use OAuth authorization to approve a client application’s access to your org’s protected resources.

:::important

You can’t use OAuth independently to authenticate a user’s identity. Instead, use OpenID Connect as an authentication service in addition to OAuth authorization.

:::
