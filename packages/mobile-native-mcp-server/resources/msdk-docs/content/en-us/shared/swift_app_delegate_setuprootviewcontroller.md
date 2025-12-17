```swift
func setupRootViewController() {
    // Setup store based on config userstore.json
    MobileSyncSDKManager.shared.setupUserStoreFromDefaultConfig()
    // Setup syncs based on config usersyncs.json
    MobileSyncSDKManager.shared.setupUserSyncsFromDefaultConfig()

    self.window?.rootViewController = UIHostingController(
        rootView: AccountsListView()
    )
}
```
