# Controlling the Status Bar in iOS 7 Hybrid Apps

In iOS 7 you can choose to show or hide the status bar, and you can control whether it overlays the web view. You use the Cordova status bar plug-in to configure these settings. By default, the status bar is shown and overlays the web view in Salesforce Mobile SDK 2.3 and later.

To hide the status bar, add the following keys to the application plist:

```xml
<key>UIStatusBarHidden</key>
<true/>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>

```

For an example of a hidden status bar, see the AccountEditor sample app.

To control status bar appearance--overlaying, background color, translucency, and so on--add org.apache.cordova.statusbar to your app:

```nolang
cordova plugin add org.apache.cordova.statusbar
```

You control the appearance either from the `config.xml` file or from JavaScript. See [https://github.com/apache/cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar/) for full instructions. For an example of a status bar that doesn’t overlay the web view, see the ContactExplorer sample app.

**See Also**

- [Hybrid Sample Apps](hybrid-samples.md)
