```kotlin
override fun logout(frontActivity: Activity) {
    // Clean up all persistent and non-persistent app artifacts
    // ...
    // Call superclass after doing your own cleanup
    super.logout(frontActivity)
}
```
