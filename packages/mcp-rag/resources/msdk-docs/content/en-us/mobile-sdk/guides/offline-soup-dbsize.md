# Get the Database Size

To query the amount of disk space consumed by the database, call the database size method.

## Hybrid Apps

In hybrid apps, call:

```javascript
navigator.smartstore.getDatabaseSize(successCallback, errorCallback);
```

The success callback supports a single parameter that contains the database size in bytes. For example:

```javascript
function(dbSize) { alert("db file size is:" + dbSize + " bytes"); }
```

## Android Native Apps

```java
public int getDatabaseSize ()
```

## iOS Native Apps

Objective-C:

```nolang
- (long)getDatabaseSize
```

In Swift, use the Objective-C method.
