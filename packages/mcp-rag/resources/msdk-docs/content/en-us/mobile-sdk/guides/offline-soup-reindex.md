# Reindex a Soup

Use reindexing if you previously altered a soup without reindexing the data, but later you want to make sure all elements in the soup are properly indexed. Both `alterSoup()` and `reindexSoup()` perform better for conversion to, or creation of, JSON1 index specs than for other index spec types.

## Hybrid Apps

In hybrid apps, call:

```javascript
navigator.smartstore.reIndexSoup(soupName, listOfPaths, successCallback, errorCallback);
```

In addition to the success and error callback functions, this function takes these arguments:

| Parameter Name | Argument Description                                      |
| -------------- | --------------------------------------------------------- |
| `soupName`     | String. Pass in the name of the soup.                     |
| `listOfPaths`  | Array. List of index paths on which you want to re-index. |

The success callback supports a single parameter that contains the soup name. For example:

```javascript
function(soupName) { alert("Soup " + soupName +
    " was successfully re-indexed."); }
```

## Android Apps

In Android apps, call:

```java
public void reIndexSoup(String soupName, String[] indexPaths, boolean handleTx)
```

## iOS Apps

Objective-C:

```nolang
- (BOOL) reIndexSoup:(NSString*)soupName
      withIndexPaths:(NSArray*)indexPaths
```

In Swift, use the Objective-C method.
