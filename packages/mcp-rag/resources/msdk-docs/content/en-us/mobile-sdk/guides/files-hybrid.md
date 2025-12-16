# Using Files in Hybrid Apps

Hybrid file request wrappers reside in the [`force+files.js`](https://github.com/forcedotcom/SalesforceMobileSDK-Shared/tree/master/libs/force%2Bfiles.js) JavaScript library. When using the hybrid functions, you pass in a callback function that receives and handles the server response. You also pass in a function to handle errors.

To simplify the code, you can use the `mobilesync.js` and `force.js` libraries to build your HTML app. The [FileExplorer](https://github.com/forcedotcom/SalesforceMobileSDK-Shared/tree/master/samples/fileexplorer) sample app in the [github.com/forcedotcom/SalesforceMobileSDK-Shared](https://github.com/forcedotcom/SalesforceMobileSDK-Shared) repo demonstrates this setup.

:::note

Mobile SDK does not support file uploads in hybrid apps.

:::

<!-- <sfdocstbl><table><col /><col /><col /><thead><tr><th>Name</th><th>Signature</th><th>Description</th></tr></thead><tbody><tr><td><code>ownedFilesList</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=47-\->function ownedFilesList =
function(userId, page, callback, error)</codeblock></td><td><p>Returns a page from the list of files owned by the specified user.</p></td></tr><tr><td><code>filesInUsersGroups</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=65-\->function filesInUsersGroups =
function(userId, page, callback, error)</codeblock></td><td><p>Returns a page from the list of files owned by groups that include specified user.</p></td></tr><tr><td><code>filesSharedWithUser</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=83-\->function filesSharedWithUser =
function(userId, page, callback, error)</codeblock></td><td><p>Returns a page from the list of files shared with the specified user.</p></td></tr><tr><td><code>fileDetails</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=101-\->function
fileDetails = function
(fileId, version, callback, error)</codeblock></td><td><p>Returns file details.</p></td></tr><tr><td><code>batchFileDetails</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=119-\->function
batchFileDetails =
function(fileIds, callback, error)</codeblock></td><td><p>Returns file details for multiple files.</p></td></tr><tr><td><code>fileShares</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=137-\->function
fileShares = function
(fileId, page, callback, error)</codeblock></td><td><p>Returns a page from the list of entities that share this file.</p></td></tr><tr><td><code>addFileShare</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=158-\->function
addFileShare = function
(fileId, entityId, shareType, callback, error)</codeblock></td><td><p>Adds a file share for the specified file ID to the specified entity ID.</p></td></tr><tr><td><code>deleteFileShare</code></td><td><codeblock><!-\- owner=MobileSDK,date=11-15-2016,repo=SalesforceMobileSDK-Shared,path=/libs/force+files.js,line=14-\->function
deleteFileShare =
function(sharedId, callback, error)</codeblock></td><td><p>Deletes the specified file share.</p></td></tr></tbody></table></sfdocstbl>
 -->
