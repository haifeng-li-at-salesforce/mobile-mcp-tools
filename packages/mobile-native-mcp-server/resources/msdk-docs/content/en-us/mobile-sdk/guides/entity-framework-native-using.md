# Using Mobile Sync in Native Apps

The native Mobile Sync library provides native iOS and Android APIs that simplify the development of offline-ready apps. A subset of this native functionality is also available to hybrid apps through a Cordova plug-in.

Mobile Sync libraries offer parallel architecture and functionality for iOS and Android, expressed in each platform’s native language. The shared functional concepts are straightforward:

- Query Salesforce object metadata by calling Salesforce REST APIs.
- Store the retrieved object data locally and securely for offline use.
- Sync data changes when the device goes from an offline to an online state.

With Mobile Sync native libraries, you can:

- Get and post data by interacting with a server endpoint. Mobile Sync helper APIs encode the most commonly used endpoints. These APIs help you fetch sObject metadata, retrieve the list of most recently used (MRU) objects, and build SOQL and SOSL queries. You can also use arbitrary endpoints that you specify in a custom class.
- Fetch Salesforce records and metadata and cache them on the device, using one of the pre-defined cache policies.
- Edit records offline and save them offline in SmartStore.
- Synchronize batches of records by pushing locally modified data to the Salesforce cloud.

## Mobile Sync Components

The following components form the basis of Mobile Sync architecture.

- Sync Manager Class

  - :

    - **iOS class:**

      | Swift         | Objective-C               |
      | ------------- | ------------------------- |
      | `SyncManager` | `SFMobileSyncSyncManager` |

    - **Android class:** `com.salesforce.androidsdk.mobilesync.manager.`SyncManager``

    Provides APIs for synchronizing large batches of sObjects between the server and SmartStore. This class works independently of the metadata manager and is intended for the simplest and most common sync operations. Sync managers can “sync down”—download sets of sObjects from the server to SmartStore—and “sync up”—upload local sObjects to the server.

    The sync manager works in tandem with the following utility classes:

<!-- -->

- Sync State Class

  - : Tracks the state of a sync operation. States include:

    - New—The sync operation has been initiated but has not yet entered a transaction with the server.
    - Running—The sync operation is negotiating a sync transaction with the server.
    - Done—The sync operation finished successfully.
    - Failed—The sync operation finished unsuccessfully.
    - **iOS:**

      | Swift       | Objective-C   |
      | ----------- | ------------- |
      | `SyncState` | `SFSyncState` |

    - **Android:** `com.salesforce.androidsdk.mobilesync.util.SyncState`

<!-- -->

- Sync Target Class

  - : Parent class for specifying the sObjects to be downloaded during a “sync down” operation.

    - **iOS:**

      | Swift        | Objective-C    |
      | ------------ | -------------- |
      | `SyncTarget` | `SFSyncTarget` |

    - **Android:** `com.salesforce.androidsdk.mobilesync.util.SyncTarget`

<!-- -->

- Sync Options Class

  - : Specifies configuration options for a “sync up” operation. Options include the list of field names to be synced.

    - **iOS:**

      | Swift         | Objective-C     |
      | ------------- | --------------- |
      | `SyncOptions` | `SFSyncOptions` |

    - **Android:** `com.salesforce.androidsdk.mobilesync.util.SyncOptions`

<!-- -->

- SOQL Builder

  - : Utility class that makes it easy to build a SOQL query statement, by specifying the individual query clauses.

    - **iOS class:**

      | Swift              | Objective-C        |
      | ------------------ | ------------------ |
      | `SFSDKSoqlBuilder` | `SFSDKSoqlBuilder` |

    - **Android class:** `com.salesforce.androidsdk.mobilesync.util.`SOQLBuilder``

<!-- -->

- SOSL Builder

  - : Utility class that makes it easy to build a SOSL query statement, by specifying the individual query clauses.

    - **iOS class:**

      | Swift              | Objective-C        |
      | ------------------ | ------------------ |
      | `SFSDKSoslBuilder` | `SFSDKSoslBuilder` |

    - **Android class:** `com.salesforce.androidsdk.mobilesync.util.`SOSLBuilder``

<!-- -->

- MobileSyncSDKManager

  - : Beginning in Mobile SDK 6.0, all forcedroid and forceios template apps use `MobileSyncSDKManager` as the base SDK entry point. The class name, `MobileSyncSDKManager`, is the same for iOS (Objective-C and Swift) and Android. In Android, your `App` class extends `MobileSyncSDKManager` instead of `SalesforceSDKManager`. In iOS, the `init` method of your `AppDelegate` class uses a shared instance of `MobileSyncSDKManager` instead of `SalesforceSDKManager`. This change applies to both native and hybrid apps.

:::note

To support multi-user switching, Mobile Sync creates unique instances of its components for each user account.

:::

**See Also**

- [SDK Manager Classes](salesforce-sdk-manager-ios.md)
- [SalesforceSDKManager Class](android-native-classes-salesforcesdkmanager.md)
