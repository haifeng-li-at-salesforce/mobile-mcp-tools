# Using the Mobile Sync Plugin

Beginning with Mobile SDK 3.0, the Mobile Sync plug-in provides JavaScript access to the native Mobile Sync library’s “sync up” and “sync down” functionality. As a result, performance-intensive operations—network negotiations, parsing, SmartStore management—run on native threads that do not affect web view operations.

Adding the Mobile Sync plug-in to your hybrid project is a function of the Mobile SDK npm scripts:

- For forceios version 3.0 or later, the plug-in is automatically included.
- For forcedroid version 3.0 or later, answer “yes” when asked if you want to use SmartStore.

If you’re adding the Mobile Sync plug-in to an existing hybrid app, it’s best to re-create the app using the latest version of forcedroid or forceios. When the new app is ready, copy your custom HTML, CSS, and JavaScript files from your old project into the new project.
