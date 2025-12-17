# About SmartStore

SmartStore provides the primary features of non-relational desktop databases—data segmentation, indexing, querying—along with caching for offline storage.

:::important

Where possible, we changed noninclusive terms to align with our company value of Equality. We maintained certain terms to avoid any effect on customer implementations.

:::

## What’s New in SmartStore

Smart SQL no longer requires index paths for all fields referenced in SELECT or WHERE clauses This improvement doesn’t extend to soups that use external storage.

## About Data Caching

To provide offline synchronization and conflict resolution services, SmartStore uses StoreCache, a Mobile SDK caching mechanism. We recommend that you use StoreCache to manage operations on Salesforce data.

:::note

Pure HTML5 apps store offline information in a browser cache. Browser caching isn’t part of Mobile SDK, and we don’t document it here. SmartStore uses storage functionality on the device. This strategy requires a native or hybrid development path.

:::

## About the Sample Code

Objective-C code snippets in this chapter use Account and Opportunity objects, which are predefined in every Salesforce organization. Accounts and opportunities are linked through a master-detail relationship. An account can be the master for more than one opportunity.

**See Also**

- [Using StoreCache For Offline Caching](entity-framework-using-storecache.md)
- [Conflict Detection](entity-framework-conflict-detection.md)
- [Smart SQL Queries](offline-smart-sql.md)
