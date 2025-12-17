# Using the SOSL Sync Down Target

Mobile Sync wraps the SOSL query you provide as a REST request and sends it to Salesforce.

## Configuration File Usage

For the `"target"` property, specify the following values.

### Target Properties

- "type":"sosl"

  - :

- "query": \<string>

  - : The SOSL query.

- "idFieldName": \<string>

  - : (Optional) Name of a custom ID field. If you provide `"idFieldName"`, Mobile Sync uses the field with the given name to get the ID of the record. For example, if you specify `"idFieldName":"AcmeId"`, Mobile Sync obtains the record’s ID from the `AcmeId` field instead of the default `Id` field.

- "modificationDateFieldName": \<string>

  - : (Optional) Name of the field containing the last modification date for the record. If you provide `modificationDateFieldName`, Mobile Sync uses the field with this name to compute the `maxTimestamp` value that `startFetch` uses to resync the records. Default field name is `lastModifiedDate`.

## iOS APIs

These factory methods create a SOSL sync down target that defines the `"query"` property. To specify the optional `"idFieldName"` and `"modificationDateFieldName"` properties, set their superclass members on the returned target.

- Swift

  - : Class: `SoslSyncDownTarget`

    ```nolang
    SoslSyncDownTarget.newSyncTarget(_ query:String) → Self
    ```

- Objective-C

  - : Class: `SFSoslSyncDownTarget`

    ```nolang
    + (SFSoslSyncDownTarget*) newSyncTarget:(NSString*)query;
    ```

## Android APIs

These factory methods create a SOSL sync down target that contains the `"query"` property. To specify the optional `"idFieldName"` and `"modificationDateFieldName"` properties, set their superclass members on the returned target.

- Kotlin

  - : Class: `SoslSyncDownTarget`

    ```nolang
    public fun SoslSyncDownTarget(query: String)
    ```

- Java

  - : Class: `SoslSyncDownTarget`

    ```nolang
    public SoslSyncDownTarget(String query)
    ```

## Example

```nolang
{
  "syncs": [
    {
      "syncName": "syncDownAcme",
      "syncType": "syncDown",
      "soupName": "contacts",
      "target": {"type":"soql", "query":"FIND 'Acme' IN ALL FIELDS RETURNING Account(Name),
          Contact(FirstName,LastName)"},
      "options": {"mergeMode":"OVERWRITE"}
    }
  ]
}
```
