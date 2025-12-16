# Configure Your Facebook App

Next, you need to configure the Experience Cloud site to use your Salesforce Auth. Provider for logins.

Now that you’ve defined a Salesforce Auth. Provider, complete the authentication protocol by linking your Facebook app to your Auth. Provider. You provide the Salesforce login URL and the callback URL, which contains your Auth. Provider ID and the Auth. Provider’s URL suffix.

1.  In your Facebook app, go to **Settings**.

2.  In App Domains, enter <code>_MyDomainName_.my.salesforce.com</code>.

3.  Click **+Add Platform**.

4.  Select **Website**.

5.  For Site URL, enter your Auth. Provider’s callback URL.

6.  For **Contact Email**, enter your valid email address.

7.  In the left panel, set Status & Review to **Yes**. With this setting, all Facebook users can use their Facebook logins to create user accounts in your Experience Cloud site.

8.  Click **Save Changes**.

9.  Click **Confirm**.
