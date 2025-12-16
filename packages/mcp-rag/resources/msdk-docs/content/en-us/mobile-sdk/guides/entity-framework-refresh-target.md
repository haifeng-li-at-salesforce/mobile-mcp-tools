# Using the Refresh Sync Down Target

Many apps download records, cache all of them, and then let users edit them from the SmartStore cache when connectivity drops. Local “offline” work is quick and efficient—a great user experience—but, when connectivity resumes, it's important to refresh the cached records with server updates.

To maximize performance and efficiency, Mobile SDK provides a refresh sync down target. The refresh target supports a single call that doesn't require preparatory coding. You create an instance of the target with a soup name, an object type, and a list of fields. You then pass the target instance to a sync down method. The refresh target gathers IDs of the pertinent soup records, queries the server for the current field values, and then refreshes the soup.

## Refresh Target APIs

The refresh sync down target is available on iOS and Android for native, React native, and hybrid apps.

**iOS**

_Class_:

<sfdocstbl><table><col /><col /><thead><tr><th>Swift</th><th>Objective-C</th></tr></thead><tbody><tr><td><code>RefreshSyncDownTarget</code></td><td><code>SFRefreshSyncDownTarget</code></td></tr></tbody></table></sfdocstbl>
_Factory method_:

- Swift

  - :

    ```nolang
    RefreshSyncDownTarget.newSyncTarget(soupName:objectType:fieldList:)
    ```

    Here's an example:

    ```nolang
    let refreshTarget = RefreshSyncDownTarget.newSyncTarget("MySoup", objectType: "Contact", fieldList: ["Id","Name"])
    ```

<!-- FOR OBJECTIVE-C - owner=MobileSDK,date=03-13-2019,repo=SalesforceMobileSDK-iOS,path=/dev/libs/MobileSync/MobileSync/Classes/Target/SFRefreshSyncDownTarget.h,line=38-->

- Objective-C

  - :

    ```nolang

      + (SFRefreshSyncDownTarget*) newSyncTarget:(NSString*)soupName objectType:(NSString*)objectType fieldlist:(NSArray*)fieldlist
    ```

**Android**

_Class_:

```java
com.salesforce.androidsdk.mobilesync.util.RefreshSyncDownTarget
```

_Constructor_:

<!-- owner=MobileSDK,date=12-15-2016,repo=SalesforceMobileSDK-Android,path=,line=-->

```java
public RefreshSyncDownTarget(List<String> fieldlist,
    String objectType, String soupName)
```

**JavaScript (Hybrid, React Native)**

_Function_:

<!-- owner=MobileSDK,date=12-15-2016,repo=,path=,line=-->

```javascript
var target = {soupName:xxx, type:"refresh",
    sobjectType:yyy, fieldlist:["Id", ...]};
```
