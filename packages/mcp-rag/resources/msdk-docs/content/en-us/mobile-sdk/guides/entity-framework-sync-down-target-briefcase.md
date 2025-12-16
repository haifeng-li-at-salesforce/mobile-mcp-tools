# Using the Briefcase Sync Down Target

If your org uses Briefcases for your mobile users, the Briefcase sync down target was introduced in Mobile SDK 10.1. This sync target is an efficient way to load many records at a time. Sync is constrained to the records included in all Briefcases assigned to the current user and made accessible in the mobile client’s Connected App. You can limit the sync target to specific objects and fields included in those Briefcases. This target takes an array of `BriefcaseObjectInfo` objects, which include sObject type, fields, and the soup to add them to.

:::tip

SOQL sync down targets can only get one type of record at a time, and Parent Children sync down targets support only getting parent records with their children. In contrast, Briefcase sync down targets are more flexible. Briefcases can be defined to include many different kinds of objects, including related objects up to three levels deep. Your sync target definition can include any or all of these objects.

:::

A briefcase is a set of queries that together select a cohesive collection of related records, optimized for the current user. Briefcases are defined in advance using Briefcase Builder, but execution of briefcase queries is delayed until the briefcase is accessed by a client application. Briefcases can be used to select records for data priming in advance of going offline, and for other general data loading purposes.

Briefcases are assigned to specific users, and queries can include the current user in their criteria. Briefcases are made accessible to your mobile app via the mobile client’s Connected App. The objects, records, and fields available via this sync target are automatically constrained by these configuration details.

Additionally, because briefcases are defined and managed by your org’s admin, your admin can change the sync behavior of client apps without requiring any code changes.

For briefcase sync targets, Mobile Sync uses Salesforce APIs that are optimized for loading large numbers of records in a single session. If you need to load hundreds or thousands of records at a time, especially in preparation for going offline, this target can be more efficient than other options.<!-- TODO: Additional conceptual information about briefcases in the context of Mobile SDK, in a separate topic. (We’re in the process of writing a whole new chunk of doc (small chapter?) about data priming strategies in general. This will be a good place to add MSDK-specific details.)-->

## Configuration File Usage

For the `"target"` property, specify the following values.

<!-- From: https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/syncs.schema.json-->

### Target Properties

- **"type":"briefcase"**

- **"infos": array of \<BriefcaseObjectInfo> items**

  - An array of objects that describe the specific sObjects and fields to retrieve, along with the soup to place them in.

  - **BriefcaseObjectInfo Properties**

    - **"soupName": \<string>**

      Name of the soup to store records of this object type into during sync.

    - **"sobjectType": \<string>**

      Name of a Salesforce object to sync.

    - **"fieldlist": array of \<string>**

      List of fields to sync for this object.

    - **"idFieldName": \<string>**

      (Optional) Name of a custom ID field. If you provide `"idFieldName"`, Mobile Sync uses the field with the given name to get the ID of the record. For example, if you specify `"idFieldName":"AcmeId"`, Mobile Sync obtains the record’s ID from the `AcmeId` field instead of the default `Id` field.

    - **"modificationDateFieldName": \<string>**

      (Optional) Name of the field containing the last modification date for the record. If you provide `modificationDateFieldName`, Mobile Sync uses the field with this name to compute the `maxTimestamp` value that `startFetch` uses to resync the records. Default field name is `lastModifiedDate`.

    **Required:** “soupName”, “sobjectType”, “fieldlist”

## iOS APIs

Create `BriefcaseObjectInfo` objects as needed, and then use them to create a sync down target object.

- Swift

  - : Class: `BriefcaseSyncDownTarget`

    ```nolang
    let briefcaseAccountInfo = BriefcaseObjectInfo(
        soupName: "soup_for_accounts",
        sobjectType: "Account",
        fieldlist: ["Name", "Description"])
    let briefcaseContactInfo = BriefcaseObjectInfo(
        soupName: "soup_for_contacts",
        sobjectType: "Contact",
        fieldlist: ["LastName"])
    let target = BriefcaseSyncDownTarget(
        infos: [briefcaseAccountInfo, briefcaseContactInfo])
    ```

- Objective-C

  - : Class: `SFBriefcaseSyncDownTarget`

    ```nolang
    SFBriefcaseObjectInfo *briefcaseAccountInfo = [[SFBriefcaseObjectInfo alloc]
        initWithSoupName:@"soup_for_accounts"
             sobjectType:@"Account"
               fieldlist: @[@"Name", @"Description"]];
    SFBriefcaseObjectInfo *briefcaseContactInfo = [[SFBriefcaseObjectInfo alloc]
        initWithSoupName:@"soup_for_contacts"
             sobjectType:@"Contact"
               fieldlist: @[@"LastName"]];
    SFBriefcaseSyncDownTarget *target = [[SFBriefcaseSyncDownTarget alloc]
        initWithInfos:@[briefcaseAccountInfo, briefcaseContactInfo]];
    ```

## Android APIs

Create `BriefcaseObjectInfo` objects as needed, and then use them to create a sync down target object.

<!--
- Kotlin

  - : Class: `BriefcaseSyncDownTarget`

    ```nolang
    // FIXME (futured out)
    ```
-->

- Java

  - : Class: `BriefcaseSyncDownTarget`

    ```nolang
      BriefcaseSyncDownTarget target = new BriefcaseSyncDownTarget(
        Arrays.asList(
            new BriefcaseObjectInfo(
                "soupForAccounts",
                "Account",
                Arrays.asList("Name", "Description")),
            new BriefcaseObjectInfo(
                "soupForContacts",
                "Contact",
                Arrays.asList("LastName"))
        )
    );
    ```

## Example

```nolang
{
  "syncs": [
    {
      "syncName": "myBriefcaseSyncDown",
      "syncType": "syncDown",
      "soupName": "does-not-matter",
      "target": {
        "type": "briefcase",
        "infos": [
          {
            "sobjectType": "Account",
            "fieldlist": [
              "Name",
              "Description"
            ],
            "soupName": "accounts"
          },
          {
            "sobjectType": "Contact",
            "fieldlist": [
              "LastName"
            ],
            "soupName": "contacts"
          }
        ]
      },
      "options": {
        "mergeMode": "OVERWRITE"
      }
    }
  ]
}
```

## See Also

- [Invoking the Sync Down Method with a Custom Target](entity-framework-native-down-target-invoke.md)
- [“Configure a Briefcase” in the _Briefcase Builder_ online help](https://help.salesforce.com/s/articleView?id=sf.briefcase_builder_create.htm&type=5)
