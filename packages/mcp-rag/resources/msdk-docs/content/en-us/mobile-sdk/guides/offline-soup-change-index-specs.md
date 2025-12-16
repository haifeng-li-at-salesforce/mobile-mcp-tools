# Change Existing Index Specs on a Soup

To change existing index specs, call the applicable soup alteration method.

Keep these important performance tips in mind when reindexing data:

- The `reIndexData` argument is optional, because reindexing can be expensive. When `reIndexData` is set to false, expect your throughput to be faster by an order of magnitude.
- Altering a soup that already contains data can degrade your app’s performance. Setting `reIndexData` to true worsens the performance hit.
- As a performance guideline, expect the `alterSoup()` operation to take one second per 1000 records when `reIndexData` is set to true. Individual performance varies according to device capabilities, the size of the elements, and the number of indexes.
- `alterSoup()` and `reindexSoup()` perform better for conversion to, or creation of, JSON1 index specs than for other index spec types.
- Insert performance tends to be faster with JSON1 index specs.
- Database size is smaller with JSON1 index specs.
- Query performance is typically unaffected by JSON1 index specs.
- Other SmartStore operations must wait for the soup alteration to complete.
- If the operation is interrupted—for example, if the user exits the application—the operation automatically resumes when the application reopens the SmartStore database.

## Changing Index Specs with External Storage

If you’ve registered a soup to use the external storage feature, use the `alterSoup` methods described in [Alter a Soup with External Storage](offline-altersoup-external.md).

::include{src="../../shared/soup_change_index_specs_hybrid.md"}

## Android Native Apps

In an Android native app, call:

```java
public void alterSoup(String soupName, IndexSpec [] indexSpecs, boolean reIndexData) throws JSONException
```

## iOS Native Apps

Objective-C:

```nolang
- (BOOL) alterSoup:(NSString*)soupName withIndexSpecs:(NSArray*)indexSpecs reIndexData:(BOOL)reIndexData;
```

In Swift, use the Objective-C method.
