# Android Current Deprecations

These lists show currently deprecated Mobile SDK objects and artifacts for Android, as annotated in the source files. The deprecations are organized by class. Use this information to prepare for the removal of these artifacts in the release indicated.

<!-- The easiest way to update this doc is to sync your local SalesforceMobileSDK-Android repo to the desired branch (getting either latest or an appropriate tag), open the SDK project in Android Studio, and then search for the “@deprecated” javadoc tag and the @Deprecated code tag.-->

## Upgrade to Kotlin 2.0 or Higher

In Mobile SDK 14.0, our minimum supported version of Kotlin is jumping from Kotlin 1.6 to Kotlin 2.0. To keep your apps working as expected, upgrade to Kotlin 2.0 before Mobile SDK 14.0 comes out in 2026.

## HttpAccess

Deprecated in 13.0 for removal in 14.0.

```java
public OkHttpClient.Builder getOkHttpClientBuilder()
```

```java
public OkHttpClient.Builder getUnauthenticatedOkHttpBuilder()
```

## ClientManager

Deprecated in 13.0 for removal in 14.0.

```java
public Bundle createNewAccount(String accountName, String username,
String refreshToken, String authToken, String instanceUrl, String loginUrl,
String idUrl, String clientId, String orgId, String userId, String communityId,
String communityUrl, String firstName, String lastName, String displayName,
String email, String photoUrl, String thumbnailUrl,
Map<String, String> additionalOauthValues, String lightningDomain,
String lightningSid, String vfDomain, String vfSid, String contentDomain,
String contentSid, String csrfToken, Boolean nativeLogin,
String language, String locale)
```

## OAuth2

Deprecated in 13.0 for removal in 14.0.

```java
public static URI getFrontdoorUrl( URI url, String accessToken, String instanceURL,
Map<String, String> addlParams )
```
