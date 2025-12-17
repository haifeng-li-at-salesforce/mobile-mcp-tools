# Using the SOQL Sync Down Target

If you can define a SOQL query that selects everything required for a business need, the SOQL target is your simplest sync down option. This target takes a SOQL query and optional supporting arguments.

Mobile Sync wraps the SOQL query you provide as a REST request and sends it to Salesforce.

## Configuration File Usage

For the `"target"` property, specify the following values.

### Target Properties

- "type":"soql"

  - :

- "query": \<string>

  - : The SOQL query.

- "idFieldName": \<string>

  - : (Optional) Name of a custom ID field. If you provide `"idFieldName"`, Mobile Sync uses the field with the given name to get the ID of the record. For example, if you specify `"idFieldName":"AcmeId"`, Mobile Sync obtains the record’s ID from the `AcmeId` field instead of the default `Id` field.

- "modificationDateFieldName": \<string>

  - : (Optional) Name of the field containing the last modification date for the record. If you provide `modificationDateFieldName`, Mobile Sync uses the field with this name to compute the `maxTimestamp` value that `startFetch` uses to resync the records. Default field name is `lastModifiedDate`.

- "maxBatchSize": \<integer>

  - : (Optional) Proposed number of records to obtain in each fetch operation. If you provide a `maxBatchSize` value, Mobile Sync uses it to suggest the maximum number of records to be returned by each fetch operation. The actual number of records fetched can be more or less than the given value. Actual runtime batch sizes can depend on performance concerns, number of matching records, or a LIMIT specified in the query.

## iOS APIs

- Swift

  - : Class: `SoqlSyncDownTarget`

    ```swift
    SoqlSyncDownTarget.newSyncTarget(_ query:String) → Self
    ```

    ```swift
    SoqlSyncDownTarget.newSyncTarget(_ query:String, maxBatchSize size:Int) → Self
    ```

- Objective-C

  - : Class: `SFSoqlSyncDownTarget`

    ```objc
    + (SFSoqlSyncDownTarget*) newSyncTarget:(NSString*)query;
    + (SFSoqlSyncDownTarget*) newSyncTarget:(NSString*)query
        maxBatchSize:(NSInteger) maxBatchSize;

    ```

## Android APIs

- Kotlin

  - : Class: `SoqlSyncDownTarget`

    ```kotlin
    public fun SoqlSyncDownTarget(query: String)
    public fun SoqlSyncDownTarget(idFieldName: String, modificationDateFieldName: String,
        query: String)
    public fun SoqlSyncDownTarget(idFieldName: String, modificationDateFieldName: String,
        query: String, maxBatchSize: int)
    ```

- Java

  - : Class: `SoqlSyncDownTarget`

    ```java
    public SoqlSyncDownTarget(String idFieldName, String modificationDateFieldName,
        String query)
    public SoqlSyncDownTarget(String idFieldName, String modificationDateFieldName,
        String query, int maxBatchSize)
    ```

## Example

::include{src="../../shared/config_sync_down_soql.md"}
