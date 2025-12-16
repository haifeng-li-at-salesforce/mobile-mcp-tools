```swift

func scene(_ scene: UIScene, willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions) {

    guard let windowScene = (scene as? UIWindowScene) else { return }
    self.window = UIWindow(frame: windowScene.coordinateSpace.bounds)
    self.window?.windowScene = windowScene

    AuthHelper.registerBlock(forCurrentUserChangeNotifications: {
       self.resetViewState {
           self.setupRootViewController()
       }
    })
}
```
