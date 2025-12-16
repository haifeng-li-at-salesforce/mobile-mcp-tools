# iOS Preparation

To create Mobile SDK apps for iOS, you must install the necessary Apple software. If you plan to use forceios, you also install CocoaPods.

In Mobile SDK 4.0 and later, the forceios script uses CocoaPods to import Mobile SDK modules. Apps created with forceios run in a CocoaPod-driven workspace. The CocoaPods utility enhances debugging by making Mobile SDK source code available in your workspace. Also, with CocoaPods, updating to a new Mobile SDK version is painless. You merely update the podfile and then run `pod update` in a terminal window.

Follow these instructions to make sure you’re fully prepared for Mobile SDK development on iOS.

- Regardless of the type of iOS app you’re developing, make sure that you’re up to speed with the iOS native requirements listed at [iOS Basic Requirements](ios-requirements.md).
- (Optional) To use forceios:

  - To install forceios, see [Mobile SDK npm Packages](install-npmjs.md).
  - Forceios requires you to install CocoaPods. See _Getting Started_ at [guides.cocoapods.org](https://guides.cocoapods.org).

:::note

The forceios npm utility is provided as an optional convenience. CocoaPods, node.js, and npm are required for forceios but are not required for Mobile SDK iOS development. To learn how to create Mobile SDK iOS native projects without forceios, see [Creating an iOS Swift Project Manually](ios-new-native-project-manual.md).

:::

**See Also**

- [Use CocoaPods with Mobile SDK](ios-cocoapods.md)
- [Refreshing Mobile SDK Pods](ios-pods-refresh.md)
