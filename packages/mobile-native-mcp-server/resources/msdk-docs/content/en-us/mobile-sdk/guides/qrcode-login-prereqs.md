# QR Code Login Prerequisites

Set up one-time token exchange, configure an Apex class, and set up a Visualforce page. 

## Set Up One-Time Token Exchange 
1.  Generate a self-signed certificate and name it JWT_Bearer. See [_Salesforce Help_: Generate a Self-Signed Certificate](https://help.salesforce.com/s/articleView?id=sf.security_keys_creating.htm&type=5).
2.  Download the certificate.
3.  [Create a connected app](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/connected-apps-howto.html) and set its client ID to `jwtClientId`.
4.  Enable digital signatures. 
5.  Upload the certificate that you downloaded in step 2.
6.  In **App Manager**, go to **Selected OAuth Scopes** and add **Manage user data via Web browsers (web)** and **Perform requests at any time (refresh_token, offline_access)**. 
7.  In your connected app, go to **Manage** > **Edit Policies** > **OAuth Policies** and set the **Permitted Users** dropdown to **Admin approved users are pre-authorized**. 

## Generate Login URLs with an Apex Controller Class
One of the requirements for QR code login is a properly configured Apex controller class. The Apex controller class generates the login URL by using the UI Bridge API and provides it to the Visualforce page before it’s encoded to the QR code. You can set up your Apex controller class to generate the login URL by using either the OAuth 2.0 hybrid web server flow or the OAuth 2.0 hybrid user-agent token flow. For more information on Apex, UI Bridge API, and the auth flow options, see:

- [What is Apex?](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm)
- [_Salesforce Help_: Generate a Frontdoor URL to Bridge into UI Sessions](https://help.salesforce.com/s/articleView?id=sf.frontdoor_singleaccess.htm&type=5)
- [_Salesforce Help_: OAuth 2.0 Hybrid Web Server Flow](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_hybrid_web_server_flow.htm&type=5)
- [_Salesforce Help_: OAuth 2.0 Hybrid User-Agent Token Flow for Web Session Management](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_hybrid_app_token_flow.htm&type=5)

To create an Apex class, complete these steps.
1. In **Salesforce Setup**, search for and select **Apex Classes**. 
2. Click **New**, and then fill in a name for your Apex Class.
   - If you’re using OAuth 2.0 hybrid web server flow, see [Configure Your Apex Class with Web Server Flow](#configure-your-apex-class-with-web-server-flow).
   - If you’re using OAuth 2.0 user-agent flow, see [Configure Your Apex Class with User-Agent Flow](#configure-your-apex-class-with-user-agent-flow).
3.  Click **Save** or **Quick Save**.

## Configure Your Apex Class with Web Server Flow

To configure your Apex class with web server flow, add this code sample in the **Apex Class** tab. Make sure to fill in the class’s placeholder variables with their corresponding values. For variable descriptions, see the code comments. 

```
public class QRCodeLoginController {

   // The generated one-time-use hyperlink for the QR code payload.
   public String qrCodeOneTimeLoginHyperlink {get;set;}
  
   // The self-signed certificate name.
   private String selfSignedCertName = 'JWT_Bearer';

   // The connected app client ID. 
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String jwtClientId = 'CONNECTED_APP_CLIENT_ID';

   // The Salesforce instance URL.
   private String instanceUrl = 'INSTANCE_URL';

   // The Salesforce Identity API OAuth 2.0 token endpoint URL.
   private String oauth2TokenEndpoint = instanceUrl + '/services/oauth2/token';

   // The Salesforce Identity API OAuth 2.0 UI bridge single access endpoint URL.
   private String oauth2SingleAccessEndpoint = instanceUrl + 
   '/services/oauth2/singleaccess';

   // The mobile app’s client ID.
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String mobileClientId = 'MOBILE_CLIENT_ID';
  
   // The connected app’s callback URL.
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String callbackURL = 'CALLBACK_URL';
  
   // The mobile app’s deep link URL.
   // (Includes the custom scheme, host, and path 
   // that the app is configured to be linked from)
   private String mobileDeepLinkUrl = 'MOBILE_DEEP_LINK_URL';

   /**
    * Generate the QR code’s one-time-login hyperlink. The operation is
    * asynchronous and the generated hyperlink is stored in 
    * `qrCodeOneTimeLoginHyperlink`.
    */
   public PageReference generateQrCodeOneTimeLoginHyperlink() {

       // Generate PKCE code verifier and code challenge.
       String codeVerifier = generateCodeVerifier();
       String codeChallenge = generateCodeChallenge(codeVerifier);
      
       // Generate the client start URL.
       String clientStartUrl = '/services/oauth2/authorize' + 
       '?response_type=code&client_id=' + encode(mobileClientId) + 
       '&redirect_uri=' + encode(callbackURL) + '&code_challenge=' + 
       encode(codeChallenge);
      
       // Generate the UI Bridge API Front Door URL.
       String uiBridgeFrontDoorUrl = generateUiBridgeFrontDoorUrl(clientStartUrl);
      
       // Assemble the log in QR code’s JSON payload.
       Map<String, String> jsonPayload = new Map<String, String>();
       jsonPayload.put('frontdoor_bridge_url', uiBridgeFrontDoorUrl);
       jsonPayload.put('pkce_code_verifier', codeVerifier);
       String jsonPayloadString = JSON.serialize(jsonPayload);
       String jsonPayloadUrlEncoded = EncodingUtil.urlEncode(
        jsonPayloadString, 'UTF-8');


       qrCodeOneTimeLoginHyperlink = mobileDeepLinkUrl + '?bridgeJson=' + 
       jsonPayloadUrlEncoded;
       return null;
   }

   /*
    * Generates the UI Bridge API Front Door URL by using the provided client
    * start URL.
    */
   private String generateUiBridgeFrontDoorUrl(String startUrl) {
       String accessToken = getAccessToken();


       Http http = new Http();
       HttpRequest request = new HttpRequest();
       request.setMethod('POST');


       String url = oauth2SingleAccessEndpoint;
       request.setEndpoint(url);


       String body = 'redirect_uri=' + encode(startUrl);
       request.setBody(body);


       request.setHeader('Content-Type','application/x-www-form-urlencoded');
       request.setHeader('Authorization','Bearer ' + accessToken);


       HttpResponse response = http.send(request);
       SingleAccessResponse singleAccessResponse = 
       (SingleAccessResponse)JSON.deserialize(response.getBody(), 
       SingleAccessResponse.class);


       return singleAccessResponse.frontdoor_uri;
   }


   /*
    * Gets the access token.
    */
   private String getAccessToken() {
       Auth.JWT jwt = new Auth.JWT();
       jwt.setSub(UserInfo.getUserName());
       jwt.setAud('https://login.test1.pc-rnd.salesforce.com');
       jwt.setIss(jwtClientId);


       // Additional claims to set scope
       Map<String, Object> claims = new Map<String, Object>();


       // Create the object that signs the JWT bearer token with a hardcoded 
       // certificate developer name for POC.
       Auth.JWS jws = new Auth.JWS(jwt, selfSignedCertName);


       // POST the JWT bearer token.
       Auth.JWTBearerTokenExchange bearer = 
       new Auth.JWTBearerTokenExchange(oauth2TokenEndpoint, jws);
       String accessToken = bearer.getAccessToken();


       return accessToken;
   }


   /*
    * Generates a PKCE code verifier.
    */
   private String generateCodeVerifier() {
       // Code verifier set up.
       String codeVerifierCharacterSet = 
       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
       Integer codeVerifierLength = 128;

       // Generate code verifier string.
       String codeVerifier = '';
       for (Integer i = 0; i < codeVerifierLength; i++) {
           Integer index = Math.mod(Math.abs(Crypto.getRandomInteger()), 
           codeVerifierCharacterSet.length());
           codeVerifier += codeVerifierCharacterSet.substring(index, index + 1);
       }

       // Encode code verifier string to Base64 spec.
       codeVerifier = EncodingUtil.base64Encode(Blob.valueOf(codeVerifier));

       // Encode code verifier Base64 to Base64 URL-safe spec.
       codeVerifier = codeVerifier
       .replace('+', '-').replace('/', '_').replace('=', '');
       return codeVerifier;
   }

   /*
    * Generates a PKCE code challenge from the provided code verifier.
    */
   private String generateCodeChallenge(String codeVerifier) {
       // Generate code challenge string from code verifier.
       Blob codeVerifierBlob = Blob.valueOf(codeVerifier);
       Blob codeChallenge256Blob = Crypto.generateDigest('SHA-256', codeVerifierBlob);

       // Encode code challenge string to Base64 spec.
       String codeChallengeBase64Encoded = 
       EncodingUtil.base64Encode(codeChallenge256Blob);

       // Encode code challenge Base64 to Base64 URL-safe spec.
       String codeChallengeBase64UrlSafeEncoded = 
       codeChallengeBase64Encoded.replace('+', '-').replace('/', '_').replace('=', '');

       return codeChallengeBase64UrlSafeEncoded;
   }

   /*
    * URL encodes a string.
    */
   private String encode(String value) {
       return EncodingUtil.urlEncode(value, 'UTF-8');
   }

   /*
    * Encodes a given Base64 string to the Base64 URL-safe spec.
    */
   private String base64ToBase64UrlSafe(String base64Value) {
     return base64Value.replace('+', '-').replace('/', '_').replace('=', '');
   }

   /*
    * A class to model responses from the 
    * Salesforce Identity OAuth 2.0 UI bridge single access endpoint.
    */
   private class SingleAccessResponse {
       public string frontdoor_uri;
   }
}
```

## Configure Your Apex Class with User-Agent Flow

To configure your Apex class with user-agent flow, add this code sample in the Apex Class tab.

```
public class QRCodeLoginController {
   public String qrCodeOneTimeLoginHyperlink {get;set;}

   //
   // One Time Use Token Exchange
   //

   // The connected app client ID. 
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String jwtClientId = 'CONNECTED_APP_CLIENT_ID';

   // The self-signed certificate name.
   private String selfSignedCertName = 'JWT_Bearer';

   // The Salesforce instance URL.
   private String instanceUrl = 'INSTANCE_URL';

   // The Salesforce Identity API OAuth 2.0 token endpoint URL.
   private String tokenEndpoint = instanceUrl + '/services/oauth2/token';

   // The Salesforce Identity API OAuth 2.0 UI bridge single access endpoint URL.
   private String oneTimeTokenEndpoint = instanceUrl + 
   '/services/oauth2/singleaccess';

   //
   // Mobile App Configuration
   //

   // The mobile app’s client ID.
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String mobileClientId = 'MOBILE_CLIENT_ID';

   // The connected app’s callback URL.
   // (From Setup, Manage Apps, Connected Apps, and Manage Consumer Details.)
   private String callbackURL = 'CALLBACK_URL';
  
   // The mobile app’s deep link URL.
   // (Includes the custom scheme, host, and 
   // path that the app is configured to be linked from)
   private String mobileDeepLinkUrl = 'MOBILE_DEEP_LINK_URL';


   /**
    * Generate mobile sign in link
    *  The operation is asynchronous 
    *  and the generated link is stored in qrCodeOneTimeLoginHyperlink
    */
   public PageReference generateQrCodeOneTimeLoginHyperlink() {

       String mobileStartURL = '/services/oauth2/authorize' + 
       '?response_type=hybrid_token&client_id=' + encode(mobileClientId) + 
       '&redirect_uri=' + encode(callbackURL);

       String bridgeUrl = this.generateBridgeUrl(mobileStartURL);
       Map<String, String> jsonMap = new Map<String, String>();
       jsonMap.put('frontdoor_bridge_url', bridgeUrl);
       String jsonString = JSON.serialize(jsonMap);
       String encodedJsonString = EncodingUtil.urlEncode(jsonString, 'UTF-8');

       this.qrCodeOneTimeLoginHyperlink = 
       mobileDeepLinkURL + '?bridgeJson=' + encodedJsonString;
       return null;
   }

   private String generateBridgeUrl(String startURL) {
       String accessToken = getAccessToken();

       Http h = new Http();
       HttpRequest req = new HttpRequest();
       req.setMethod('POST');

       String url = oneTimeTokenEndpoint;
       req.setEndpoint(url);

       String body = 'redirect_uri=' + encode(startURL);
       req.setBody(body);

       //Add Headers
       req.setHeader('Content-Type','application/x-www-form-urlencoded');
       req.setHeader('Authorization','Bearer ' + accessToken);

       //Send Authorization Request
       HttpResponse res = h.send(req);
       oneTimeUseResponse otur = 
       (oneTimeUseResponse)JSON.deserialize(res.getBody(), oneTimeUseResponse.class);

       return otur.frontdoor_uri;
   }

   private String getAccessToken() {
       Auth.JWT jwt = new Auth.JWT();
       jwt.setSub(UserInfo.getUserName());
       jwt.setAud('https://login.test1.pc-rnd.salesforce.com');
       jwt.setIss(jwtClientId);

       //Additional claims to set scope
       Map<String, Object> claims = new Map<String, Object>();

       //Create the object that signs the JWT bearer token, 
       // hardcoded cert dev name for POC
       Auth.JWS jws = new Auth.JWS(jwt, selfSignedCertName);

       //POST the JWT bearer token
       Auth.JWTBearerTokenExchange bearer = 
       new Auth.JWTBearerTokenExchange(tokenEndpoint, jws);

       String accessToken = bearer.getAccessToken();

       return accessToken;
   }

   private String encode(String value) {
       return EncodingUtil.urlEncode(value, 'UTF-8');
   }

   private class oneTimeUseResponse {
       public string frontdoor_uri;
   }
}
```



## Encode Login URLs to QR Codes with a Visualforce Page

Your Visualforce page invokes the Apex controller class, receives the generated UI Bridge API login URL, then encodes it to a QR code for the app to scan.

For more information on Visualforce pages, see [Creating Your First Page](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_quick_start_hello_world.htm) in the Visualforce Developer Guide. 

To set up a Visualforce page for QR code login, follow these steps.
1. In **Salesforce Setup**, search for and select **Visualforce Pages**.
2. Click **New**, and then fill in a name for your Visualforce page. 
3. Click the **Page Editor** bar at the bottom of the browser, and then add this Visualforce markup. 


```
<apex:page controller="QRCodeLoginController">
<div style="padding:70px">
    
    <script type='text/javascript' 
    src='https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js'> 
    </script>
    
    <h1 style="font-size: large">Do you believe in magic?</h1>
    
    <div id="qrcode" style="margin-bottom: 10px; margin-top: 10px"></div>
    
    <div id="debug"></div>
    
    <apex:form >
        <apex:commandButton action="{!generateQrCodeOneTimeLoginHyperlink}" 
        value="Generate Mobile Sign-In URL" 
        style="margin-left:44px; margin-top:10px; margin-bottom: 10px"/>
        <br></br> 
            <script type="text/javascript">
                console.log("{!qrCodeOneTimeLoginHyperlink}"); 
                qrText = "{!qrCodeOneTimeLoginHyperlink}";

                new QRCode(document.getElementById("qrcode"), {
                  text: qrText,
                  width: 512,
                  height: 512,
                  colorDark : "#000000",
                  colorLight : "#ffffff",
                  correctLevel : QRCode.CorrectLevel.L 
                  // Note, these QR codes may be about 2,000 characters long.
                  // Higher correctness levels may render the QR code over 
                  // the allowed data length and be unreadable.
                });
                document.getElementById("debug").innerHTML = qrText;                
            </script>
    </apex:form>
</div>
</apex:page>

```

:::note
If you changed any function names in the sample Apex code, make sure that your Visualforce page reflects the corresponding changes.
:::
 
