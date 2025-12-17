## Revoke Tokens with a POST Request

To revoke OAuth 2.0 tokens, use the revocation endpoint.

`https://{MyDomainName}.my.salesforce.com/services/oauth2/revoke`

Construct a POST request that uses the `application/x-www-form-urlencoded` format in the HTTP request entity-body. For example:

```bash
    POST /revoke HTTP/1.1
    Host: https://MYDOMAINNAME.my.salesforce.com/services/oauth2/revoke
    Content-Type: application/x-www-form-urlencoded

    token=CURRENTTOKEN
```

If an access token is included, Salesforce invalidates it and revokes the token. If a refresh token is included, Salesforce revokes it and any associated access tokens.

Salesforce indicates successful processing of the request by returning an HTTP 200 status code. For all error conditions, Salesforce returns a 400 status code along with one of the following error responses.

- `unsupported_token_type`—Token type not supported
- `invalid_token`—Token was invalid

For a sandbox, use `_MyDomainName_--_SandboxName_.sandbox.my.salesforce.com` instead of `_MyDomainName_.my.salesforce.com`.

