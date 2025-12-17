```swift
+ (SFQuerySpec*) newMatchQuerySpec:(NSString*)soupName
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newMatchQuerySpec:(NSString*)soupName
                   withSelectPaths:(NSArray*)selectPaths
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;
```
