# Example: Configure an Experience Cloud Site For Facebook Authentication

You can extend the reach of your Experience Cloud site by configuring an external authentication provider to handle site logins.

This example extends the previous example to use Facebook as an authentication front end. In this simple scenario, we configure the external authentication provider to accept any authenticated Facebook user into the Experience Cloud site.

If your Experience Cloud site is already configured for mobile app logins, you don’t need to change your mobile app or your connected app to use external authentication. Instead, you define a Facebook app, a Salesforce Auth. Provider, and an Auth. Provider Apex class. You also make a minor change to your Experience Cloud site setup.
