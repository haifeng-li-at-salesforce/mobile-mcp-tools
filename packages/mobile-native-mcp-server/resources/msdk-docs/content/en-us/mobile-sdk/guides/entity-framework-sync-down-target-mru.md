# Using the MRU Sync Down Target

To retrieve the most recently viewed records for a specific Salesforce object in your org, use the MRU sync down target.

The MRU sync down target returns only the most recently viewed records for the given object, as determined by the Salesforce API.

## Configuration File Usage

For the `"target"` property, specify the following values.

### Target Properties

- "type":"mru"

  - :

- "fieldList": Array of \<string>

  - : List of fields to sync.

- "objectType": \<string>

  - : Name of a Salesforce object.

## iOS APIs

- Swift

  - : Class: `MruSyncDownTarget`

    ```swift
    MruSyncDownTarget.newSyncTarget(objectType: String, fieldlist: [Any])
    ```

- Objective-C

  - : Class: `SFMruSyncDownTarget`

    ```objc
    + (SFMruSyncDownTarget*) newSyncTarget:(NSString*)objectType fieldlist:(NSArray*)fieldlist;

    ```

## Android APIs

- Kotlin

  - : Class: `MruSyncDownTarget`

    ```kotlin
    public MruSyncDownTarget(fieldlist: List<String>, objectType: String)
    ```

- Java

  - : Class: `MruSyncDownTarget`

    ```java
    public MruSyncDownTarget(List<String> fieldlist, String objectType)
    ```

## Example

```json
{
  "syncs": [
    {
      "syncName": "syncDownMruContacts",
      "syncType": "syncDown",
      "soupName": "contacts",
      "target": {
        "type": "mru",
        "fieldlist": [
          "FirstName",
          "LastName",
          "Title",
          "MobilePhone",
          "Email",
          "Department",
          "HomePhone"
        ],
        "object": "Contact"
      },
      "options": { "mergeMode": "OVERWRITE" }
    },
    {
      "syncName": "syncUpContacts",
      "syncType": "syncUp",
      "soupName": "contacts",
      "target": {
        "createFieldlist": [
          "FirstName",
          "LastName",
          "Title",
          "MobilePhone",
          "Email",
          "Department",
          "HomePhone"
        ]
      },
      "options": {
        "fieldlist": [
          "Id",
          "FirstName",
          "LastName",
          "Title",
          "MobilePhone",
          "Email",
          "Department",
          "HomePhone"
        ],
        "mergeMode": "LEAVE_IF_CHANGED"
      }
    }
  ]
}
```
