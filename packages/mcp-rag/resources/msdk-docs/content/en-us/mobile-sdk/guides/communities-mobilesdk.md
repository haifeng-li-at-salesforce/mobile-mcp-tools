# Experience Cloud Sites and Mobile SDK Apps

To enable Experience Cloud site members to log into your Mobile SDK app, set the appropriate permissions in Salesforce, and change your app’s login server configuration to recognize your site URL.

With Experience Cloud sites, members that you designate can use your Mobile SDK app to access Salesforce. You define your own Experience Cloud site login endpoint, and Salesforce builds a branded site login page according to your specifications. It also lets you choose authentication providers and SAML identity providers from a list of popular choices.

Experience Cloud site membership is determined by profiles and permission sets. To enable site members to use your Mobile SDK app, configure the following:

- Make sure that each Experience Cloud site member has the API Enabled permission. You can set this permission through profiles or permission sets.
- Configure your Experience Cloud site to include your API-enabled profiles and permission sets.
- Configure your Mobile SDK app to use your Experience Cloud site’s login endpoint.

In addition to these high-level steps, you must take the necessary steps to configure your users properly. [Example: Configure an Experience Cloud Site For Mobile SDK App Access](communities-tutorial.md) walks you through the Experience Cloud site configuration process for Mobile SDK apps. For the full documentation of Experience Cloud sites, see the Salesforce Help.

:::note

Experience Cloud site login is supported for native and hybrid local Mobile SDK apps on iOS and Android. It is not currently supported for hybrid remote apps using Visualforce.

:::
