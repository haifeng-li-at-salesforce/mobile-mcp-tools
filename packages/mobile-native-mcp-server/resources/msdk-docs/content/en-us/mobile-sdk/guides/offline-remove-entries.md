# Removing Soup Elements

Traditionally, SmartStore methods let you remove soup elements by specifying an array of element IDs. To do so, you usually run a preliminary query to retrieve the candidate IDs, then call the method that performs the deletion. In Mobile SDK 4.2, SmartStore ups the game by adding a query option to its element deletion methods. With this option, you provide only a query, and SmartStore deletes all elements that satisfy that query. This approach delivers a performance boost because both the query and the deletion operation occur in a single call.

::include{src="../../shared/soup_remove_entries_hybrid.md"}

## Android Native Apps

Android native methods for removing entries give you the option of either handling the transaction yourself, or letting the method handle the transaction transparently. If you set the handleTx argument to `false`, you’re responsible for starting the transaction before the call and ending it afterwards. If you use the overload that doesn’t include handleTx, or if you set handleTx to false, Mobile SDK handles the transaction for you.

### Remove entries by ID array (Android)

To remove entries by ID array in Android native apps, call either of the following methods:

```java
public void delete(String soupName, Long... soupEntryIds)
public void delete(String soupName, Long[] soupEntryIds, boolean handleTx)
```

### Remove entries by query (Android)

To remove entries by query in Android native apps, call either of the following methods:

```java
public void deleteByQuery(String soupName, QuerySpec querySpec)
public void deleteByQuery(String soupName, QuerySpec querySpec, boolean handleTx)
```


In this example, the soup "MySoup" has a string field called "key". To delete all entries that have a key starting with "abc", call the method like this:


```java
store.deleteByQuery("MySoup", QuerySpec.buildLikeQuerySpec(
   "MySoup", "key", "abc%", "key", Order.ascending, 10));


```

## iOS Native Apps

### Remove entries by ID array (iOS)

To remove entries by ID array in iOS native apps, call one of these methods:

#### Objective-C

```objc
- (void)removeEntries:(NSArray*)entryIds fromSoup:(NSString*)soupName error:(NSError **)error;
```


#### Swift

```swift
public func remove(entryIds: [Any], forSoupName: String) -> Void
```

Example:

::include{src="../../shared/soup_remove_entries.md"}

### Remove entries by query (iOS)

To remove entries by query in iOS native apps, call one of these methods:

#### Objective-C

```objc
- (void)removeEntriesByQuery:(SFQuerySpec*)querySpec
                    fromSoup:(NSString*)soupName;
- (void)removeEntriesByQuery:(SFQuerySpec*)querySpec
                    fromSoup:(NSString*)soupName
                       error:(NSError **)error;
```

In this example, the soup "MySoup" has a string field called "key". To delete all entries that have a key starting with "abc", call the method like this:

```objc
[store removeEntriesByQuery:[SFQuerySpec newLikeQuerySpec:
@"MySoup"withPath:@"key" withLikeKey:@"abc%" withOrderPath:@"key" 
withOrder:kSFSoupQuerySortOrderAscending withPageSize:10]
fromSoup:kTestSoupName
error:&error];
```

#### Swift

```swift
func remove(usingQuerySpec: QuerySpec, entryIds: [Any], forSoupNamed: String) -> Void
```

Example:

::include{src="../../shared/soup_remove_entries_queryspec.md"}
