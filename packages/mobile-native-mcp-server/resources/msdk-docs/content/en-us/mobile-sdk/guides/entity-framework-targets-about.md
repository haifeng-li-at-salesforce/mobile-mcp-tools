# About Sync Targets

Sync targets configure data transfers between the Salesforce cloud and a local database on a mobile device. Mobile SDK 5.1 enhances the capabilities of targets to give developers more control over two-way data synchronization.

Mobile Sync is all about syncing data. In essence, it

- Syncs data _down_ from the server to a local database, and
- Syncs data _up_ from the local database to the server.

Often, the data you’re transferring doesn’t cross break any rules, and the default sync targets work fine. For special cases, though, you can provide your own sync target to make sure that data transfers occur as expected. An example is when an object contains fields that are required but that apps can’t update. If a sync up operation tries to upload both new and updated records with a single field list, the operation fails if it tries to update locked fields. Beginning in Mobile SDK 5.1, you have other options that can often spare you from implementing a custom target.

## Decentralizing Sync Manager Tasks (Or, Power to the Custom Targets!)

In the first Mobile Sync release, the sync manager class internally handled all server and local database interactions. In addition, the sync manager was a “final” class that was off-limits for developer customization. Developers were unable to add their own nuances or extended functionality.

Later, an architectural refactoring delegated all server interactions from the sync manager class to sync down and sync up target classes. Thus began a transfer of power from the monolithic sync manager to the flexible sync targets. Unlike sync manager class, the second-generation target classes let developers subclass sync targets for their own purposes. By controlling interactions with servers, custom sync targets can talk to arbitrary server endpoints, or transform data before storing it.

Mobile SDK 5.1 enhances Mobile Sync still further by moving local database interactions into targets. This enhancement offers several benefits.

- It decouples Mobile Sync from SmartStore, giving developers the freedom to use other stores.
- It allows developers to use their own data layouts and capture local data changes however they like.
- It enables more complex objects, such as targets that can simultaneously handle multiple record types.

In short, Mobile Sync now offers developers significant control over the entire round trip of data synchronization.

:::note

Beginning in Mobile SDK 5.1, additional “sync up” options can sometimes obviate the need for a custom target. See [Defining a Custom Sync Up Target](entity-framework-native-up-target-def.md).

:::
