# Authentication Provider SSO with Salesforce as the Relying Party

With authentication providers, your users can log in to your Salesforce org or Experience Cloud site with single sign-on (SSO) using credentials from a third party. Authentication providers also give your users access to protected third-party data. Salesforce offers several ways to configure authentication providers, such as with OpenID Connect or with a custom OAuth 2.0 configuration. Which protocol you can use depends on the third party.

| Required Editions                                                                        |
| ---------------------------------------------------------------------------------------- |
| Available in: Lightning Experience and Salesforce Classic                                |
| Available in: **Enterprise**, **Performance**, **Unlimited**, and **Developer** Editions |

<!-- -->

| User Permissions Needed |                                                  |
| ----------------------- | ------------------------------------------------ |
| To view the settings:   | View Setup and Configuration                     |
| To edit the settings:   | Customize Application AND Manage Auth. Providers |

You have several ways to configure an authentication provider.

- Predefined authentication providers
- Salesforce-managed authentication providers
- OpenID Connect authentication providers
- Custom authentication providers

After you configure an authentication provider in Salesforce, you can add it to your Salesforce login page or your Experience Cloud login page.

## Single Sign-On Authentication and Authorization Flow

Most authentication providers serve a dual purpose. In addition to authenticating users for SSO, they provide access to user data. With access to this third-party data, you can enrich your users’ Salesforce profiles with additional information after they log in with SSO.

For example, when a user logs in to Salesforce using their Facebook credentials, they can authorize access to their Facebook data. Facebook then sends Salesforce an access token, which you can use to access Facebook profile data in order to populate the user’s Salesforce user profile.
