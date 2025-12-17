# SObject Tree

Creates one or more sObject trees with root records of the specified object type.

## Parameters

- API version (string, optional)
- Object type (string)
- Object trees (list or array of sObject tree objects)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.request(forSObjectTree:objectTrees:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest*) requestForSObjectTree:(NSString*)objectType
                                 objectTrees:(NSArray<SFSObjectTree*>*)objectTrees
                                  apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    @Throws(JSONException::class)
    fun getRequestForSObjectTree(apiVersion: String?, objectType: String?,
        objectTrees: List<SObjectTree>): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForSObjectTree(String apiVersion, String objectType, List<SObjectTree> objectTrees) throws JSONException
    ```

## See Also

- [“sObject Tree” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobject_tree.htm)
