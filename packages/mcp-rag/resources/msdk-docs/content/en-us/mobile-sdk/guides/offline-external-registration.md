# Register a Soup with External Storage

The external storage feature has been removed in Mobile SDK 11.0.

<!-- A soup spec is an object that contains the soup name along with a list of special features for the soup to support. In this case, you set the feature list to include the Mobile SDK platform-specific identifier for “external storage”. All identifiers resolve to the string “externalStorage”.

<sfdocstbl><table><col /><col /><thead><tr><th>Platform</th><th>Constant Identifier</th></tr></thead><tbody><tr><td>iOS native</td><td><code>kSoupFeatureExternalStorage</code></td></tr><tr><td>Android native</td><td><codeblock>SoupSpec.FEATURE_EXTERNAL_STORAGE</codeblock></td></tr><tr><td>Hybrid, React Native</td><td>“externalStorage” (no constant defined)</td></tr></tbody></table></sfdocstbl>
 -->
 <!-- Android Native***Soup spec registration methods (SmartStore.java)***

```java
public void registerSoupWithSpec(
    SoupSpec soupSpec, 
    IndexSpec[] indexSpecs)
```

-->
<!-- iOS Native***Soup spec registration methods***

Objective-C (`SFSmartStore.h`):

```objc
- (BOOL)registerSoup:(NSString*)soupName withIndexSpecs:(NSArray*)indexSpecs

- (BOOL)registerSoupWithSpec:(SFSoupSpec*)soupSpec
              withIndexSpecs:(NSArray*)indexSpecs
                       error:(NSError**)error;
```

Swift:

```swift
func registerSoup(withSpecification: SoupSpec,
                               withIndices: [Any])
    -> Bool
```

:::note

To create a soup spec in Swift, use Objective-C methods.

:::

-->
