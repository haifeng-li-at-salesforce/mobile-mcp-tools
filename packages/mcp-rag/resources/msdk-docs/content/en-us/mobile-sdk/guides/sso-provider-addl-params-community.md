# Use the Experience Cloud URL Parameter

When you set up single sign-on (SSO) with an authentication provider, use the Experience Cloud site URL request parameter to send users to a specific site after authenticating. With the site parameter, you can determine whether a user logs in to your Salesforce org or in to an Experience Cloud site. This parameter can also change what type of user the registration handler creates.

| Required Editions                                                                        |
| ---------------------------------------------------------------------------------------- |
| Available in: Lightning Experience and Salesforce Classic                                |
| Available in: **Enterprise**, **Performance**, **Unlimited**, and **Developer** Editions |

| User Permissions Needed |                                                  |
| ----------------------- | ------------------------------------------------ |
| To view the settings:   | View Setup and Configuration                     |
| To edit the settings:   | Customize Application AND Manage Auth. Providers |

For example, you set up a Google authentication provider to configure SSO with your Salesforce org as the relying party. You want to send site users who log in with Google credentials to a custom site, so you add the site parameter to your SSO client configuration URL. A user goes to your org’s login page, clicks a Google login button, and enters their Google credentials. After Google authenticates the user, Salesforce redirects the user to your custom site.

If you add the site parameter to the Single Sign-On Initialization URL, Salesforce sends site users to the site after they log in. If you add the parameter to the Existing User Linking URL, the **Continue to Salesforce** link on the confirmation page leads to the site.

Without the site parameter, Salesforce sends the user to `/home/home.jsp` for a portal or standard application, or to the default sites page for a site after authentication.

**Example**

When you create an authentication provider, initialization and callback URLs direct to the appropriate My Domain login or site URL. In the example, _URLsuffix_ is the value you specified when you defined the authentication provider:

`https://{MyDomainName}.my.salesforce.com/services/auth/sso/URLsuffix`

- MyDomainName: A custom subdomain specific to a Salesforce org.
