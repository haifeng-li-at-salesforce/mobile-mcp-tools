# Syncing Metadata and Layouts

Mobile SDK 6.2 introduces new API features that simplify object discovery and presentation. These features harness the power of Mobile Sync to access Salesforce object metadata and layouts. Mobile SDK automatically stores the data in predefined soups for offline use and structured data models for easy querying.

When you use the Mobile SDK metadata and layout APIs, Mobile Sync creates and sends a REST request on your behalf and returns the data to your app. Instead of returning a raw JSON representation, however, the APIs format the response in custom data model objects. To enable offline use, these APIs store the response data locally in SmartStore soups. The feature itself creates the necessary soups and populates them through internal sync down targets.

To use this feature, you call a single method—one for metadata, one for layouts—and implement a callback handler for the response.

## What Can You Do with Metadata?

Object metadata discloses the structure of a requested sObject or custom object type. Using metadata, your app can examine the object’s field list, for example, to build valid queries at runtime. Or you can directly get field configuration properties, relationship graphs, URLs, and other object data from the response. Internally, metadata classes call the Salesforce [“describe” API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_describe.htm).

## What Can You Do with Layouts?

Layouts provide JSON structures that define a standard configuration of labels and fields for objects and search results. You can use this configuration as a preformatted design spec for screens that display the object’s data. Internally, the Mobile SDK layout API calls the Salesforce [“record layout” API](https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_resources_record_layout.htm).

## API Implementation

Mobile SDK defines several levels of iOS and Android native classes to sync metadata and layouts.

- _Sync manager classes_ define the methods you call to obtain metadata and layouts.

  - **iOS:**

    | Swift                 | Objective-C             |
    | --------------------- | ----------------------- |
    | `MetadataSyncManager` | `SFMetadataSyncManager` |
    | `LayoutSyncManager`   | `SFLayoutSyncManager`   |

  - **Android:** `MetadataSyncManager`, `LayoutSyncManager`

  Sync manager objects create the following SmartStore soups and populate them during sync down.

  - `sfdcMetadata`
  - `sfdcLayouts`

  These soups are indexed for offline efficiency.

- _Data model classes_ are structured containers for the metadata and layouts returned to your callback block.

  - **iOS:**

    | Swift      | Objective-C  |
    | ---------- | ------------ |
    | `Metadata` | `SFMetadata` |
    | `Layout`   | `SFLayout`   |

  - **Android:** `Metadata`, `Layout`

- _Custom sync down target classes_ handle Salesforce queries and SmartStore soup synchronization behind the scenes.

  - **iOS:**

    | Swift                    | Objective-C                |
    | ------------------------ | -------------------------- |
    | `MetadataSyncDownTarget` | `SFMetadataSyncDownTarget` |
    | `LayoutSyncDownTarget`   | `SFLayoutSyncDownTarget`   |

  - **Android:** `MetadataSyncDownTarget`, `LayoutSyncDownTarget`
