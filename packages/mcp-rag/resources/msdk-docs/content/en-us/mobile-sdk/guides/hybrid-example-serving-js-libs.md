# Example: Serving the Appropriate Javascript Libraries

To provide the correct version of Javascript libraries, create a separate bundle for each Salesforce Mobile SDK version you use. Then, provide Apex code on the server that downloads the required version.

1.  For each Salesforce Mobile SDK version that your application supports, do the following.

    1.  Create a ZIP file containing the Javascript libraries from the intended SDK version.

    2.  Upload the ZIP file to your org as a static resource.

    For example, if you ship a client that uses Salesforce Mobile SDK v. 1.3, add these files to your ZIP file:

    - `cordova.force.js`
    - `SalesforceOAuthPlugin.js`
    - `bootconfig.js`
    - `cordova-1.8.1.js`, which you should rename as `cordova.js`

    :::note

    In your bundle, it’s permissible to rename the Cordova Javascript library as `cordova.js` (or `PhoneGap.js` if you’re packaging a version that uses a `PhoneGap-*x.x*.js` library.)

    :::

2.  Create an Apex controller that determines which bundle to use. In your controller code, parse the user agent string to find which version the client is using.

    1.  In your org, from Setup, click **Develop** | **Apex Class**.
    2.  Create a new Apex controller named `SDKLibController` with the following definition.

        ```apex
        public class SDKLibController {
          public String getSDKLib() {
            String userAgent =
              ApexPages.currentPage().
                getHeaders().get('User-Agent');

            if (userAgent.contains('SalesforceMobileSDK/1.3')) {
              return 'sdklib13';
            }
            // Add if statements for other SalesforceSDK versions
            // for which you provide library bundles.
          }
        }

        ```

3.  Create a Visualforce page for each library in the bundle, and use that page to redirect the client to that library.

    For example, for the SalesforceOAuthPlugin library:

    1.  In your org, from Setup, enter `Visualforce Pages` in the Quick Find box, then select **Visualforce Pages**.
    2.  Create a new page called “SalesforceOAuthPlugin” with the following definition.

        ```visualforce
        <apex:page controller="SDKLibController"
          action="{!URLFor($Resource[SDKLib],
         'SalesforceOAuthPlugin.js')}">
        </apex:page>
        ```

    3.  Reference the VisualForce page in a `<script>` tag in your HTML code. Be sure to point to the page you created in step 3b. For example:

        ```javascript
        <script type="text/javascript" src="/apex/SalesforceOAuthPlugin" />
        ```

        :::note

        Provide a separate `<script>` tag for each library in your bundle.

        :::
