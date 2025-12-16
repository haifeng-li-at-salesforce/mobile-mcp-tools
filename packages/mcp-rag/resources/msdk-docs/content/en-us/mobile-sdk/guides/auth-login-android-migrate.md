## Migrating to Modern Android Login

In Mobile SDK 13.0, we redesigned the login experience on Android. The redesign features a modernized architecture that uses Jetpack Compose and Model-View-ViewModel (MVVM).

## Customization Changes

Starting in 13.0, you can customize your app’s login screen in `LoginViewModel` without overriding `LoginActivity`. If your app makes extensive customizations to `LoginActivity`, see [Breaking Code Changes](#breaking-code-changes) to adapt your work.

## Breaking Code Changes

In our redesign of the Android login experience, we made these breaking code changes. The values and functions from these classes have been moved, updated, or removed.

### OAuthWebviewHelper

We removed `OAuthWebviewHelper` in 13.0.

#### Moved

- `val authorizationDisplayType` moved to `LoginViewModel`.
- `val loginUrl` moved to `LoginViewModel`.
- `fun clearCookies()` moved to `LoginViewModel`.
- `inner class AuthWebViewClient : WebViewClient()` moved to `LoginActivity`.
- `fun buildAccountName(username: String?, instanceServer: String?)` moved to `LoginViewModel`.

#### Updated

- `val oAuthClientId/getOAuthClientId()` was updated. Set or override `var clientId` in `LoginViewModel`.
- `fun makeWebChromeClient()` was updated. Override `val webChromeClient` in `LoginActivity`.
- `fun makeWebViewClient()` was updated. Override `val webViewClient` in `LoginActivity`.
- `fun onAuthFlowComplete(tr: OAuth2.TokenEndpointResponse?, nativeLogin: Boolean)` was updated. Use the `onAuthFlowSuccess(userAccount: UserAccount)` function in `LoginActivity`.

#### Removed

- `fun getAuthorizationUrl(useWebServerAuthentication: Boolean, useHybridAuthentication: Boolean)`

### OAuthWebviewHelperEvents

We removed `OAuthWebviewHelperEvents` in 13.0.

#### Updated

- `fun loadingLoginPage(loginUrl: String)` was updated. Observe changes in the view model’s `loginUrl` or `selectedServer`.
- `fun finish(userAccount: UserAccount?)` was updated. Use `onAuthFlowSuccess(userAccount: UserAccount)` in `LoginActivity` instead.

#### Removed

- `fun onAccountAuthenticatorResult(authResult: Bundle)`

### LoginActivity

#### Updated

- `fun onClearCookiesClick(v: View?)` is now handled in Compose. Override `clearCookies()` in the view model instead.
- `findViewById<WebView>` was updated. Modify or override `val webView: WebView` in `LoginActivity`.
- `actionBar/supportActionBar` was updated. Customize values like `var titleText: String?` and `var topBarColor: Color?` in the view model.

#### Removed

- `fun getOAuthWebviewHelper(...)`
- `fun onPickServerClick(v: View?)`

## See Also

- [Customize Android Login](auth-customize-login-android.md)
