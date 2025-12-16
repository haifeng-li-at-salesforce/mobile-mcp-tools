# Login Screen Customization

Although Mobile SDK doesn’t control the Salesforce login page, you can still customize and brand it in certain cases.

## Customize the Login Screen Appearance through Mobile SDK

On iOS, you can also configure some properties of the login page, including the navigation bar and Settings icon. See [Customizing the iOS Login Screen Programmatically](oauth-hide-gear-icon.md)

## Customizing the Login Screen through the Salesforce Server

Salesforce Mobile SDK provides an OAuth implementation for its client apps, but it doesn’t define or control the login page. Instead, it requests the page from the Salesforce server. Salesforce then presents a web view that gathers your customer’s credentials. The login web view isn’t part of your Mobile SDK app.

To change the login web view on the server side, use your My Domain login URL or an Experience Cloud site URL.

Both of these features provide handy utilities for login page branding and customization. To use your branded page, you set the default login URL of your Mobile SDK app to the Experience Cloud site login page or My Domain login URL. Your app then displays your customized login page.
Use these links to learn about the features.

- [Use Your Branded Login Page](communities-branded-login.md)
- Customize Login, Self-Registration, and Password Management for Your Community—[https://help.salesforce.com/articleView?id=networks_customize_login.htm](https://help.salesforce.com/articleView?id=networks_customize_login.htm)
- My Domain—[https://help.salesforce.com/articleView?id=domain_name_overview.htm](https://help.salesforce.com/articleView?id=domain_name_overview.htm)
- My Domain login page customization instructions—[https://help.salesforce.com/articleView?id=domain_name_login_branding.htm](https://help.salesforce.com/articleView?id=domain_name_login_branding.htm)
- Sample My Domain customized login page—[https://github.com/salesforceidentity/MyDomain-Sample](https://github.com/salesforceidentity/MyDomain-Sample)
