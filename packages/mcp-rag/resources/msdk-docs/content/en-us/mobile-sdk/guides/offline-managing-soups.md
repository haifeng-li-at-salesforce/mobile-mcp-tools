# Managing Soups

SmartStore provides utility functionality that lets you retrieve soup metadata and perform other soup-level operations. This functionality is available for hybrid, React Native, Android native, and iOS native apps.

## iOS Native Apps

To use soup management APIs in a native iOS app, import `SmartStore/SFSmartStore.h`. You call soup management methods on a shared instance of the `SmartStore` object. Obtain the shared instance by using one of the following `SFSmartStore` class methods.### Using the SmartStore instance for the current user:

- Swift

  - :

    ```swift
    func shared(withName: String) -> SmartStore
    ```

    Example:

    ::include{src="../../shared/smartstore_retrieve_store.md"}

- Objective-C

  - :

    ```objc
    + (id)sharedStoreWithName:(NSString*)storeName;
    ```

### Using the SmartStore instance for a specified user:

- Swift

  - :

    ```swift
    func shared(withName: String, forUserAccount: SFUserAccount) -> SmartStore
    ```

    Example:

    ::include{src="../../shared/smartstore_retrieve_store_by_user.md"}

- Objective-C

  - :

    ```objc
    + (id)sharedStoreWithName:(NSString*)storeName
                         user:(SFUserAccount *)user;
    ```

    Example:

    ```objc
    self.store = [SFSmartStore sharedStoreWithName:kDefaultSmartStoreName];
    if ([self.store soupExists:@"Accounts"]) {
        [self.store removeSoup:@"Accounts"];
    }
    ```

## Android Native Apps

To use soup management APIs in a native Android app, you call methods on the shared SmartStore instance:

<!-- owner=MobileSDK,date=05-25-2017,repo=local,path=~/Development/DocTests/51/forcedroid-apps/SmartStuffTest/SmartStuffTest/app/src/com/bestapps/android/SmartStoreStuff.java,line=103-->

```java

 smartStore =
    SmartStoreSDKManager.getInstance().getSmartStore();
smartStore.clearSoup("user1Soup");
```

## Hybrid Apps

Each soup management function in JavaScript takes two callback functions: a success callback that returns the requested data, and an error callback. Success callbacks vary according to the soup management functions that use them. Error callbacks take a single argument, which contains an error description string. For example, you can define an error callback function as follows:

```javascript
function(e) { alert(“ERROR: “ + e);}
```

To call a soup management function in JavaScript, first invoke the Cordova plug-in to initialize the SmartStore object. You then use the SmartStore object to call the soup management function. The following example defines named callback functions discretely, but you can also define them inline and anonymously.

```js
var sfSmartstore = function () {
  return cordova.require("com.salesforce.plugin.smartstore");
};

function onSuccessRemoveSoup(param) {
  logToConsole()("onSuccessRemoveSoup: " + param);
  $("#div_soup_status_line").html("Soup removed: " + SAMPLE_SOUP_NAME);
}

function onErrorRemoveSoup(param) {
  logToConsole()("onErrorRemoveSoup: " + param);
  $("#div_soup_status_line").html("removeSoup ERROR");
}

sfSmartstore().removeSoup(SAMPLE_SOUP_NAME, onSuccessRemoveSoup, onErrorRemoveSoup);
```

**See Also**

- [Adding SmartStore to Existing Android Apps](offline-android-add-smartstore.md)
