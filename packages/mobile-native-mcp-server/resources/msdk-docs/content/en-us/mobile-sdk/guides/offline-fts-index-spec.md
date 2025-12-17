# Full-Text Search Index Specs

To use full-text search, you register your soup with one or more full-text-indexed paths. SmartStore provides a _full_text_ index spec for designating index fields.

When you define a path with a full-text index, you can also use that path for non-full-text queries. These other types of queries—”all”, “exact”, “:like”, “range”, and “smart” queries—interpret full-text indexed fields as string indexed fields.

The following examples show how to instantiate a full-text index spec.

<!-- Link to Registering a Soup.-->

## Example

**iOS:**

```swift
[[SFSoupIndex alloc]
    initWithDictionary:@{kSoupIndexPath: @"some_path",
    kSoupIndexType: kSoupIndexTypeFullText}]

```

**Android:**

```java
new IndexSpec("some_path", Type.full_text)
```

**JavaScript:**

::include{src="../../shared/fts_index_spec_hybrid_example.md"}
