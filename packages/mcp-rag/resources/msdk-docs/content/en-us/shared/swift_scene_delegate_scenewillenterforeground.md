```swift
func sceneWillEnterForeground(_ scene: UIScene) {
    // Called as the scene transitions from the background to the foreground.
    // Use this method to undo the changes made on entering the background.
    self.initializeAppViewState()
    AuthHelper.loginIfRequired {
        self.setupRootViewController()
    }
}
```
