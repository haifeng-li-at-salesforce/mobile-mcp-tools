# Define a Salesforce Auth. Provider

To enable external authentication in Salesforce, create an Auth. Provider.

External authentication through Facebook requires the App ID and App Secret from the Facebook app that you created in the previous step.

1.  In Setup, enter `Auth. Providers` in the Quick Find box, then select **Auth. Providers**.

2.  Click **New**.

3.  Configure the Auth. Provider fields as shown in the following table.

    <sfdocstbl><table><col /><col /><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td>Provider Type</td><td>Select <strong>Facebook</strong>.</td></tr><tr><td>Name</td><td>Enter FB Community Login.</td></tr><tr><td>URL Suffix</td><td>Accept the default.<br><br><em>Note: You may also provide any other string that conforms to URL syntax, but for this example the default works best.</em></td></tr><tr><td>Consumer Key</td><td>Enter the App ID from your Facebook app.</td></tr><tr><td>Consumer Secret</td><td>Enter the App Secret from your Facebook app.</td></tr><tr><td>Custom Error URL</td><td>Leave blank.</td></tr></tbody></table></sfdocstbl>

4.  For Registration Handler, click **Automatically create a registration handler template**.

5.  For Execute Registration As:, click Search ![Search icon](../../../media/search.png) and choose an Experience Cloud site member who has administrative privileges.

6.  Leave Portal blank.

7.  Click **Save**.

    Salesforce creates a new Apex class that extends `RegistrationHandler`. The class name takes the form _AutocreatedRegHandlerxxxxxx…_.

8.  Copy the Auth. Provider ID for later use.

9.  In the detail page for your new Auth. Provider, under Client Configuration, copy the Callback URL for later use.

    The callback URL takes the form `https://login.salesforce.com/services/authcallback/<*id*>/<*Auth.Provider_URL_Suffix>.`
