# Retrieve a Soup’s Index Specs

If you want to examine or display the index specifications for a soup, call the applicable index specs retrieval method.

## Hybrid Apps

In hybrid apps, call:

```javascript
getSoupIndexSpecs();
```

In addition to the success and error callback functions, this function takes a single argument, `soupName`, which is the name of the soup. For example:

```javascript
navigator.smartstore.getSoupIndexSpecs(soupName, successCallback, errorCallback);
```

The success callback supports a single parameter that contains the array of index specs. For example:

```javascript
function(indexSpecs) { alert("Soup " + soupName +
    " has the following indexes:" + JSON.stringify(indexSpecs); }
```

## Android Apps

```java
public IndexSpec [] getSoupIndexSpecs ( String soupName )
```

## iOS Apps

Objective-C:

```nolang
- (NSArray*)indicesForSoup:(NSString*)soupName
```

Swift:

```nolang
func indices(forSoupNamed: String) -> [SoupIndex]
```

Example:

::include{src="../../shared/soup_indices.md"}
