# FileRequests Class

The `FileRequests` class provides methods that create file operation requests. Each method returns a new `RestRequest` object. Applications send this object to the Salesforce service to process the request. For example, the following code snippet calls the `ownedFilesList()` method to retrieve a `RestRequest` object. It then sends the `RestRequest` object to the server using `RestClient.sendAsync()`:

- Kotlin

  - :
    ::include{src="../../shared/kotlin_filerequests_owned_files_list.md"}

- Java

  - :
    ::include{src="../../shared/filerequests_owned_files_list.md"}

:::note

This example passes null to the first parameter (`userId`). This value tells the `ownedFilesList()` method to use the ID of the context, or logged in, user. The second null, for the `pageNum` parameter, tells the method to fetch the first page of results.

:::

See [Files and Networking](files-intro.md) for a full description of `FileRequests` methods.

## Methods

For a full reference of `FileRequests` methods, see [Package com.salesforce.androidsdk.rest.files](https://forcedotcom.github.io/SalesforceMobileSDK-Android/com/salesforce/androidsdk/rest/files/package-summary.html). For a full description of the REST request and response bodies, go to **Connect REST API Developer Guide** | **Resources** | **Files Resources** at [http://www.salesforce.com/us/developer/docs/chatterapi](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_files.htm).
