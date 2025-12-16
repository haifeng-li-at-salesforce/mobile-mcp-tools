# Accessing Salesforce Data: Controllers vs. APIs

In an HTML5 app, you can access Salesforce data two ways.

- By using JavaScript remoting to invoke your Apex controller.

- By accessing the Salesforce API with `force.js`.

## Using JavaScript Remoting to Invoke Your Apex Controller

Apex supports the following two means of invoking Apex controller methods from JavaScript:

- [`apex:actionFunction`](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_compref_actionFunction.htm)
- [JavaScript remoting](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_js_remoting.htm)

Both techniques use an AJAX request to invoke Apex controller methods directly from JavaScript. The JavaScript code must be hosted on a Visualforce page.

In comparison to `apex:actionFunction`, JavaScript remoting offers several advantages.

- It offers greater flexibility and better performance than `apex:actionFunction`.
- It supports parameters and return types in the Apex controller method, with automatic mapping between Apex and JavaScript types.
- It uses an asynchronous processing model with callbacks.
- Unlike `apex:actionFunction`, the AJAX request does not include the view state for the Visualforce page. This results in a faster round trip.

Compared to `apex:actionFunction`, however, JavaScript remoting requires you to write more code.

The following example inserts JavaScript code in a \<script> tag on the Visualforce page. This code calls the `invokeAction()` method on the Visualforce remoting manager object. It passes `invokeAction()` the metadata needed to call a function named `getItemId()` on the Apex controller object `objName`. Because `invokeAction()` runs asynchronously, the code also defines a callback function to process the value returned from `getItemId()`. In the Apex controller, the `@RemoteAction` annotation exposes the `getItemId()` function to external JavaScript code.

```nolang
//Visualforce page code
<script type="text/javascript">
     Visualforce.remoting.Manager.invokeAction(
        '{!$RemoteAction.MyController.getItemId}',
        objName,
        function(result, event){
            //process response here
        },
        {escape: true}
    );
<script>

//Apex Controller code

@RemoteAction
global static String getItemId(String objectName) { ... }

```

<!-- See [this Dreamforce 2012 session](http://www.youtube.com/watch?feature=player_embedded&v=ckkChgcM9VQ) for a more detailed comparison between the JavaScript remoting and `actionFunction`. -->

See [https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_RemoteAction.htm](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_RemoteAction.htm) to learn more about `@RemoteAction` annotations.

## Accessing the Salesforce API with Force.js

<!-- When you call Salesforce REST APIs from Visualforce, you’re calling to a different domain. This separation violates same-origin browser policy, which causes the browser to refuse the connection. The ForceTK JavaScript library works around same-origin policy restrictions by using the [AJAX Proxy](https://developer.salesforce.com/docs/atlas.en-us.ajax.meta/ajax/sforce_api_ajax_queryresultiterator.htm#ajax_proxy) to give full access to the REST API. Because the AJAX proxy is present on all Visualforce hosts with an endpoint of the form `https://_MyDomainName_--_PackageName_.vf.force.com/services/proxy`, your Visualforce-hosted JavaScript can invoke it by passing the desired resource URL in an HTTP header.

 To use the proxy service:

 1.  Send your request to `https://*<domain>*/services/proxy`, where *<domain>* is the domain of your current Visualforce page.

1.  Use this HTTP header:- SalesforceProxy-Endpoint

    - : URL of the request endpoint

 - SalesforceProxy-SID

    - : Current user session ID



    For tips on accessing this proxy through JavaScript, see [AJAX Proxy](https://developer.salesforce.com/docs/atlas.en-us.ajax.meta/ajax/sforce_api_ajax_queryresultiterator.htm#ajax_proxy).


 -->

The following sample code queries Salesforce records from Apex by using the the `cordova.js` and `force.js` libraries. To add these resources to your Apex page:

1.  Create an archive file, such as a ZIP file, that contains `cordova.js`, `force.js`, and any other static resources your project requires.
2.  In Salesforce, upload the archive file via **Your Name** | **App Setup** | **Develop** | **Static Resources**.

The sample code uses an instance of the `force.js` library to log in to Salesforce. It then calls the `force.query()` method to process a SOQL query. The query callback function displays the `Name` fields returned by the query as HTML in an object with ID “contacts”. At the end of the Apex page, the HTML5 content defines the `contacts` element as a simple `<ul>` tag.

```nolang
<apex:page docType="html-5.0" sidebar="false" showHeader="false"
    contentType="text/html" applyHtmlTag="false" applyBodyTag="false"
    standardStylesheets="false" cache="true">
<html>
    <head>
        <meta charset="utf-8"></meta>
        <meta name="viewport"
            content="initial-scale=1, maximum-scale=1, user-scalable=no"></meta>

      <apex:includeScript value="{!URLFOR($Resource.Easy,
                                 'cordova/cordova.js')}"
      <apex:includeScript value="{!URLFOR($Resource.Easy,
                                 'libs/force.js')}"  />
      <script>
(function() {
    /* Do login */
    force.login(
        function() {
            console.log("Auth succeeded");
            showContactsList();
        },
        function(error) {
            console.log("Auth failed: " + error);
        }
    );

    /* This method will render a list of contacts from current salesforce org */
    var showContactsList = function() {

        fetchRecords(function(data) {
            var contacts = data.records;

            var listItemsHtml = '';
            for (var i=0; i < contacts.length; i++) {
                listItemsHtml += ('<li class="table-view-cell"><
                    div class="media-body">' + contacts[i].Name + '</div></li>');
            }

            document.querySelector('#contacts').innerHTML = listItemsHtml;
        })
    }

    /* This method will fetch a list of contact records from salesforce.
    Just change the soql query to fetch another sobject. */
    var fetchRecords = function (successHandler) {
        var soql = 'SELECT Id, Name FROM Contact LIMIT 10';
        force.query(soql, successHandler, function(error) {
            alert('Failed to fetch contacts: ' + error);
        });
    };

})();
      </script>
    </head>
    <body>

      <header>
         <h1>Hello, Visualforce!</h1>
      </header>

        <!-- Placeholder to add Contacts list -->

      <ul id="contacts">
      </ul>

      <p>Welcome to Mobile SDK.</p>
    </body>
</html>

</apex:page>
```

:::note

- Using the REST API—even from a Visualforce page—consumes API calls.
- Salesforce API calls made through a Mobile SDK container or through a Cordova webview do not require proxy services. Cordova webviews disable same-origin policy, so you can make API calls directly. This exemption applies to all Mobile SDK hybrid and native apps.

:::

## Additional Options

You can use the Mobile Sync in HTML5 apps. Just include the required JavaScript libraries as static resources. Take advantage of the model and routing features. Offline access is disabled for this use case. See [Using Mobile Sync to Access Salesforce Objects](entity-framework-intro.md).

<!-- Salesforce Developer Marketing provides developer [mobile packs](http://www2.developerforce.com/mobile/services/mobile-packs) that can help you get a quick start with HTML5 apps. -->

## Offline Limitations

Read these articles for tips on using HTML5 with Salesforce Platform offline.

- [https://developer.salesforce.com/blogs/developer-relations/2011/06/using-html5-offline-with-forcecom.html](https://developer.salesforce.com/blogs/developer-relations/2011/06/using-html5-offline-with-forcecom.html)
- [https://developer.salesforce.com/blogs/developer-relations/2013/03/using-javascript-with-force-com.html](https://developer.salesforce.com/blogs/developer-relations/2013/03/using-javascript-with-force-com.html)
