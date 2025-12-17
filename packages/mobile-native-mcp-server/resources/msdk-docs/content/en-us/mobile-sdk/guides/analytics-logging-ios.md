# iOS Compiler-Level Logging

Mobile SDK 7.0 simplifies iOS logging and refers it to the underlying operating system framework.

To access the logging system, call the `os_log()` function. This function gives you access to the Apple unified logging system. If you like, you can also pass a custom component log object and set a log level. See [https://developer.apple.com/documentation/os/logging](https://developer.apple.com/documentation/os/logging) for details.

:::note

The Salesforce Logging Framework on iOS is not currently recommended for external use. If you have legacy code that uses `SFSDKLogger`, you can continue using it as follows:

1.  In each source file that uses `SFSDKLogger`, replace

    ```swift
    #import <SalesforceAnalytics/SFSDKLogger.h>
    ```

    with

    ```swift
    #import <SalesforceSDKCommon/SFLogger.h>
    ```

2.  Using Xcode Refactor, replace all instances of `SFSDKLogger` with `SFLogger`.

:::

## Example

You can replace `SalesforceLogger` calls in the Swift forceios template as follows. These simplistic examples use the default component logger to log debug messages in the Xcode console.

::include{src="../../shared/rest_client_send_with_os_log.md"}
