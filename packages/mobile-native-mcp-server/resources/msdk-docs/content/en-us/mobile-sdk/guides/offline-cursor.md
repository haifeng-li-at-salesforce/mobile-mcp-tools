# Working with Query Results

Mobile SDK provides mechanisms on each platform that let you access query results efficiently, flexibly, and dynamically.

Often, a query returns a result set that is too large to load all at once into memory. In this case, Mobile SDK initially returns a small subset of the results—a single page, based on a size that you specify. You can then retrieve more pages of results and navigate forwards and backwards through the result set.

<!-- ```js
//the soup name from which this cursor was generated
this.soupName = null;

//a unique identifier for this cursor, used by plug-in
this.cursorId = null;

//the query spec that generated this cursor
this.querySpec = null;

//the maximum number of entries returned per page
this.pageSize = 0;

//the total number of pages of results available
this.totalPages = 0;

//the current page index among all the pages available
this.currentPageIndex = 0;

//the list of current page entries, ordered as requested in the querySpec
this.currentPageOrderedEntries = null;
```

 -->

## JavaScript

::include{src="../../shared/offline_cursor_hybrid_js.md"}

## iOS native

Internally, iOS native apps use the third-party `FMResultSet` class to obtain query results. When you call a SmartStore query spec method, use the `pageSize` parameter to control the amount of data that you get back from each call. To traverse pages of results, iteratively call the `queryWithQuerySpec:pageIndex:withDB:` or `queryWithQuerySpec:pageIndex:error:` method of the `SFSmartStore` class with the same query spec object while incrementing or decrementing the zero-based `pageIndex` argument.

## Android nativejs

Internally, Android native apps use the `android.database.Cursor` interface for cursor manipulations. When you call a SmartStore query spec method, use the `pageSize` parameter to control the amount of data that you get back from each call. To traverse pages of results, iteratively call the `SmartStore.query()` method with the same query spec object while incrementing or decrementing the zero-based `pageIndex` argument.
