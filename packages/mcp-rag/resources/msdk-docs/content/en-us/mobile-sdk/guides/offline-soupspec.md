# Soup Specs

The external storage feature and soup specs have been removed in Mobile SDK 11.0.

<!-- To register or alter a soup that uses special SmartStore features such as external storage, you provide a soup spec rather than just a soup name. SmartStore provides methods for creating and retrieving soup spec objects.

 In your soup spec object, you specify the soup name and a list of the SmartStore special features that your soup uses. You can then pass the soup spec object to a `registerSoupWithSpec` method or an `alterSoup` method.

 :::note

Currently, SmartStore defines only one special feature: external storage.<!-\- Check me-\->:::

 -->
 <!-- Android Native***Soup spec creation methods (SoupSpec.java)***

```java
public SoupSpec(String soupName) // for future use <!-\- Check me-\->
public SoupSpec(String soupName, String... features)
```

**_Soup spec retrieval method (SmartStore.java)_**

```java
public SoupSpec getSoupSpec(String soupName)
```

-->
<!-- iOS Native**_Soup spec creation methods_**

Objective-C (`SFSoupSpec.h`):

```nolang
+ (SFSoupSpec *)newSoupSpec:(NSString *)soupName withFeatures:(NSArray *)features;
+ (SFSoupSpec *)newSoupSpecWithDictionary:(NSDictionary *)dictionary;
```

Swift: Use the Objective-C method directly. For example:

```nolang
var soupSpec = SFSoupSpec.newSoupSpec(“ChickenSoup”, withFeatures: [kSoupFeatureExternalStorage])
```

**_Soup spec retrieval method_**

Objective-C (`SFSmartStore.h`):

```nolang
- (SFSoupSpec*)attributesForSoup:(NSString*)soupName;
```

Swift:

```nolang
public func specification(forSoupNamed: String) -> SoupSpec
```

Example:

::include{src="../../shared/soup_attributes.md"}
-->
