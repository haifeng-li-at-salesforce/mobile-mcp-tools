## Identity URL Response

With a successful request, the identity URL response returns information about the queried user and org.

The following identity URL response is in XML format.

```nolang
<?xml version="1.0" encoding="UTF-8"?>
<user xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<id>https://MYDOMAINNAME.my.salesforce.com/id/00Dx000.../005x000...</id>
<asserted_user>true</asserted_user>
<user_id>005x000000...</user_id>
<organization_id>00Dx000...</organization_id>
<nick_name>admin1.2777578168398293E12...</nick_name>
<display_name>Alan Van</display_name>
<email>admin@mycompany.com</email>
<status>
   <created_date xsi:nil="true"/>
   <body xsi:nil="true"/>
</status>
<photos>
   <picture>https://MYDOMAINNAME--03925205UAF.file.force-user-content.com</picture>
   <thumbnail>https://MYDOMAINNAME--03925205UAF.file.force-user-content.com</thumbnail>
</photos>
<urls>
   <enterprise>https://MYDOMAINNAME.my.salesforce.com/services/Soap/c/{version}/00Dx000...</enterprise>
   <metadata>https://MYDOMAINNAME.my.salesforce.com/services/Soap/m/{version}/00Dx000...</metadata>
   <partner>https://MYDOMAINNAME.my.salesforce.com/services/Soap/u/{version}/00Dx000...</partner>
   <rest>https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/
   </rest>
   <sobjects>https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/sobjects/
   </sobjects>
   <search>https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/search/
   </search>
   <query>https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/query/
   </query>
   <profile>https://MYDOMAINNAME.my.salesforce.com/005x000...</profile>
</urls>
<active>true</active>
<user_type>STANDARD</user_type>
<language>en_US</language>
<locale>en_US</locale>
<utcOffset>-28800000</utcOffset>
<last_modified_date>2021-04-28T20:54:09.000Z</last_modified_date>
</user>
```

And this response is in JSON format.

```nolang
{"id":"https://MYDOMAINNAME.my.salesforce.com/id/00Dx000.../005x000...",
"asserted_user":true,
"user_id":"005x000...",
"organization_id":"00Dx000...",
"nick_name":"admin1.2777578168398293E12...",
"display_name":"Alan Van",
"email":"admin@mycompany.com",
"status":{"created_date":null,"body":null},
"photos":{"picture":"https://MYDOMAINNAME--03925205UAF.file.force-user-content.com",
   "thumbnail":"https://MYDOMAINNAME--03925205UAF.file.force-user-content.com"},
"urls":
   {"enterprise":"https://MYDOMAINNAME.my.salesforce.com/services/Soap/c/{version}/00Dx000...",
   "metadata":"https://MYDOMAINNAME.my.salesforce.com/services/Soap/m/{version}/00Dx000...",
   "partner":"https://MYDOMAINNAME.my.salesforce.com/services/Soap/u/{version}/00Dx000...",
   "rest":"https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/",
   "sobjects":"https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/sobjects/",
   "search":"https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/search/",
   "query":"https://MYDOMAINNAME.my.salesforce.com/services/data/v{version}/query/",
   "profile":"https://MYDOMAINNAME.my.salesforce.com/005x000..."},
"active":true,
"user_type":"STANDARD",
"language":"en_US",
"locale":"en_US",
"utcOffset":-28800000,
"last_modified_date":"2021-04-28T20:54:09.000+0000"}
```

This table describes the returned parameters.

<sfdocstbl><table><col /><col /><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>id</code></td><td>Identity URL, which is the same URL that was queried.</td></tr><tr><td><code>asserted\*user</code></td><td>Boolean value indicating whether the specified access token was issued for this identity.</td></tr><tr><td><code>user_id</code></td><td>User ID of the queried user.</td></tr><tr><td><code>username</code></td><td>Username of the queried user.</td></tr><tr><td><code>organization_id</code></td><td>ID of the queried user’s Salesforce org.</td></tr><tr><td><code>nick_name</code></td><td>Experience Cloud nickname of the queried user.</td></tr><tr><td><code>display_name</code></td><td>Display name (full name) of the queried user.</td></tr><tr><td><code>email</code></td><td>Email address of the queried user.</td></tr><tr><td><code>email_verified</code></td><td>Indicates whether the queried user’s email was verified by clicking a link in the “Welcome to Salesforce” email.<p>The email_verified value is set to <code>true</code> when users click a link in the email they receive after the following:</p><ul><li><p>They change their email address</p></li><li><p>They change their password, or a Salesforce admin resets their password</p></li><li><p>They verify their identity when logging in from a new device or browser</p></li><li><p>A Salesforce admin creates them as a new user</p></li></ul><p>For example, a Salesforce admin creates the user Roberta Smith. Roberta receives a “Welcome to Salesforce” email message with a link to verify her account. After she clicks the link, the email_verified value is set to <code>true</code>.</p></td></tr><tr><td><code>first_name</code></td><td>First name of the queried user.</td></tr><tr><td><code>last_name</code></td><td>Last name of the queried user.</td></tr><tr><td><code>timezone</code></td><td>Time zone specified in the queried user’s settings</td></tr><tr><td><code>photos</code></td><td>Map of URLs to the queried user’s profile pictures, specified as <code>picture</code> or <code>thumbnail</code>.<br><br><em>Note: Accessing these URLs requires passing an access token. See <a>access token</a>.</em></td></tr><tr><td><code>addr_street</code></td><td>Street specified in the address of the queried user’s settings.</td></tr><tr><td><code>addr_city</code></td><td>City specified in the address of the queried user’s settings.</td></tr><tr><td><code>addr_state</code></td><td>State specified in the address of the queried user’s settings.</td></tr><tr><td><code>addr_country</code></td><td>Country specified in the address of the queried user’s settings.</td></tr><tr><td><code>addr_zip</code></td><td>Zip or postal code specified in the address of the queried user’s settings.</td></tr><tr><td><code>mobile_phone</code></td><td>Mobile phone number specified in the queried user’s settings.</td></tr><tr><td><code>mobile_phone_verified</code></td><td>Queried user confirmed that the mobile phone number is valid,</td></tr><tr><td><code>status</code></td><td>Queried user’s current Chatter status.<ul><li><p><code>created_date</code>—<code>xsd datetime</code> value of the creation date of the last post by the user, for example, 2010-05-08T05:17:51.000Z.</p></li><li><p><code>body</code>—Body of the post.</p></li></ul></td></tr><tr><td><code>urls</code></td><td>Map containing various API endpoints that can be used with the queried user <br><br><em>Note: Accessing the REST endpoints requires passing an access token. See <a>access token</a>.</em><ul><li><p><code>enterprise</code> (SOAP)</p></li><li><p><code>metadata</code> (SOAP)</p></li><li><p><code>partner</code> (SOAP)</p></li><li><p><code>rest</code> (REST)</p></li><li><p><code>sobjects</code> (REST)</p></li><li><p><code>search</code> (REST)</p></li><li><p><code>query</code> (REST)</p></li><li><p><code>recent</code> (REST)</p></li><li><p><code>profile</code></p></li><li><p><code>feeds</code> (Chatter)</p></li><li><p><code>feed-items</code> (Chatter)</p></li><li><p><code>groups</code> (Chatter)</p></li><li><p><code>users</code> (Chatter)</p></li><li><p><code>custom_domain</code></p><br><br><em> Note: If the org doesn’t have a custom domain configured and propagated, this value is omitted.</p></pre></li></ul></td></tr><tr><td><code>active</code></td><td>Boolean specifying whether the queried user is active.</td></tr><tr><td><code>user_type</code></td><td>Type of the queried user.</td></tr><tr><td><code>language</code></td><td>Language of the queried user.</td></tr><tr><td><code>locale</code></td><td>Locale of the queried user.</td></tr><tr><td><code>utcOffset</code></td><td>Offset from UTC of the queried user’s time zone, in milliseconds.</td></tr><tr><td><code>last_modified_date</code></td><td><code>xsd datetime</code> format of the last modification of the user, for example, 2010-06-28T20:54:09.000Z.</td></tr><tr><td><code>is_app_installed</code></td><td>Value is <code>true</code> when the connected app is installed in the user’s org, and the user’s access token was created using an OAuth flow. If the connected app isn’t installed, the response doesn’t contain this value. When parsing the response, check for the existence and value of this property.</td></tr><tr><td><code>mobile_policy</code></td><td>Specific values for managing a mobile connected app. These values are available only when the connected app is installed in the current user’s org, the app has a defined session timeout value, and the mobile PIN has a length value defined.<ul><li><p><code>screen_lock</code>—Length of time to wait to lock the screen after inactivity.</p></li><li><p><code>pin_length</code>—Length of the identification number required to gain access to the mobile app.</p></li></ul></td></tr><tr><td><code>push_service_type</code></td><td>Set to <code>apple</code> if the connected app is registered with Apple Push Notification Service (APNS) for iOS push notifications. Set to <code>androidGcm</code> if it’s registered with Google Cloud Messaging (GCM) for Android push notifications. <p>The response value type is an array.</p></td></tr><tr><td><code>custom_permissions</code></td><td>When a request includes the <code>custom_permissions</code> scope parameter, the response includes a map containing custom permissions in the org associated with the connected app. If the connected app isn’t installed in the org or has no associated custom permissions, the response doesn’t contain a <code>custom_permissions</code> map.

</td></tr></tbody></table></sfdocstbl>

### Example

Here’s an example request that includes the `custom_permissions` scope parameter.

```
http://MYDOMAINNAME.my.salesforce.com/services/oauth2/authorize?response_type=token&client*
                  id=3MVG9lKcPoNINVBKV6EgVJiF.snSDwh6*2wSS7BrOhHGEJkC\*&redirect_uri=http://www.example.org/qa/security/oauth
                  /useragent_flow_callback.jsp&scope=api%20id%20custom_permissions
```

Here’s the JSON block in the identity URL response.

```
"custom_permissions":
                     {
                     "Email.View":true,
                     "Email.Create":false,
                     "Email.Delete":false
                     }
```
