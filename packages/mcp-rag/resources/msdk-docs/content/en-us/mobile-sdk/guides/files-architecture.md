# Architecture

In iOS, file management and networking rely on the `SalesforceNetwork` library. All REST API calls—for files and any other REST requests—go through this library.

:::note

If you directly accessed a third-party networking library in older versions of your app, update that code to use the `SalesforceNetwork` library.

:::

Hybrid JavaScript functions use the the Mobile SDK architecture for the device operating system (Android, iOS, or Windows) to implement file operations. These functions are defined in `force.js`.
