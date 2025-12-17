# Configure a Salesforce Authentication Provider

Configure a Salesforce authentication provider so your users can log in to your custom external web app using their Salesforce credentials.

| Required Editions                                                                        |
| ---------------------------------------------------------------------------------------- |
| Available in: Lightning Experience and Salesforce Classic                                |
| Available in: **Enterprise**, **Performance**, **Unlimited**, and **Developer** Editions |

| User Permissions Needed |                                                  |
| ----------------------- | ------------------------------------------------ |
| To view the settings:   | View Setup and Configuration                     |
| To edit the settings:   | Customize Application AND Manage Auth. Providers |

Configuring a Salesforce authentication provider involves these high-level steps.

1.  Define the Salesforce authentication provider in your org.
2.  Test the connection.
3.  Add the authentication provider to your login page.

## Define the Salesforce Authentication Provider in Your Org

To set up the authentication provider in your org, you need the values from the Consumer Key and Consumer Secret fields of the connected app definition.

:::note

You can skip this step by allowing Salesforce to manage the values for you. For more information, see [Use Salesforce Managed Authentication Providers](https://help.salesforce.com/articleView?id=sso_provider_global_auth.htm).

:::

1.  From Setup, enter `Auth. Providers` in the Quick Find box, and then select **Auth. Providers** | **New**.
2.  For the provider type, select **Salesforce**.
3.  Enter a name for the provider.
4.  Enter the URL suffix, which is used in the client configuration URLs. For example, if the URL suffix of your provider is MySFDCProvider, your SSO URL is similar to `https://_mydomain_url or site_url_ /services/auth/sso/MySFDCProvider`.
5.  Paste the consumer key value from the connected app definition into the Consumer Key field.
6.  Paste the consumer secret value from the connected app definition into the Consumer Secret field.
7.  Optionally, set the following fields.

    1.  For Authorize Endpoint URL, specify an OAuth authorization URL.

        For Authorize Endpoint URL, the host name can include a sandbox or company-specific custom domain login URL. The URL must end in `.salesforce.com`, and the path must end in `/services/oauth2/authorize`. For example, `https://login.salesforce.com/services/oauth2/authorize`.

    2.  For Token Endpoint URL, specify an OAuth token URL.

        For Token Endpoint URL, the host name can include a sandbox or custom domain name. The URL must end in `.salesforce.com`, and the path must end in `/services/oauth2/token`. For example, `https://login.salesforce.com/services/oauth2/token`.

    3.  To automatically enable the OAuth 2.0 Proof Key for Code Exchange (PKCE) extension, which improves security, select **Use Proof Key for Code Exchange (PKCE) Extension**. For more information on how this setting helps secure your provider, see [Proof Key for Code Exchange (PKCE) Extension](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_pkce.htm).
    4.  For Default Scopes, enter the scopes to send along with the request to the authorization endpoint. Otherwise, the hard-coded default is used.

        For more information, see [Use the Scope URL Parameter](sso-provider-addl-params-scope.md).

    5.  If the authentication provider was created after the Winter ’15 release, the **Include identity organization’s organization ID for third-party account linkage** option no longer appears. Before Winter ’15, the destination org couldn’t differentiate between users with the same user ID on different orgs. For example, two users with the same user ID in different orgs were seen as the same user. As of Winter ’15, user identities contain the org ID, so this option isn’t needed. For older authentication providers, enable this option to keep identities separate in the destination org. When you enable this option, your users must reapprove all third-party links. The links are listed in the Third-Party Account Links section of a user’s detail page.
    6.  If you enter a consumer key and consumer secret, the consumer secret is included in SOAP API responses by default. To hide the secret in SOAP API responses, deselect **Include Consumer Secret in SOAP API Responses**. Starting in November 2022, the secret is always replaced in Metadata API responses with a placeholder value. On deployment, replace the placeholder with your consumer secret as plain text, or modify the value later through the UI.
    7.  For Custom Error URL, enter the URL for the provider to use to report any errors.
    8.  For Custom Logout URL, enter a URL to provide a specific destination for users after they log out, if they authenticated using the SSO flow. Use this field to direct users to a branded logout page or destination other than the default Salesforce logout page. The URL must be fully qualified with an http or https prefix, such as `https://acme.my.salesforce.com`.

        :::tip

        Configure [single logout](https://help.salesforce.com/articleView?id=slo_about.htm&type=5) (SLO) to automatically log out a user from Salesforce and the identity provider. As the relying party, Salesforce supports OpenID Connect SLO when the user logs out from the identity provider or Salesforce.

        :::

8.  Select an existing Apex class as the `Registration Handler` class. Or select **Automatically create a registration handler template** to create an Apex class template for the registration handler. Edit this class later, and modify the default content before using it.

    :::note

    A `Registration Handler` class is required for Salesforce to generate the SSO initialization URL.

    :::

9.  For Execute Registration As, select the user that runs the Apex handler class. The user must have the Manage Users permission. A user is required regardless of whether you’re specifying an existing registration handler class or creating one from the template.
10. To use a portal with your provider, select the portal from the Portal dropdown list.
11. For Icon URL, add a path to an icon to display as a button on the login page for a site. This icon applies to an Experience Cloud site only. It doesn’t appear on your Salesforce login page or My Domain login URL. Users click the button to log in with the associated authentication provider for the site.

    Specify a path to your own image, or copy the URL for one of our sample icons into the field.

12. To use the Salesforce multi-factor authentication (MFA) functionality instead of your identity provider’s MFA service, select **Use Salesforce MFA for this SSO provider**. This setting triggers MFA only for users who have MFA applied to them directly. For more information, see [Use Salesforce MFA for SSO](https://help.salesforce.com/s/articleView?id=sf.mfa_sso_logins.htm).
13. Click **Save**.

    Note the value of the Client Configuration URLs. You need the callback URL to complete the last step. Use the Test-Only initialization URL to check your configuration. Also note the Auth. Provider ID value because you use it with the `Auth.AuthToken` Apex class.

14. Return to the connected app definition that you created earlier from Setup. Paste the callback URL value from the authentication provider into the Callback URL field.

Several client configuration URLs are generated after defining the authentication provider.

Client configuration URLs support additional request parameters that enable you to direct users to log in to specific sites, obtain customized permissions from the third party, or go to a specific location after authenticating.

## Test the SSO Connection

In a browser, open the Test-Only Initialization URL on the Auth. Provider detail page. It redirects you to the authentication provider and asks you to sign in. You’re then asked to authorize your app. After you authorize, you’re redirected to Salesforce.

## Add the Authentication Provider to Your Login Page

Configure your login page to show the authentication provider as a login option. Depending on whether you’re configuring SSO for an org or Experience Cloud site, this step is different.

- For orgs, see [Add an Authentication Provider to Your Org's Login Page](https://help.salesforce.com/s/articleView?id=sf.sso_provider_org_login_page.htm).
- For Experience Cloud sites, see [Add an Authentication Provider to Your Experience Cloud Site’s Login Page](https://help.salesforce.com/s/articleView?id=sf.sso_provider_customer_add_login_option.htm).
