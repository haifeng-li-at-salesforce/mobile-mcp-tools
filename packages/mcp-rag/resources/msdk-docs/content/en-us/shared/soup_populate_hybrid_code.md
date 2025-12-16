<!-- owner=MobileSDK,date=05-22-2017,repo=”SalesforceMobileSDK-Shared”,path=”https://github.com/forcedotcom/SalesforceMobileSDK-Shared/blob/master/samples/smartstoreexplorer/smartstoreexplorer.js”,line=17-->

```js

force.query("SELECT Name,Id FROM Contact",
    onSuccessSfdcContacts, onErrorSfdc); <!-- owner=MobileSDK,date=05-22-2017,repo=”SalesforceMobileSDK-Shared”,path=”https://github.com/forcedotcom/SalesforceMobileSDK-Shared/blob/master/samples/smartstoreexplorer/smartstoreexplorer.js”,line=9-->var sfSmartstore = function() {
    return cordova.require("com.salesforce.plugin.smartstore");};<!-- owner=MobileSDK,date=05-22-2017,repo=”SalesforceMobileSDK-Shared”,path=”https://github.com/forcedotcom/SalesforceMobileSDK-Shared/blob/master/samples/smartstoreexplorer/smartstoreexplorer.js”,line=371-->
function onSuccessSfdcContacts(response) {
    logToConsole()("onSuccessSfdcContacts: received " +
        response.totalSize + “ contacts");
    var entries = [];

    response.records.forEach(function(contact, i) {
           entries.push(contact);
    });

    if (entries.length > 0) {
        sfSmartstore().upsertSoupEntries(CONTACTS_SOUP_NAME,
            entries,
            function(items) {
                var statusTxt = "upserted: " + items.length +
                    " contacts";
                logToConsole()(statusTxt);
            },
         onErrorUpsert);
    }
}

function onErrorSfdc(param) {
    logToConsole()("onErrorSfdc: " + param);
}
<!-- owner=MobileSDK,date=05-22-2017,repo=”SalesforceMobileSDK-Shared”,path=”https://github.com/forcedotcom/SalesforceMobileSDK-Shared/blob/master/samples/smartstoreexplorer/smartstoreexplorer.js”,line=270-->
function onErrorUpsert(param) {
    logToConsole()("onErrorUpsert: " + param);
}
```
