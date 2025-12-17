# Using OpenID Tokens to Access External Services

If your Mobile SDK app requires approved services external to Salesforce, you can use OpenID tokens to perform the necessary authentication handshake.

Most Mobile SDK apps authenticate with Salesforce and use Mobile SDK REST API wrappers to access Salesforce resources. In this scenario, Mobile SDK handles authentication token exchanges behind the scenes without the app’s explicit involvement.

Some apps, however, also require data from an authenticated service that doesn’t accept Salesforce tokens. These services can come from products owned by Salesforce, such as Quip or Heroku, or sanctioned third parties. To make these external API calls from the Salesforce environment, you can use OpenID tokens.

## OpenID Tokens

An OpenID token allows the app that generates the token to share information with an external web service. For Mobile SDK purposes, the OpenID token shares the user’s and app’s identities. The external service that receives this token can then give the app a full set of external credentials for the user. Typically, OpenID tokens provided by Salesforce have short lifespans to limit opportunities for security breaches.

OpenID support requires configuration on the Salesforce server and in the Mobile SDK app. On the Salesforce side, org administrators configure connected apps to support OpenID tokens. In the Mobile SDK app, the developer configures the app’s OAuth scopes and calls a Mobile SDK method that provides an OpenID token. The app can then exchange this token for a full set of credentials from the external service. **The app is responsible for managing any external credentials it uses.**

For more information on OpenID, see [openid.net/what-is-openid](https://openid.net/developers/how-connect-works/).

## Configure Server-Side Settings

Connected app settings under API (Enable OAuth Settings) when you edit a new or existing connected app.

1.  Select **Enable OAuth Settings**.

    ![Enable OAuth Settings checkbox](../../../media/openid-enable-oauth-settings.png '{"class": "image-framed image-md"}')

2.  Under Selected OAuth Scopes, select **Allow access to your unique identifier (openid)** and click **Add**.

    !["openid" OAuth scope as listed in selection box](../../../media/openid-allow-access.png '{"class": "image-framed image-md"}')

3.  Select **Configure ID Token** and configure its subsettings as described in [Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm) in _Salesforce Help_.

    ![Configure ID Token section](../../../media/openid-configure-id-token.png '{"class": "image-framed image-md"}')

## App Configuration

1.  In the `bootconfig.xml` file (Android) or the `bootconfig.plist` file (iOS), add `openid` to the `oauthScopes` list.

    iOS:

    ![iOS openid setting in bootconfig.plist](../../../media/openid-scope-ios.png '{"class": "image-framed image-md"}')

    Android:

    ![Android openid setting in bootconfig.xml](../../../media/openid-scope-android.png '{"class": "image-framed image-md"}')

2.  To obtain an OpenID token string, call the platform-specific API.

    - iOS (Objective-C)

      - : Call the following method on the `SFSDKOAuth2` class.

        ```objectivec
        - (void)openIDTokenForRefresh:(SFSDKOAuthTokenEndpointRequest *)endpointReq
                           completion:(void (^)(NSString *))completionBlock;
        ```

    - Android

      - : Call the following method on the `OAuth2` class.

        ```java
        public static String getOpenIDToken(String loginServer, String clientId,
            String refreshToken);
        ```

## See Also

- [Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm) in _Salesforce Help_.
