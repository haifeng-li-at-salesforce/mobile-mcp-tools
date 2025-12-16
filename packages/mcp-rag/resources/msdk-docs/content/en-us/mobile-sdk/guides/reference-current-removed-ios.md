# iOS APIs Removed in Mobile SDK 13.0

These lists show Mobile SDK objects and artifacts for iOS that were removed in Mobile SDK 13.0.

<!-- Create this file in xx.0 releases only. Use the final list of deprecations in the previous release.-->

## SFSDKCryptoUtils

```
+ (nullable NSData*)encryptUsingRSAforData:(NSData *)data withKeyRef:(SecKeyRef)keyRef
```

```
+ (nullable NSData*)decryptUsingRSAforData:(NSData *)data withKeyRef:(SecKeyRef)keyRef
```

## SFApplicationHelper

```
+ (BOOL)openURL:(NSURL*)url
```

## SFSDKOAuthProtocol

```
- (void)revokeRefreshToken:(SFOAuthCredentials *)credentials
```
