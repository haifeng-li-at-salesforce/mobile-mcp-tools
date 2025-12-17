# Refreshing Mobile SDK Pods

CocoaPods caches its pods in repos stored locally on your machine. If the pod repo gets out of sync with forceios, you can manually update it.

When forceios creates a native app, it prints a list of installed pods and their versions. For example:

```nolang
Installing SalesforceSDKCore (8.0.0)
Installing SalesforceAnalytics (8.0.0)
Installing SmartStore (8.0.0)
Installing MobileSync (8.0.0)
```

You can compare these versions to your forceios version by typing:

```nolang
forceios version
```

If the reported pod versions are older than your forceios version, run the following commands in the Terminal window:

```nolang
  pod repo remove forcedotcom
pod setup
```

After setup completes, recreate your app with `forceios create`.
