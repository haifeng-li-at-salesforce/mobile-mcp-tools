# Clear a Soup

To remove all entries from a soup, call the soup clearing method.

## Hybrid Apps

In hybrid apps, call:

```javascript
navigator.smartstore.clearSoup(soupName, successCallback, errorCallback);
```

The success callback supports a single parameter that contains the soup name. For example:

```javascript
function(soupName) { alert("Soup " + soupName + " was successfully emptied."); }
```

## Android Apps

In Android apps, call:

```java
public void clearSoup ( String soupName )
```

## iOS Apps

Objective-C:

```nolang
- (void)clearSoup:(NSString*)soupName;
```

Swift:

```nolang
func clearSoup(soupName:) -> Void
```

Example:

::include{src="../../shared/soup_clear.md"}
