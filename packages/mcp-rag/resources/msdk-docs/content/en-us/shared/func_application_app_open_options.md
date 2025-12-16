```nolang
func application(_ app: UIApplication,
              open url: URL,
               options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return UserAccountManager.shared.handleIdentityProviderCommand(
        from: url, with: options)
}
```
