## About Mobile SDK Templates

Mobile SDK defines a template for each architecture it supports on iOS and Android. These templates are maintained in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo. When a customer runs the forcedroid or forceios `create` command, the script copies the appropriate built-in template from the repo and transforms this copy into the new app. Apps created this way are basic Mobile SDK apps with little functionality.

Perhaps you’d like to create your own template, with additional functionality, resources, or branding. You can harness the same Mobile SDK mechanism to turn your own app into a template. You can then tell forcedroid or forceios to use that template instead of its own.
