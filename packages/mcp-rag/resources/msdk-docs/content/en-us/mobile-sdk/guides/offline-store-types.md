# SmartStore Stores

SmartStore puts encrypted soup data in an underlying system database known as the store. The store is where all soup data is stored, encrypted, related, and indexed. If the device loses connectivity, the user can continue to work on data in the store until the Salesforce cloud is again accessible.

When you initialize SmartStore, you specify the name of a store to open. You assign a custom name or use a standard name, such as `kDefaultSmartStoreName` in iOS native apps, to define the store. Named stores are user-specific—like soups, the store persists only while the user’s session remains valid.

In a traditional SmartStore session, all soups reference, organize, and manipulate content from a single store. Single-store configuration is the best choice for many apps. However, if an app queries large quantities of data from many objects, performance can begin to degrade. To avoid slower response time, you can create multiple named stores and partition your data between them. For example, if your app defines tasks that operate on clear-cut domains of Salesforce data, you can create a store for each task. Runtime access to a smaller store can make a big difference in user satisfaction.

Some use cases require a store that isn’t tied to a user’s login credentials and can persist between user and app sessions. SmartStore accommodates this requirement by supporting _global_ stores. Global stores are also named stores, but you create and remove them through a different set of APIs.

**See Also**

- [Using Global SmartStore](offline-global-smartstore.md)
- [Creating and Accessing User-based Stores](offline-access-store.md)
