# Remove a Soup

Removing a soup deletes it. When a user signs out, all soups are deleted automatically. For other occasions in which you want to delete a soup, call the applicable soup removal method.

## Hybrid Apps

In hybrid apps, call:

```nolang
navigator.smartstore.removeSoup(soupName,successCallback,errorCallback);
```

## Android Apps

In Android apps, call:

```java
public void dropSoup ( String soupName )
```

## iOS Apps

Objective-C:

```nolang
- (void)removeSoup:(NSString*)soupName
```

Swift:

```nolang
func removeSoup(soupName: String) -> Void
```

Example:

::include{src="../../shared/soup_remove.md"}
