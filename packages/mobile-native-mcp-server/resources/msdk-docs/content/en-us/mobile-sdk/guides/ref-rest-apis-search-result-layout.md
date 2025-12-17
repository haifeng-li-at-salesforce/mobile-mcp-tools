# Search Result Layout

Gets the search result layout for up to 100 objects with a single query.

## Parameters

- API version (string, optional)
- Object list (list of strings)

## iOS

- Swift

  - : For the object list, set `forSearchResultLayout` to a string of comma-separated object names.

    ```swift
    RestClient.shared.request(forSearchResultLayout:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang

    - (SFRestRequest *)
          requestForSearchResultLayout:(NSString*)objectList
                            apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    @Throws(UnsupportedEncodingException::class)
    fun getRequestForSearchResultLayout(apiVersion: String?,
        objectList: List<String>): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForSearchResultLayout(String apiVersion, List<String> objectList) throws UnsupportedEncodingException
    ```

## See Also

- [“Search Result Layouts” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_search_layouts.htm)
