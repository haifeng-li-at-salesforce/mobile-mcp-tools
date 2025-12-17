# Android APIs Removed in Mobile SDK 13.0

These lists show Mobile SDK objects and artifacts for Android that were removed in Mobile SDK 13.0.

## LoginActivity

```
fun getOAuthWebviewHelper()
```

```
fun onPickServerClick(v: View?)
```

```
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
```

## OAuthWebviewHelper

```
open class OAuthWebviewHelper : KeyChainAliasCallback
```

```
fun getAuthorizationUrl(useWebServerAuthentication:
Boolean, useHybridAuthentication: Boolean)
```

```
var shouldReloadPage: Boolean
```

## OAuthWebviewHelperEvents

```
fun onAccountAuthenticatorResult(authResult: Bundle)
```

## SalesforceDroidGapActivity

```
fun getFrontDoorUrl(providedUrl: String?, isAbsoluteUrl: Boolean): String?
```

## OAuth2

```
public static URI getFrontdoorUrl(URI url, String accessToken,
String instanceURL, Map<String, String> addlParams)
```

```
public static void revokeRefreshToken(HttpAccess httpAccessor,
URI loginServer, String refreshToken)
```

## LogoutCompleteReceiver

```
protected abstract fun onLogoutComplete()
```

## SalesforceAnalyticsManager

```
public static synchronized void setPublishFrequencyInHours(
  int periodicBackgroundPublishingHoursInterval)
```

```
public static int getPublishFrequencyInHours()
```

## HttpAccess

```
public OkHttpClient.Builder getOkHttpClientBuilder()
```

## ClientManager

```
public Bundle createNewAccount(String accountName, String username,
String refreshToken, String authToken, String instanceUrl, String loginUrl,
String idUrl, String clientId, String orgId, String userId, String communityId,
String communityUrl, String firstName, String lastName, String displayName,
String email, String photoUrl, String thumbnailUrl, Map<String,
String> additionalOauthValues, String lightningDomain, String lightningSid,
String vfDomain, String vfSid, String contentDomain, String contentSid,
String csrfToken, Boolean nativeLogin, String language, String locale)
```

## SalesforceListActivity

```
public abstract class SalesforceListActivity extends ListActivity
implements SalesforceActivityInterface
```

```
public void onResetClick(View v)
```

## ServerPickerActivity

```
public class ServerPickerActivity extends AppCompatActivity implements
android.widget.RadioGroup.OnCheckedChangeListener
```
