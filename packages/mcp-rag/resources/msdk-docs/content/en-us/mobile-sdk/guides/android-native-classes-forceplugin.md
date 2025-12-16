# ForcePlugin Class

All classes in the `com.salesforce.androidsdk.phonegap` package are intended for hybrid app support. Most of these classes implement Javascript plug-ins that access native code. The base class for these Mobile SDK plug-ins is `ForcePlugin`. If you require your own Javascript plug-in in a Mobile SDK app, extend `ForcePlugin`, and implement the abstract `execute()` function.

`ForcePlugin` extends `CordovaPlugin`, which works with the Javascript framework to let you create a Javascript module that can call into native functions. PhoneGap provides the bridge on both sides: you create a native plug-in with `CordovaPlugin` and then you create a Javascript file that mirrors it. Cordova calls the plug-in’s `execute()` function when a script calls one of the plug-in’s Javascript functions.
