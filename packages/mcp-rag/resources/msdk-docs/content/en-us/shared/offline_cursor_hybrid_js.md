When you perform a query in JavaScript, SmartStore returns a cursor object that lets you page through the query results. Your code can move forward and backwards through the cursor’s pages. To navigate through cursor pages, use the following functions.

- `navigator.smartstore.moveCursorToPageIndex(cursor, newPageIndex, successCallback, errorCallback)`—Move the cursor to the page index given, where 0 is the first page, and `totalPages - 1` is the last page.
- `navigator.smartstore.moveCursorToNextPage(cursor, successCallback, errorCallback)`—Move to the next entry page if such a page exists.<!-- What is the actual behavior if the cursor is on the last page?-->
- `navigator.smartstore.moveCursorToPreviousPage(cursor, successCallback, errorCallback)`—Move to the previous entry page if such a page exists.<!-- What is the actual behavior if the cursor is on the first page?-->
- `navigator.smartstore.closeCursor(cursor, successCallback, errorCallback)`—Close the cursor when you’re finished with it.

:::note

- The `successCallback` function accepts one argument: the updated cursor.
- Cursors are not static snapshots of data—they are dynamic. The only data the cursor holds is the original query and your current position in the result set. When you move your cursor, the query runs again. If you change the soup while paging through the cursor, the cursor shows those changes. You can even access newly created soup entries, assuming they satisfy the original query.

:::
