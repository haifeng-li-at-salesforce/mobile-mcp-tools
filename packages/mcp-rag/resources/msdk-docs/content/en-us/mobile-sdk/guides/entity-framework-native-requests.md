# Syncing Data

In native Mobile Sync apps, you can use the sync manager to sync data easily between the device and the Salesforce server. The sync manager provides methods for syncing “up”—from the device to the server—or “down”—from the server to the device.

All data requests in Mobile Sync apps are asynchronous. Asynchronous means that the sync method that you call returns the server response in a callback method or update block that you define.

Each sync up or sync down method returns a sync state object. This object contains the following information:

- Sync operation ID. You can check the progress of the operation at any time by passing this ID to the sync manager’s `getSyncStatus` method.
- Your sync parameters (soup name, target for sync down operations, options for sync up operations).
- Type of operation (up or down).
- Progress percentage (integer, 0–100).
- Total number of records in the transaction.
