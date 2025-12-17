# Populating a Soup

To add Salesforce records to a soup for offline access, use the REST API in conjunction with SmartStore APIs.

When you register a soup, you create an empty named structure in memory that’s waiting for data. You typically initialize the soup with data from a Salesforce organization. To obtain the Salesforce data, you use Mobile SDK’s standard REST request mechanism. When a successful REST response arrives, you extract the data from the response object and then upsert it into your soup.

## Hybrid Apps

::include{src="../../shared/hybrid_populate_soup.md"}
::include{src="../../shared/soup_populate_hybrid_code.md"}

## iOS Native Apps

iOS native apps use the `SFRestAPI` protocol for REST API interaction. The following code creates and sends a REST request for the SOQL query `SELECT Name, Id, OwnerId FROM Account`. If the request is successful, Salesforce sends the REST response to the `requestForQuery:send:delegate:` delegate method. The response is parsed, and each returned record is upserted into the SmartStore soup.

```objc
- (void)requestAccounts
{
    SFRestRequest *request = [[SFRestAPI sharedInstance]
        requestForQuery:@"SELECT Name, Id, OwnerId FROM Account"];
    [[SFRestAPI sharedInstance] send:request delegate:self];
}

//SFRestAPI protocol for successful response
- (void)request:(SFRestRequest *)request didLoadResponse:(id)dataResponse
{
    NSArray *records = dataResponse[@"records"];
    if (nil != records) {
        for (int i = 0; i < records.count; i++) {
            [self.store upsertEntries:@[records[i]]
                               toSoup:kAccountSoupName];
        }
    }
}
```

## Android Native Apps

For REST API interaction, Android native apps typically use the `RestClient.sendAsync()` method with an anonymous inline definition of the `AsyncRequestCallback` interface. The following code creates and sends a REST request for the SOQL query `SELECT Name, Id, OwnerId FROM Account`. If the request is successful, Salesforce sends the REST response to the provided `AsyncRequestCallback.onSuccess()` callback method. The response is parsed, and each returned record is upserted into the SmartStore soup.

```java
private void sendRequest(String soql, final String obj)
throws UnsupportedEncodingException {
    final RestRequest restRequest =
        RestRequest.getRequestForQuery(
            getString(R.string.api_version),
            "SELECT Name, Id, OwnerId FROM Account", "Account");
    client.sendAsync(restRequest, new AsyncRequestCallback() {
        @Override
        public void onSuccess(RestRequest request,
            RestResponse result) {
            // Consume before going back to main thread
            // Not required if you don't do main (UI) thread tasks here
            result.consumeQuietly();
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // Network component doesn’t report app layer status.
                    // Use the Mobile SDK RestResponse.isSuccess() method to check
                    // whether the REST request itself succeeded.
                    if (result.isSuccess()) {
                        try {
                            final JSONArray records =
                                result.asJSONObject().getJSONArray("records");
                            insertAccounts(records);
                        } catch (Exception e) {
                            onError(e);
                        } finally {
                            Toast.makeText(MainActivity.this,
                                "Records ready for offline access.",
                                Toast.LENGTH_SHORT).show();
                        }
                    }
                }
            });
        }

        @Override
        public void onError(Exception e) {
            // You might want to log the error
            // or show it to the user
        }
    });
}

/**
 * Inserts accounts into the accounts soup.
 *
 * @param accounts Accounts.
 */
public void insertAccounts(JSONArray accounts) {
    try {
        if (accounts != null) {
            for (int i = 0; i < accounts.length(); i++) {
                if (accounts[i] != null) {
                    try {
                        smartStore.upsert(
                            ACCOUNTS_SOUP, accounts[i]);
                    } catch (JSONException exc) {
                        Log.e(TAG,
                            "Error occurred while attempting "
                            + "to insert account. Please verify "
                            + "validity of JSON data set.");
                    }
                }
            }
        }
    } catch (JSONException e) {
        Log.e(TAG, "Error occurred while attempting to "
            + "insert accounts. Please verify validity "
            + "of JSON data set.");
    }
}

```
